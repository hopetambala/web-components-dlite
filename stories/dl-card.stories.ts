import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-card.js';
import '../src/components/dl-heading.js';
import '../src/components/dl-text.js';
import '../src/components/dl-stack.js';
import '../src/components/dl-badge.js';
import '../src/components/dl-cluster.js';

const meta: Meta = {
  title: 'Layout/Card',
  component: 'dl-card',
  argTypes: {
    padding: { control: 'select', options: ['200', '300', '400', '500', '600'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    elevation: { control: 'select', options: ['none', 'low', 'medium', 'high'] },
    interactive: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { padding: '400', radius: 'md', elevation: 'low' },
  render: (args) => html`
    <dl-card padding=${args.padding} radius=${args.radius} elevation=${args.elevation}>
      <dl-stack gap="200">
        <dl-heading level="3">Card Title</dl-heading>
        <dl-text color="secondary">This is a simple card component styled with dlite tokens.</dl-text>
      </dl-stack>
    </dl-card>
  `,
};

export const Elevated: Story = {
  render: () => html`
    <dl-stack direction="horizontal" gap="400">
      <dl-card elevation="low">
        <dl-heading level="4">Low</dl-heading>
        <dl-text size="300" color="secondary">Subtle shadow</dl-text>
      </dl-card>
      <dl-card elevation="medium">
        <dl-heading level="4">Medium</dl-heading>
        <dl-text size="300" color="secondary">Moderate shadow</dl-text>
      </dl-card>
      <dl-card elevation="high">
        <dl-heading level="4">High</dl-heading>
        <dl-text size="300" color="secondary">Prominent shadow</dl-text>
      </dl-card>
    </dl-stack>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <dl-stack gap="300" style="max-width:24rem">
      <dl-card interactive @dl-click=${() => console.log('Card 1 clicked')}>
        <dl-cluster justify="between" gap="200">
          <span style="font-weight:600">Players</span>
          <dl-badge>12</dl-badge>
        </dl-cluster>
      </dl-card>
      <dl-card interactive @dl-click=${() => console.log('Card 2 clicked')}>
        <dl-cluster justify="between" gap="200">
          <span style="font-weight:600">Episodes</span>
          <dl-badge variant="success">scored</dl-badge>
        </dl-cluster>
      </dl-card>
      <dl-card interactive disabled>
        <dl-cluster justify="between" gap="200">
          <span style="font-weight:600">Disabled Card</span>
          <dl-badge variant="danger">locked</dl-badge>
        </dl-cluster>
      </dl-card>
    </dl-stack>
  `,
};

export const InteractiveRich: Story = {
  name: 'Interactive (Rich Content)',
  render: () => html`
    <dl-stack gap="300" style="max-width:24rem">
      <dl-card interactive @dl-click=${() => console.log('League clicked')}>
        <dl-stack gap="100">
          <dl-heading level="4">Season 47</dl-heading>
          <dl-text size="300" color="secondary">Spring 2026</dl-text>
          <dl-text size="200" color="tertiary">Code: ABC123</dl-text>
        </dl-stack>
      </dl-card>
    </dl-stack>
  `,
};
