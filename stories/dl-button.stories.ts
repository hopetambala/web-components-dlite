import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-button.js';

const meta: Meta = {
  title: 'Actions/Button',
  component: 'dl-button',
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', disabled: false },
  render: (args) => html`
    <dl-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled} ?full-width=${args.fullWidth}>
      Button
    </dl-button>
  `,
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: (args) => html`<dl-button variant=${args.variant} size=${args.size}>Secondary</dl-button>`,
};

export const Danger: Story = {
  args: { variant: 'danger', size: 'md' },
  render: (args) => html`<dl-button variant=${args.variant} size=${args.size}>Delete</dl-button>`,
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
  render: (args) => html`<dl-button variant=${args.variant} size=${args.size}>Ghost</dl-button>`,
};

export const AllSizes: Story = {
  render: () => html`
    <dl-stack direction="horizontal" gap="200" align="center">
      <dl-button size="sm">Small</dl-button>
      <dl-button size="md">Medium</dl-button>
      <dl-button size="lg">Large</dl-button>
    </dl-stack>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <dl-stack direction="horizontal" gap="200" align="center">
      <dl-button variant="primary" disabled>Primary</dl-button>
      <dl-button variant="secondary" disabled>Secondary</dl-button>
      <dl-button variant="danger" disabled>Danger</dl-button>
      <dl-button variant="ghost" disabled>Ghost</dl-button>
    </dl-stack>
  `,
};

export const FullWidth: Story = {
  render: () => html`
    <dl-stack gap="200" style="max-width: 360px;">
      <dl-button full-width>Full Width Primary</dl-button>
      <dl-button variant="secondary" full-width>Full Width Secondary</dl-button>
    </dl-stack>
  `,
};
