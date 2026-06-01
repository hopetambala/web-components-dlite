import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-heading.js';
import type { DlHeading } from './dl-heading.js';

describe('dl-heading', () => {
  it('renders an h2 by default', async () => {
    const el = await fixture<DlHeading>(html`<dl-heading>Title</dl-heading>`);
    expect(el.shadowRoot!.querySelector('h2')).not.toBeNull();
  });

  it('renders the heading element matching level', async () => {
    const el = await fixture<DlHeading>(html`<dl-heading level="1">Title</dl-heading>`);
    expect(el.shadowRoot!.querySelector('h1')).not.toBeNull();
    expect(el.level).toBe(1);
  });
});
