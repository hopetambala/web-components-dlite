import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-input.js';
import type { DlInput } from './dl-input.js';

describe('dl-input', () => {
  it('renders label and input with the given type', async () => {
    const el = await fixture<DlInput>(html`<dl-input label="Email" type="email"></dl-input>`);
    expect(el.shadowRoot!.querySelector('label')!.textContent).toContain('Email');
    expect(el.shadowRoot!.querySelector('input')!.getAttribute('type')).toBe('email');
  });

  it('shows error text', async () => {
    const el = await fixture<DlInput>(html`<dl-input error="Bad"></dl-input>`);
    expect(el.shadowRoot!.textContent).toContain('Bad');
  });

  it('reflects disabled and required', async () => {
    const el = await fixture<DlInput>(html`<dl-input disabled required></dl-input>`);
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.hasAttribute('required')).toBe(true);
  });

  it('fires dl-input and updates value', async () => {
    const el = await fixture<DlInput>(html`<dl-input></dl-input>`);
    let value = '';
    el.addEventListener('dl-input', (e) => { value = (e as CustomEvent).detail.value; });
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'abc';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await elementUpdated(el);
    expect(value).toBe('abc');
    expect(el.value).toBe('abc');
  });
});
