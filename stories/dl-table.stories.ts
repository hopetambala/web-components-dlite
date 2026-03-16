import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/components/dl-table.js';

const meta: Meta = {
  title: 'Data/Table',
  component: 'dl-table',
  argTypes: {
    striped: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dl-table>
      <table>
        <thead>
          <tr><th>Name</th><th>Role</th><th>Score</th></tr>
        </thead>
        <tbody>
          <tr><td>Alice</td><td>Captain</td><td>42</td></tr>
          <tr><td>Bob</td><td>Navigator</td><td>38</td></tr>
          <tr><td>Charlie</td><td>Engineer</td><td>35</td></tr>
          <tr><td>Diana</td><td>Medic</td><td>29</td></tr>
        </tbody>
      </table>
    </dl-table>
  `,
};

export const Striped: Story = {
  render: () => html`
    <dl-table striped>
      <table>
        <thead>
          <tr><th>Name</th><th>Role</th><th>Score</th></tr>
        </thead>
        <tbody>
          <tr><td>Alice</td><td>Captain</td><td>42</td></tr>
          <tr><td>Bob</td><td>Navigator</td><td>38</td></tr>
          <tr><td>Charlie</td><td>Engineer</td><td>35</td></tr>
          <tr><td>Diana</td><td>Medic</td><td>29</td></tr>
          <tr><td>Eve</td><td>Pilot</td><td>25</td></tr>
        </tbody>
      </table>
    </dl-table>
    <style>
      dl-table[striped] tbody tr:nth-child(even) {
        background: var(--dl-table-stripe-bg);
      }
    </style>
  `,
};
