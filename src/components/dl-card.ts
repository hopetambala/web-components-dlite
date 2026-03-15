import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Card container with optional padding and elevation.
 *
 * @slot - Default slot for card content
 */
@customElement('dl-card')
export class DlCard extends LitElement {
  /** Padding token name */
  @property() padding = '400';

  /** Border radius token name */
  @property({ attribute: 'radius' }) radius = 'md';

  /** Elevation token name (none | low | medium | high) */
  @property() elevation: 'none' | 'low' | 'medium' | 'high' = 'low';

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      background: var(--tk-dlite-semantic-color-surface-raised);
      border: 1px solid var(--tk-dlite-semantic-color-border);
      overflow: hidden;
    }
  `;

  render() {
    const shadow = this.elevation === 'none'
      ? 'none'
      : `var(--tk-dlite-semantic-elevation-${this.elevation})`;

    return html`
      <style>
        :host {
          padding: var(--tk-dlite-semantic-spacing-${this.padding});
          border-radius: var(--tk-dlite-semantic-border-radius-${this.radius});
          box-shadow: ${shadow};
        }
      </style>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-card': DlCard;
  }
}
