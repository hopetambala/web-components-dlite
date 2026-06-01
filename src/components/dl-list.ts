import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Vertical list container for `dl-list-item` rows.
 *
 * Sets the row padding density that child items inherit via the
 * `--dl-list-item-pad-y` custom property.
 *
 * @slot - One or more `dl-list-item` elements
 */
@customElement('dl-list')
export class DlList extends LitElement {
  /** Tighter row padding */
  @property({ type: Boolean, reflect: true }) compact = false;

  static styles = css`
    :host {
      display: block;
      --dl-list-item-pad-y: var(--tk-dlite-semantic-spacing-300);
    }
    :host([compact]) {
      --dl-list-item-pad-y: var(--tk-dlite-semantic-spacing-100);
    }
  `;

  render() {
    return html`<div role="list"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-list': DlList;
  }
}
