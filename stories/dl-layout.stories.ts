import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-stack.js';
import '../src/components/dl-cluster.js';
import '../src/components/dl-divider.js';
import '../src/components/dl-text.js';
import '../src/components/dl-badge.js';

const meta: Meta = {
  title: 'Layout/Primitives',
};
export default meta;

type Story = StoryObj;

/* ===== dl-stack ===== */

const box = (label: string) => html`
  <div style="padding: 0.75rem 1rem; background: var(--tk-dlite-semantic-color-surface-raised); border: 1px solid var(--tk-dlite-semantic-color-border); border-radius: var(--tk-dlite-semantic-border-radius-sm);">
    <dl-text>${label}</dl-text>
  </div>
`;

export const StackVertical: Story = {
  name: 'Stack — Vertical',
  render: () => html`
    <dl-stack gap="300">
      ${box('Item 1')} ${box('Item 2')} ${box('Item 3')}
    </dl-stack>
  `,
};

export const StackHorizontal: Story = {
  name: 'Stack — Horizontal',
  render: () => html`
    <dl-stack direction="horizontal" gap="300" align="center">
      ${box('Item 1')} ${box('Item 2')} ${box('Item 3')}
    </dl-stack>
  `,
};

export const StackAlignments: Story = {
  name: 'Stack — Alignments',
  render: () => html`
    <dl-stack gap="600">
      <dl-text weight="semibold">align="start"</dl-text>
      <dl-stack direction="horizontal" gap="200" align="start" style="min-height:80px; background: var(--tk-dlite-semantic-color-surface-sunken); padding: 0.5rem; border-radius: var(--tk-dlite-semantic-border-radius-md);">
        ${box('Short')} ${box('Taller\nitem')} ${box('Short')}
      </dl-stack>

      <dl-text weight="semibold">align="center"</dl-text>
      <dl-stack direction="horizontal" gap="200" align="center" style="min-height:80px; background: var(--tk-dlite-semantic-color-surface-sunken); padding: 0.5rem; border-radius: var(--tk-dlite-semantic-border-radius-md);">
        ${box('Short')} ${box('Taller\nitem')} ${box('Short')}
      </dl-stack>

      <dl-text weight="semibold">align="end"</dl-text>
      <dl-stack direction="horizontal" gap="200" align="end" style="min-height:80px; background: var(--tk-dlite-semantic-color-surface-sunken); padding: 0.5rem; border-radius: var(--tk-dlite-semantic-border-radius-md);">
        ${box('Short')} ${box('Taller\nitem')} ${box('Short')}
      </dl-stack>
    </dl-stack>
  `,
};

/* ===== dl-cluster ===== */

const tag = (label: string) => html`<dl-badge>${label}</dl-badge>`;

export const ClusterDefault: Story = {
  name: 'Cluster — Default',
  render: () => html`
    <dl-cluster gap="200">
      ${tag('HTML')} ${tag('CSS')} ${tag('JavaScript')} ${tag('TypeScript')}
      ${tag('Lit')} ${tag('React')} ${tag('Storybook')} ${tag('Vite')}
    </dl-cluster>
  `,
};

export const ClusterJustify: Story = {
  name: 'Cluster — Justify',
  render: () => html`
    <dl-stack gap="600">
      <div>
        <dl-text weight="semibold">justify="start"</dl-text>
        <dl-cluster gap="200" justify="start" style="background: var(--tk-dlite-semantic-color-surface-sunken); padding: 0.5rem; border-radius: var(--tk-dlite-semantic-border-radius-md);">
          ${tag('A')} ${tag('B')} ${tag('C')}
        </dl-cluster>
      </div>
      <div>
        <dl-text weight="semibold">justify="center"</dl-text>
        <dl-cluster gap="200" justify="center" style="background: var(--tk-dlite-semantic-color-surface-sunken); padding: 0.5rem; border-radius: var(--tk-dlite-semantic-border-radius-md);">
          ${tag('A')} ${tag('B')} ${tag('C')}
        </dl-cluster>
      </div>
      <div>
        <dl-text weight="semibold">justify="end"</dl-text>
        <dl-cluster gap="200" justify="end" style="background: var(--tk-dlite-semantic-color-surface-sunken); padding: 0.5rem; border-radius: var(--tk-dlite-semantic-border-radius-md);">
          ${tag('A')} ${tag('B')} ${tag('C')}
        </dl-cluster>
      </div>
      <div>
        <dl-text weight="semibold">justify="between"</dl-text>
        <dl-cluster gap="200" justify="between" style="background: var(--tk-dlite-semantic-color-surface-sunken); padding: 0.5rem; border-radius: var(--tk-dlite-semantic-border-radius-md);">
          ${tag('A')} ${tag('B')} ${tag('C')}
        </dl-cluster>
      </div>
    </dl-stack>
  `,
};

/* ===== dl-divider ===== */

export const DividerHorizontal: Story = {
  name: 'Divider — Horizontal',
  render: () => html`
    <dl-stack gap="100">
      <dl-text>Content above</dl-text>
      <dl-divider></dl-divider>
      <dl-text>Content below</dl-text>
    </dl-stack>
  `,
};

export const DividerVertical: Story = {
  name: 'Divider — Vertical',
  render: () => html`
    <dl-stack direction="horizontal" gap="100" align="center" style="height: 48px;">
      <dl-text>Left</dl-text>
      <dl-divider orientation="vertical" spacing="200"></dl-divider>
      <dl-text>Right</dl-text>
    </dl-stack>
  `,
};

export const DividerSpacing: Story = {
  name: 'Divider — Spacing Variants',
  render: () => html`
    <dl-stack gap="100">
      <dl-text weight="semibold">spacing="200"</dl-text>
      <dl-text>Above</dl-text>
      <dl-divider spacing="200"></dl-divider>
      <dl-text>Below</dl-text>

      <dl-text weight="semibold">spacing="400" (default)</dl-text>
      <dl-text>Above</dl-text>
      <dl-divider spacing="400"></dl-divider>
      <dl-text>Below</dl-text>

      <dl-text weight="semibold">spacing="600"</dl-text>
      <dl-text>Above</dl-text>
      <dl-divider spacing="600"></dl-divider>
      <dl-text>Below</dl-text>
    </dl-stack>
  `,
};
