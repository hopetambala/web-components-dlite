import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Simple styled table wrapper.
 *
 * @slot - Table content (thead, tbody, etc.)
 */
@customElement('dl-table')
export class DlTable extends LitElement {
  /** Whether rows should have striped backgrounds */
  @property({ type: Boolean, reflect: true }) striped = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
      overflow-x: auto;
    }
    ::slotted(table) {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }
    ::slotted(th),
    ::slotted(td) {
      padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-300);
      text-align: left;
      border-bottom: 1px solid var(--tk-dlite-semantic-color-border);
    }
    ::slotted(th) {
      font-weight: var(--tk-dlite-primitive-fontWeight-semibold);
      font-size: var(--tk-dlite-semantic-typography-size-200);
      color: var(--tk-dlite-semantic-color-text-secondary);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-table': DlTable;
  }
}
