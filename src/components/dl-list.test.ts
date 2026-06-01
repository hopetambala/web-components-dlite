import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-list.js';
import './dl-list-item.js';
import type { DlList } from './dl-list.js';
import type { DlListItem } from './dl-list-item.js';

describe('dl-list', () => {
  it('renders items in a list role', async () => {
    const el = await fixture<DlList>(html`
      <dl-list>
        <dl-list-item>a</dl-list-item>
        <dl-list-item>b</dl-list-item>
      </dl-list>
    `);
    expect(el.shadowRoot!.querySelector('[role="list"]')).not.toBeNull();
    expect(el.querySelectorAll('dl-list-item').length).toBe(2);
  });

  it('compact reflects and changes the inherited row padding var', async () => {
    const el = await fixture<DlList>(html`<dl-list compact></dl-list>`);
    await elementUpdated(el);
    expect(el.hasAttribute('compact')).toBe(true);
    const pad = getComputedStyle(el).getPropertyValue('--dl-list-item-pad-y').trim();
    expect(pad).not.toBe('');
  });
});

describe('dl-list-item', () => {
  it('shows a divider by default and exposes the end slot', async () => {
    const el = await fixture<DlListItem>(html`<dl-list-item>main<span slot="end">42</span></dl-list-item>`);
    expect(el.divider).toBe(true);
    expect(el.hasAttribute('divider')).toBe(true);
    expect(el.shadowRoot!.querySelector('slot[name="end"]')).not.toBeNull();
  });

  it('can disable the divider', async () => {
    const el = await fixture<DlListItem>(html`<dl-list-item .divider=${false}>x</dl-list-item>`);
    await elementUpdated(el);
    expect(el.hasAttribute('divider')).toBe(false);
  });
});
