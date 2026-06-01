import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-icon-button.js';
import type { DlIconButton } from './dl-icon-button.js';

describe('dl-icon-button', () => {
  it('applies the label as an accessible name', async () => {
    const el = await fixture<DlIconButton>(html`<dl-icon-button label="Delete">x</dl-icon-button>`);
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).toBe('Delete');
  });

  it('reflects variant, size and disabled', async () => {
    const el = await fixture<DlIconButton>(html`<dl-icon-button variant="ghost" size="lg" disabled label="x">i</dl-icon-button>`);
    expect(el.getAttribute('variant')).toBe('ghost');
    expect(el.getAttribute('size')).toBe('lg');
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);
  });
});
