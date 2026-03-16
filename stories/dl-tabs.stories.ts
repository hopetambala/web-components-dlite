import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-tabs.js';
import '../src/components/dl-tab.js';
import '../src/components/dl-text.js';
import '../src/components/dl-heading.js';

const meta: Meta = {
  title: 'Navigation/Tabs',
  component: 'dl-tabs',
  argTypes: {
    value: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dl-tabs value="tab1">
      <dl-tab label="Overview" value="tab1">
        <dl-text>This is the overview panel content.</dl-text>
      </dl-tab>
      <dl-tab label="Details" value="tab2">
        <dl-text>Here are the details for this item.</dl-text>
      </dl-tab>
      <dl-tab label="Settings" value="tab3">
        <dl-text>Settings and configuration live here.</dl-text>
      </dl-tab>
    </dl-tabs>
  `,
};

export const PreSelected: Story = {
  render: () => html`
    <dl-tabs value="details">
      <dl-tab label="Overview" value="overview">
        <dl-text>Overview content.</dl-text>
      </dl-tab>
      <dl-tab label="Details" value="details">
        <dl-text>Details panel is pre-selected.</dl-text>
      </dl-tab>
      <dl-tab label="History" value="history">
        <dl-text>History content.</dl-text>
      </dl-tab>
    </dl-tabs>
  `,
};

export const DisabledTab: Story = {
  render: () => html`
    <dl-tabs value="active">
      <dl-tab label="Active" value="active">
        <dl-text>This tab is selectable.</dl-text>
      </dl-tab>
      <dl-tab label="Disabled" value="disabled" disabled>
        <dl-text>You should not be able to see this.</dl-text>
      </dl-tab>
      <dl-tab label="Another" value="another">
        <dl-text>Another selectable tab.</dl-text>
      </dl-tab>
    </dl-tabs>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <dl-tabs value="tab1">
      ${[1, 2, 3, 4, 5, 6, 7, 8].map(
        (n) => html`
          <dl-tab label="Tab ${n}" value="tab${n}">
            <dl-text>Content for tab ${n}.</dl-text>
          </dl-tab>
        `,
      )}
    </dl-tabs>
  `,
};

export const WithRichContent: Story = {
  render: () => html`
    <dl-tabs value="leaderboard">
      <dl-tab label="Leaderboard" value="leaderboard">
        <dl-heading level=${3}>Standings</dl-heading>
        <dl-text>Player rankings would go here.</dl-text>
      </dl-tab>
      <dl-tab label="Rosters" value="rosters">
        <dl-heading level=${3}>Team Rosters</dl-heading>
        <dl-text>Roster details would go here.</dl-text>
      </dl-tab>
    </dl-tabs>
  `,
};
