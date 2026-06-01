import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-dialog.js';
import type { DlDialog } from './dl-dialog.js';

describe('dl-dialog', () => {
  it('renders nothing visible when closed, panel when open', async () => {
    const el = await fixture<DlDialog>(html`<dl-dialog heading="Hi">body</dl-dialog>`);
    expect(el.shadowRoot!.querySelector('.panel')).toBeNull();
    el.open = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector('.panel')).not.toBeNull();
    expect(el.shadowRoot!.textContent).toContain('Hi');
  });

  it('reflects size', async () => {
    const el = await fixture<DlDialog>(html`<dl-dialog size="wide" open></dl-dialog>`);
    expect(el.getAttribute('size')).toBe('wide');
  });

  it('closes and fires dl-close on close button', async () => {
    const el = await fixture<DlDialog>(html`<dl-dialog open>body</dl-dialog>`);
    let closed = false;
    el.addEventListener('dl-close', () => { closed = true; });
    el.shadowRoot!.querySelector<HTMLButtonElement>('.close-btn')!.click();
    await elementUpdated(el);
    expect(el.open).toBe(false);
    expect(closed).toBe(true);
  });

  it('closes on Escape when open and closeOnEscape', async () => {
    const el = await fixture<DlDialog>(html`<dl-dialog open>body</dl-dialog>`);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await elementUpdated(el);
    expect(el.open).toBe(false);
  });

  it('ignores Escape when close-on-escape is disabled', async () => {
    const el = await fixture<DlDialog>(html`<dl-dialog open close-on-escape="false"></dl-dialog>`);
    el.closeOnEscape = false;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await elementUpdated(el);
    expect(el.open).toBe(true);
  });

  it('closes on backdrop click by default', async () => {
    const el = await fixture<DlDialog>(html`<dl-dialog open>body</dl-dialog>`);
    el.shadowRoot!.querySelector<HTMLElement>('.backdrop')!.click();
    await elementUpdated(el);
    expect(el.open).toBe(false);
  });
});
