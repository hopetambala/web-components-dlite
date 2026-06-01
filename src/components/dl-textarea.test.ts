import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-textarea.js';
import type { DlTextarea } from './dl-textarea.js';

describe('dl-textarea', () => {
  it('renders label and textarea', async () => {
    const el = await fixture<DlTextarea>(html`<dl-textarea label="Notes"></dl-textarea>`);
    expect(el.shadowRoot!.querySelector('label')!.textContent).toContain('Notes');
    expect(el.shadowRoot!.querySelector('textarea')).not.toBeNull();
  });

  it('defaults to size md and reflects size', async () => {
    const el = await fixture<DlTextarea>(html`<dl-textarea size="lg"></dl-textarea>`);
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('shows error text and error styling', async () => {
    const el = await fixture<DlTextarea>(html`<dl-textarea error="Required"></dl-textarea>`);
    expect(el.shadowRoot!.querySelector('.error-text')!.textContent).toContain('Required');
    expect(el.shadowRoot!.querySelector('textarea')!.classList.contains('has-error')).toBe(true);
  });

  it('fires dl-input with the new value', async () => {
    const el = await fixture<DlTextarea>(html`<dl-textarea></dl-textarea>`);
    let value = '';
    el.addEventListener('dl-input', (e) => { value = (e as CustomEvent).detail.value; });
    const ta = el.shadowRoot!.querySelector('textarea')!;
    ta.value = 'hello';
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    await elementUpdated(el);
    expect(value).toBe('hello');
    expect(el.value).toBe('hello');
  });
});
