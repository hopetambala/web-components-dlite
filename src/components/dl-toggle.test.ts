import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-toggle.js';
import type { DlToggle } from './dl-toggle.js';

describe('dl-toggle', () => {
  it('renders label', async () => {
    const el = await fixture<DlToggle>(html`<dl-toggle label="Dark mode"></dl-toggle>`);
    expect(el.shadowRoot!.textContent).toContain('Dark mode');
  });

  it('reflects checked and disabled', async () => {
    const el = await fixture<DlToggle>(html`<dl-toggle checked disabled></dl-toggle>`);
    expect(el.hasAttribute('checked')).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('fires dl-change when the internal input changes', async () => {
    const el = await fixture<DlToggle>(html`<dl-toggle label="x"></dl-toggle>`);
    let detail: { checked: boolean } | undefined;
    el.addEventListener('dl-change', (e) => { detail = (e as CustomEvent).detail; });
    el.shadowRoot!.querySelector<HTMLInputElement>('input')!.click();
    await elementUpdated(el);
    expect(el.checked).toBe(true);
    expect(detail).toEqual({ checked: true });
  });
});
