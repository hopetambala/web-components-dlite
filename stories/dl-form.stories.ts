import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-input.js';
import '../src/components/dl-textarea.js';
import '../src/components/dl-select.js';
import '../src/components/dl-checkbox.js';
import '../src/components/dl-toggle.js';
import '../src/components/dl-stack.js';
import '../src/components/dl-button.js';

import '../src/components/dl-alert.js';
import '../src/components/dl-text.js';

const meta: Meta = {
  title: 'Form/Inputs',
};
export default meta;

type Story = StoryObj;

export const TextInput: Story = {
  render: () => html`
    <dl-stack gap="400" style="max-width: 360px;">
      <dl-input label="Name" placeholder="Enter your name"></dl-input>
      <dl-input label="Email" type="email" placeholder="you@example.com"></dl-input>
      <dl-input label="With error" value="bad value" error="This field is invalid"></dl-input>
      <dl-input label="Disabled" placeholder="Can't edit" disabled></dl-input>
    </dl-stack>
  `,
};

export const Textarea: Story = {
  render: () => html`
    <dl-stack gap="400" style="max-width: 360px;">
      <dl-textarea label="Message" placeholder="Type your message…" rows="4"></dl-textarea>
      <dl-textarea label="With error" error="Required field" value=""></dl-textarea>
      <dl-textarea label="Disabled" placeholder="Can't edit" disabled></dl-textarea>
    </dl-stack>
  `,
};

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
];

export const Select: Story = {
  render: () => html`
    <dl-stack gap="400" style="max-width: 360px;">
      <dl-select label="Country" placeholder="Choose…" .options=${countryOptions}></dl-select>
      <dl-select label="With error" placeholder="Choose…" error="Selection required" .options=${countryOptions}></dl-select>
      <dl-select label="Disabled" placeholder="Choose…" disabled .options=${countryOptions}></dl-select>
      <dl-select label="Pre-selected" value="ca" .options=${countryOptions}></dl-select>
    </dl-stack>
  `,
};

export const CheckboxAndToggle: Story = {
  render: () => html`
    <dl-stack gap="300">
      <dl-checkbox label="I agree to the terms" checked></dl-checkbox>
      <dl-checkbox label="Subscribe to newsletter"></dl-checkbox>
      <dl-checkbox label="Disabled unchecked" disabled></dl-checkbox>
      <dl-checkbox label="Disabled checked" disabled checked></dl-checkbox>
      <dl-toggle label="Dark mode"></dl-toggle>
      <dl-toggle label="Notifications" checked></dl-toggle>
      <dl-toggle label="Disabled off" disabled></dl-toggle>
      <dl-toggle label="Disabled on" disabled checked></dl-toggle>
    </dl-stack>
  `,
};

export const FormExample: Story = {
  render: () => {
    const handleSubmit = (e: Event) => {
      const root = (e.target as HTMLElement).closest('dl-stack') ?? (e.target as HTMLElement).getRootNode();
      const container = root as Element;

      const name = (container.querySelector('dl-input[label="Full Name"]') as any)?.value ?? '';
      const email = (container.querySelector('dl-input[label="Email"]') as any)?.value ?? '';
      const bio = (container.querySelector('dl-textarea') as any)?.value ?? '';
      const role = (container.querySelector('dl-select') as any)?.value ?? '';
      const terms = (container.querySelector('dl-checkbox') as any)?.checked ?? false;

      const existing = container.querySelector('dl-alert');
      if (existing) existing.remove();

      const alert = document.createElement('dl-alert');
      alert.setAttribute('variant', 'info');
      alert.setAttribute('dismissible', '');
      alert.innerHTML = `
        <strong>Form values:</strong>
        <ul style="margin: 0.5em 0 0 1.2em; padding: 0;">
          <li>Name: ${name || '(empty)'}</li>
          <li>Email: ${email || '(empty)'}</li>
          <li>Bio: ${bio || '(empty)'}</li>
          <li>Role: ${role || '(empty)'}</li>
          <li>Terms accepted: ${terms ? 'Yes' : 'No'}</li>
        </ul>
      `;
      container.prepend(alert);
    };

    return html`
      <dl-stack gap="400" style="max-width: 400px;">
        <dl-input label="Full Name" placeholder="Jane Doe" required></dl-input>
        <dl-input label="Email" type="email" placeholder="jane@example.com" required></dl-input>
        <dl-textarea label="Bio" placeholder="Tell us about yourself…" rows="3"></dl-textarea>
        <dl-select label="Role" placeholder="Select…" .options=${[
          { value: 'dev', label: 'Developer' },
          { value: 'design', label: 'Designer' },
          { value: 'pm', label: 'Product Manager' },
        ]}></dl-select>
        <dl-checkbox label="I accept the terms and conditions"></dl-checkbox>
        <dl-button variant="primary" full-width @click=${handleSubmit}>Submit</dl-button>
      </dl-stack>
    `;
  },
};
