import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-list.js';
import '../src/components/dl-list-item.js';
import '../src/components/dl-accordion.js';
import '../src/components/dl-badge.js';
import '../src/components/dl-text.js';
import '../src/components/dl-stack.js';
import '../src/components/dl-cluster.js';

const meta: Meta = {
  title: 'Collections/List, Accordion & Status',
};
export default meta;

type Story = StoryObj;

export const List: Story = {
  render: () => html`
    <dl-list>
      <dl-list-item>Households surveyed <span slot="end">128</span></dl-list-item>
      <dl-list-item>Active surveyors <span slot="end">7</span></dl-list-item>
      <dl-list-item>Records today <span slot="end">42</span></dl-list-item>
      <dl-list-item>Avg completeness <span slot="end">86%</span></dl-list-item>
    </dl-list>
  `,
};

export const ListCompactNoDivider: Story = {
  render: () => html`
    <dl-list compact>
      <dl-list-item .divider=${false}>fname</dl-list-item>
      <dl-list-item .divider=${false}>lname</dl-list-item>
      <dl-list-item .divider=${false}>householdId</dl-list-item>
    </dl-list>
  `,
};

export const Accordion: Story = {
  render: () => html`
    <dl-accordion heading="Block properties" open>
      <dl-text>Editing the selected form block. Toggle required, allow other, multi-select.</dl-text>
    </dl-accordion>
    <dl-accordion heading="Schema">
      <dl-text>The formikKey and validation schema for this field.</dl-text>
    </dl-accordion>
    <dl-accordion heading="Advanced" disabled>
      <dl-text>Disabled section.</dl-text>
    </dl-accordion>
  `,
};

export const StatusBadgesSoft: Story = {
  render: () => html`
    <dl-cluster gap="200">
      <dl-badge appearance="soft" variant="success">Complete</dl-badge>
      <dl-badge appearance="soft" variant="warning">Pending</dl-badge>
      <dl-badge appearance="soft" variant="danger">Failed</dl-badge>
      <dl-badge appearance="soft" variant="info">Info</dl-badge>
    </dl-cluster>
  `,
};

export const StatusBadgesSolidVsSoft: Story = {
  render: () => html`
    <dl-stack gap="300">
      <dl-cluster gap="200">
        <dl-badge variant="success">Solid</dl-badge>
        <dl-badge variant="warning">Solid</dl-badge>
        <dl-badge variant="danger">Solid</dl-badge>
        <dl-badge variant="info">Solid</dl-badge>
      </dl-cluster>
      <dl-cluster gap="200">
        <dl-badge appearance="soft" variant="success">Soft</dl-badge>
        <dl-badge appearance="soft" variant="warning">Soft</dl-badge>
        <dl-badge appearance="soft" variant="danger">Soft</dl-badge>
        <dl-badge appearance="soft" variant="info">Soft</dl-badge>
      </dl-cluster>
    </dl-stack>
  `,
};
