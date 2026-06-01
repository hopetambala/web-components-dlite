import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-checkbox.js';
import type { DlCheckbox } from './dl-checkbox.js';

describe('dl-checkbox', () => {
  it('renders label', async () => {
    const el = await fixture<DlCheckbox>(html`<dl-checkbox label="Agree"></dl-checkbox>`);
    expect(el.shadowRoot!.textContent).toContain('Agree');
  });

  it('reflects checked and disabled', async () => {
    const el = await fixture<DlCheckbox>(html`<dl-checkbox checked disabled></dl-checkbox>`);
    expect(el.hasAttribute('checked')).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('fires dl-change when the internal input changes', async () => {
    const el = await fixture<DlCheckbox>(html`<dl-checkbox label="x"></dl-checkbox>`);
    let detail: { checked: boolean } | undefined;
    el.addEventListener('dl-change', (e) => { detail = (e as CustomEvent).detail; });
    el.shadowRoot!.querySelector<HTMLInputElement>('input')!.click();
    await elementUpdated(el);
    expect(el.checked).toBe(true);
    expect(detail).toEqual({ checked: true });
  });
});
