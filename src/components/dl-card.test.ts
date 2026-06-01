import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-card.js';
import type { DlCard } from './dl-card.js';

describe('dl-card', () => {
  it('renders slotted content', async () => {
    const el = await fixture<DlCard>(html`<dl-card>content</dl-card>`);
    expect(el.textContent).toContain('content');
  });

  it('renders a button and fires dl-click when interactive', async () => {
    const el = await fixture<DlCard>(html`<dl-card interactive>c</dl-card>`);
    await elementUpdated(el);
    expect(el.hasAttribute('interactive')).toBe(true);
    const btn = el.shadowRoot!.querySelector('button');
    expect(btn).not.toBeNull();
    let clicked = false;
    el.addEventListener('dl-click', () => { clicked = true; });
    btn!.click();
    expect(clicked).toBe(true);
  });

  it('does not fire dl-click when disabled', async () => {
    const el = await fixture<DlCard>(html`<dl-card interactive disabled>c</dl-card>`);
    await elementUpdated(el);
    let clicked = false;
    el.addEventListener('dl-click', () => { clicked = true; });
    el.shadowRoot!.querySelector<HTMLButtonElement>('button')?.click();
    expect(clicked).toBe(false);
  });
});
