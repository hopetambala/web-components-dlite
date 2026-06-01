import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-tabs.js';
import './dl-tab.js';
import type { DlTabs } from './dl-tabs.js';

describe('dl-tabs', () => {
  it('renders slotted tabs and holds value', async () => {
    const el = await fixture<DlTabs>(html`
      <dl-tabs value="a">
        <dl-tab value="a" label="A"></dl-tab>
        <dl-tab value="b" label="B"></dl-tab>
      </dl-tabs>
    `);
    expect(el.value).toBe('a');
    expect(el.querySelectorAll('dl-tab').length).toBe(2);
  });
});
