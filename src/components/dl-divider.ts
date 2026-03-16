import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Horizontal or vertical visual divider.
 */
@customElement('dl-divider')
export class DlDivider extends LitElement {
  /** Orientation */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Spacing token name for margin around the divider */
  @property() spacing = '400';

  static styles = css`
    :host {
      display: block;
      border: none;
      background: var(--tk-dlite-semantic-color-border);
      height: 1px;
      width: 100%;
    }
    :host([orientation='vertical']) {
      width: 1px;
      height: 100%;
      display: inline-block;
    }
  `;

  updated() {
    const margin = this.orientation === 'horizontal'
      ? `var(--tk-dlite-semantic-spacing-${this.spacing}) 0`
      : `0 var(--tk-dlite-semantic-spacing-${this.spacing})`;
    this.style.margin = margin;
  }

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-divider': DlDivider;
  }
}
