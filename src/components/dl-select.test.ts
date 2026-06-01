import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-select.js';
import type { DlSelect } from './dl-select.js';

describe('dl-select', () => {
  it('renders a label and a native select', async () => {
    const el = await fixture<DlSelect>(html`<dl-select label="Org"></dl-select>`);
    expect(el.shadowRoot!.textContent).toContain('Org');
    expect(el.shadowRoot!.querySelector('select')).not.toBeNull();
  });

  it('reflects disabled and required and shows error', async () => {
    const el = await fixture<DlSelect>(html`<dl-select disabled required error="Pick one"></dl-select>`);
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.hasAttribute('required')).toBe(true);
    expect(el.shadowRoot!.textContent).toContain('Pick one');
  });
});
