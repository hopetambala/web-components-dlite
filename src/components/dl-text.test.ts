import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, it, expect } from 'vitest';
import './dl-text.js';
import type { DlText } from './dl-text.js';

describe('dl-text', () => {
  it('renders slotted content with defaults', async () => {
    const el = await fixture<DlText>(html`<dl-text>hello</dl-text>`);
    expect(el.textContent).toContain('hello');
    expect(el.color).toBe('primary');
    expect(el.weight).toBe('regular');
  });

  it('accepts size, color, weight and truncate', async () => {
    const el = await fixture<DlText>(html`<dl-text size="200" color="secondary" weight="bold" truncate>x</dl-text>`);
    expect(el.size).toBe('200');
    expect(el.color).toBe('secondary');
    expect(el.weight).toBe('bold');
    expect(el.truncate).toBe(true);
  });
});
