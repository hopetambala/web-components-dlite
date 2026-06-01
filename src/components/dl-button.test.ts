import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-button.js';
import type { DlButton } from './dl-button.js';

describe('dl-button', () => {
  it('renders a button with slotted label', async () => {
    const el = await fixture<DlButton>(html`<dl-button>Save</dl-button>`);
    expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
    expect(el.textContent).toContain('Save');
  });

  it('defaults to primary/md and reflects variant + size', async () => {
    const el = await fixture<DlButton>(html`<dl-button variant="danger" size="lg">x</dl-button>`);
    expect(el.getAttribute('variant')).toBe('danger');
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('reflects disabled and full-width', async () => {
    const el = await fixture<DlButton>(html`<dl-button disabled full-width>x</dl-button>`);
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.fullWidth).toBe(true);
    expect(el.hasAttribute('full-width')).toBe(true);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);
  });
});
