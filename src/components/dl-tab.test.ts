import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-tab.js';
import type { DlTab } from './dl-tab.js';

describe('dl-tab', () => {
  it('holds label and value', async () => {
    const el = await fixture<DlTab>(html`<dl-tab label="Overview" value="overview"></dl-tab>`);
    expect(el.label).toBe('Overview');
    expect(el.value).toBe('overview');
  });

  it('reflects active and disabled', async () => {
    const el = await fixture<DlTab>(html`<dl-tab active disabled></dl-tab>`);
    expect(el.hasAttribute('active')).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
  });
});
