import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-table.js';
import type { DlTable } from './dl-table.js';

describe('dl-table', () => {
  it('renders slotted table markup', async () => {
    const el = await fixture<DlTable>(html`<dl-table><table><tbody><tr><td>a</td></tr></tbody></table></dl-table>`);
    expect(el.querySelector('table')).not.toBeNull();
  });

  it('reflects striped', async () => {
    const el = await fixture<DlTable>(html`<dl-table striped></dl-table>`);
    expect(el.hasAttribute('striped')).toBe(true);
  });
});
