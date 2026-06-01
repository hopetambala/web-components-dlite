import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-spinner.js';
import type { DlSpinner } from './dl-spinner.js';

describe('dl-spinner', () => {
  it('defaults to size md and reflects size', async () => {
    const el = await fixture<DlSpinner>(html`<dl-spinner></dl-spinner>`);
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects a custom size', async () => {
    const el = await fixture<DlSpinner>(html`<dl-spinner size="lg"></dl-spinner>`);
    expect(el.getAttribute('size')).toBe('lg');
  });
});
