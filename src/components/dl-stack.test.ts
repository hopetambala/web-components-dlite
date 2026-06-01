import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-stack.js';
import type { DlStack } from './dl-stack.js';

describe('dl-stack', () => {
  it('renders slotted children', async () => {
    const el = await fixture<DlStack>(html`<dl-stack><div>a</div><div>b</div></dl-stack>`);
    expect(el.children.length).toBe(2);
  });

  it('defaults to vertical and reflects direction', async () => {
    const el = await fixture<DlStack>(html`<dl-stack direction="horizontal"></dl-stack>`);
    expect(el.getAttribute('direction')).toBe('horizontal');
  });
});
