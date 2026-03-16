import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-heading.js';
import '../src/components/dl-text.js';
import '../src/components/dl-badge.js';
import '../src/components/dl-stack.js';

const meta: Meta = {
  title: 'Typography/Text',
};
export default meta;

type Story = StoryObj;

export const Headings: Story = {
  render: () => html`
    <dl-stack gap="300">
      <dl-heading level="1">Heading 1</dl-heading>
      <dl-heading level="2">Heading 2</dl-heading>
      <dl-heading level="3">Heading 3</dl-heading>
      <dl-heading level="4">Heading 4</dl-heading>
      <dl-heading level="5">Heading 5</dl-heading>
      <dl-heading level="6">Heading 6</dl-heading>
    </dl-stack>
  `,
};

export const HeadingSizeOverride: Story = {
  render: () => html`
    <dl-stack gap="300">
      <dl-heading level="3" size="800">h3 at size 800</dl-heading>
      <dl-heading level="1" size="400">h1 at size 400</dl-heading>
    </dl-stack>
  `,
};

export const BodyText: Story = {
  render: () => html`
    <dl-stack gap="200">
      <dl-text size="200" color="secondary">Small secondary text (200)</dl-text>
      <dl-text size="300">Default body text (300)</dl-text>
      <dl-text size="400">Larger body text (400)</dl-text>
      <dl-text size="500" weight="semibold">Semibold emphasized (500)</dl-text>
      <dl-text color="tertiary">Tertiary color text</dl-text>
    </dl-stack>
  `,
};

export const TextWeights: Story = {
  render: () => html`
    <dl-stack gap="200">
      <dl-text weight="regular">Regular weight</dl-text>
      <dl-text weight="medium">Medium weight</dl-text>
      <dl-text weight="semibold">Semibold weight</dl-text>
      <dl-text weight="bold">Bold weight</dl-text>
    </dl-stack>
  `,
};

export const TextColors: Story = {
  render: () => html`
    <dl-stack gap="200">
      <dl-text color="primary">Primary color</dl-text>
      <dl-text color="secondary">Secondary color</dl-text>
      <dl-text color="tertiary">Tertiary color</dl-text>
      <div style="background: var(--tk-dlite-semantic-color-action-primary); padding: 0.5rem; border-radius: 4px;">
        <dl-text color="on-brand">On-brand color (on colored bg)</dl-text>
      </div>
    </dl-stack>
  `,
};

export const TextTruncate: Story = {
  render: () => html`
    <div style="max-width: 200px; border: 1px dashed var(--tk-dlite-semantic-color-border); padding: 0.5rem;">
      <dl-text truncate>This is a very long text that should be truncated with an ellipsis when it overflows the container.</dl-text>
    </div>
  `,
};

export const Badges: Story = {
  render: () => html`
    <dl-cluster gap="200">
      <dl-badge variant="default">Default</dl-badge>
      <dl-badge variant="primary">Primary</dl-badge>
      <dl-badge variant="success">Success</dl-badge>
      <dl-badge variant="warning">Warning</dl-badge>
      <dl-badge variant="danger">Danger</dl-badge>
    </dl-cluster>
  `,
};
