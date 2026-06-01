import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-cluster.js';
import type { DlCluster } from './dl-cluster.js';

describe('dl-cluster', () => {
  it('renders slotted children', async () => {
    const el = await fixture<DlCluster>(html`<dl-cluster><span>a</span><span>b</span></dl-cluster>`);
    expect(el.children.length).toBe(2);
  });

  it('accepts justify and align', async () => {
    const el = await fixture<DlCluster>(html`<dl-cluster justify="between" align="end"></dl-cluster>`);
    expect(el.justify).toBe('between');
    expect(el.align).toBe('end');
  });
});
