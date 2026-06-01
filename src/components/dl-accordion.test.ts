import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-accordion.js';
import type { DlAccordion } from './dl-accordion.js';

describe('dl-accordion', () => {
  it('renders heading and content slot', async () => {
    const el = await fixture<DlAccordion>(html`<dl-accordion heading="Details">body</dl-accordion>`);
    expect(el.shadowRoot!.textContent).toContain('Details');
    expect(el.textContent).toContain('body');
  });

  it('is collapsed by default and reflects open', async () => {
    const el = await fixture<DlAccordion>(html`<dl-accordion heading="x"></dl-accordion>`);
    expect(el.open).toBe(false);
    expect(el.shadowRoot!.querySelector('.header')!.getAttribute('aria-expanded')).toBe('false');
    el.open = true;
    await elementUpdated(el);
    expect(el.hasAttribute('open')).toBe(true);
    expect(el.shadowRoot!.querySelector('.header')!.getAttribute('aria-expanded')).toBe('true');
  });

  it('toggles and fires dl-toggle on header click', async () => {
    const el = await fixture<DlAccordion>(html`<dl-accordion heading="x"></dl-accordion>`);
    let detail: { open: boolean } | undefined;
    el.addEventListener('dl-toggle', (e) => { detail = (e as CustomEvent).detail; });
    el.shadowRoot!.querySelector<HTMLButtonElement>('.header')!.click();
    await elementUpdated(el);
    expect(el.open).toBe(true);
    expect(detail).toEqual({ open: true });
  });

  it('does not toggle when disabled', async () => {
    const el = await fixture<DlAccordion>(html`<dl-accordion heading="x" disabled></dl-accordion>`);
    el.shadowRoot!.querySelector<HTMLButtonElement>('.header')!.click();
    await elementUpdated(el);
    expect(el.open).toBe(false);
  });
});
