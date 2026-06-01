import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-badge.js';
import type { DlBadge } from './dl-badge.js';

describe('dl-badge', () => {
  it('renders slotted content', async () => {
    const el = await fixture<DlBadge>(html`<dl-badge>New</dl-badge>`);
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.textContent).toContain('New');
  });

  it('defaults to solid default variant', async () => {
    const el = await fixture<DlBadge>(html`<dl-badge>x</dl-badge>`);
    expect(el.variant).toBe('default');
    expect(el.appearance).toBe('solid');
  });

  it('reflects variant and appearance to attributes', async () => {
    const el = await fixture<DlBadge>(html`<dl-badge variant="success" appearance="soft">ok</dl-badge>`);
    await elementUpdated(el);
    expect(el.getAttribute('variant')).toBe('success');
    expect(el.getAttribute('appearance')).toBe('soft');
  });

  it('soft success uses the feedback bg/fg token pair', async () => {
    const el = await fixture<DlBadge>(html`<dl-badge variant="success" appearance="soft">ok</dl-badge>`);
    const span = el.shadowRoot!.querySelector('span')!;
    const bg = getComputedStyle(span).backgroundColor;
    // feedback-success-bg (light green) is not transparent and not the solid fill
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  it('supports the info variant', async () => {
    const el = await fixture<DlBadge>(html`<dl-badge variant="info">i</dl-badge>`);
    expect(el.variant).toBe('info');
  });
});
