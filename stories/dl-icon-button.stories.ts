import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-icon-button.js';
import '../src/components/dl-stack.js';

const meta: Meta = {
  title: 'Actions/Icon Button',
  component: 'dl-icon-button',
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { variant: 'secondary', size: 'md', label: 'Close', disabled: false },
  render: (args) => html`
    <dl-icon-button variant=${args.variant} size=${args.size} label=${args.label} ?disabled=${args.disabled}>
      ✕
    </dl-icon-button>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <dl-stack direction="horizontal" gap="300" align="center">
      <dl-icon-button variant="primary" label="Add">＋</dl-icon-button>
      <dl-icon-button variant="secondary" label="Edit">✎</dl-icon-button>
      <dl-icon-button variant="ghost" label="More">⋯</dl-icon-button>
    </dl-stack>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <dl-stack direction="horizontal" gap="300" align="center">
      <dl-icon-button size="sm" label="Small">✕</dl-icon-button>
      <dl-icon-button size="md" label="Medium">✕</dl-icon-button>
      <dl-icon-button size="lg" label="Large">✕</dl-icon-button>
    </dl-stack>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <dl-stack direction="horizontal" gap="300" align="center">
      <dl-icon-button variant="primary" label="Disabled primary" disabled>＋</dl-icon-button>
      <dl-icon-button variant="secondary" label="Disabled secondary" disabled>✎</dl-icon-button>
      <dl-icon-button variant="ghost" label="Disabled ghost" disabled>⋯</dl-icon-button>
    </dl-stack>
  `,
};
