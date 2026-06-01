import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-divider.js';
import type { DlDivider } from './dl-divider.js';

describe('dl-divider', () => {
  it('defaults to horizontal orientation', async () => {
    const el = await fixture<DlDivider>(html`<dl-divider></dl-divider>`);
    expect(el.orientation).toBe('horizontal');
    expect(el.getAttribute('orientation')).toBe('horizontal');
  });

  it('reflects vertical orientation', async () => {
    const el = await fixture<DlDivider>(html`<dl-divider orientation="vertical"></dl-divider>`);
    expect(el.getAttribute('orientation')).toBe('vertical');
  });
});
