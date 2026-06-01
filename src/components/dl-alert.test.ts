import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-alert.js';
import type { DlAlert } from './dl-alert.js';

describe('dl-alert', () => {
  it('renders slot content and reflects variant', async () => {
    const el = await fixture<DlAlert>(html`<dl-alert variant="success">Done</dl-alert>`);
    expect(el.textContent).toContain('Done');
    expect(el.getAttribute('variant')).toBe('success');
  });

  it('shows no dismiss button by default', async () => {
    const el = await fixture<DlAlert>(html`<dl-alert>x</dl-alert>`);
    expect(el.shadowRoot!.querySelector('button')).toBeNull();
  });

  it('fires dl-dismiss when dismissible button clicked', async () => {
    const el = await fixture<DlAlert>(html`<dl-alert dismissible>x</dl-alert>`);
    await elementUpdated(el);
    let dismissed = false;
    el.addEventListener('dl-dismiss', () => { dismissed = true; });
    el.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    expect(dismissed).toBe(true);
  });
});
