import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Inline cluster layout that wraps children with consistent spacing.
 *
 * @slot - Default slot for child elements
 */
@customElement('dl-cluster')
export class DlCluster extends LitElement {
  /** Spacing token name */
  @property() gap = '200';

  /** Justify content */
  @property() justify: 'start' | 'center' | 'end' | 'between' = 'start';

  /** Align items */
  @property() align: 'start' | 'center' | 'end' | 'stretch' = 'center';

  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      font-family: var(--tk-dlite-semantic-typography-font-body);
    }
  `;

  private get _justify() {
    return this.justify === 'between' ? 'space-between' : `flex-${this.justify}`;
  }

  private get _align() {
    return this.align === 'stretch' ? 'stretch' : `flex-${this.align}`;
  }

  updated() {
    this.style.gap = `var(--tk-dlite-semantic-spacing-${this.gap})`;
    this.style.justifyContent = this._justify;
    this.style.alignItems = this._align;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-cluster': DlCluster;
  }
}
