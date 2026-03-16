import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-alert.js';
import '../src/components/dl-spinner.js';
import '../src/components/dl-dialog.js';
import '../src/components/dl-button.js';
import '../src/components/dl-stack.js';
import '../src/components/dl-text.js';

const meta: Meta = {
  title: 'Feedback/Alerts & Dialog',
};
export default meta;

type Story = StoryObj;

export const Alerts: Story = {
  render: () => html`
    <dl-stack gap="300">
      <dl-alert variant="info">This is an informational message.</dl-alert>
      <dl-alert variant="success">Operation completed successfully!</dl-alert>
      <dl-alert variant="warning">Please review before proceeding.</dl-alert>
      <dl-alert variant="danger">Something went wrong.</dl-alert>
    </dl-stack>
  `,
};

export const AlertsDismissible: Story = {
  render: () => html`
    <dl-stack gap="300">
      <dl-alert variant="info" dismissible>Dismissible info alert.</dl-alert>
      <dl-alert variant="success" dismissible>Dismissible success alert.</dl-alert>
      <dl-alert variant="warning" dismissible>Dismissible warning alert.</dl-alert>
      <dl-alert variant="danger" dismissible>Dismissible danger alert.</dl-alert>
    </dl-stack>
  `,
};

export const Spinners: Story = {
  render: () => html`
    <dl-cluster gap="400" align="center">
      <dl-spinner size="sm"></dl-spinner>
      <dl-spinner size="md"></dl-spinner>
      <dl-spinner size="lg"></dl-spinner>
    </dl-cluster>
  `,
};

export const Dialog: Story = {
  render: () => {
    const openDialog = () => {
      const dialog = document.querySelector('dl-dialog') as any;
      if (dialog) dialog.open = true;
    };
    return html`
      <dl-button @click=${openDialog}>Open Dialog</dl-button>
      <dl-dialog heading="Confirm Action">
        <dl-text>Are you sure you want to proceed with this action?</dl-text>
        <div slot="footer">
          <dl-button variant="secondary" @click=${() => { (document.querySelector('dl-dialog') as any).open = false; }}>Cancel</dl-button>
          <dl-button variant="primary" @click=${() => { (document.querySelector('dl-dialog') as any).open = false; }}>Confirm</dl-button>
        </div>
      </dl-dialog>
    `;
  },
};
