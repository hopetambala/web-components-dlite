import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single row inside `dl-list`. Lays out default content on the left and the
 * `end` slot on the right, with a bottom divider by default (suppressed on the
 * last row). Row padding follows the parent list's density.
 *
 * @slot - Primary row content (left)
 * @slot end - Trailing content (right) — value, action, chevron, etc.
 */
@customElement('dl-list-item')
export class DlListItem extends LitElement {
  /** Show a divider below the row (default true; auto-suppressed on the last row) */
  @property({ type: Boolean, reflect: true }) divider = true;

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--tk-dlite-semantic-spacing-300);
      padding: var(--dl-list-item-pad-y, var(--tk-dlite-semantic-spacing-300)) 0;
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([divider]) .row {
      border-bottom: 1px solid var(--tk-dlite-semantic-color-border-subtle);
    }
    /* Never end the list on a divider */
    :host(:last-of-type) .row {
      border-bottom: none;
    }
    .end {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      color: var(--tk-dlite-semantic-color-text-secondary);
    }
  `;

  render() {
    return html`
      <div class="row" part="row">
        <span class="main"><slot></slot></span>
        <span class="end"><slot name="end"></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-list-item': DlListItem;
  }
}
