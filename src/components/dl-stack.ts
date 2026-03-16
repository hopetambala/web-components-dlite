import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Vertical or horizontal stack layout.
 *
 * @slot - Default slot for child elements
 */
@customElement('dl-stack')
export class DlStack extends LitElement {
  /** Direction of the stack */
  @property({ reflect: true }) direction: 'vertical' | 'horizontal' = 'vertical';

  /** Spacing token name (e.g. "200", "sm", "md") */
  @property() gap = '400';

  /** Alignment of items on the cross axis */
  @property() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--tk-dlite-semantic-typography-font-body);
    }
    :host([direction='horizontal']) {
      flex-direction: row;
    }
  `;

  private _alignMap: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  updated() {
    this.style.gap = `var(--tk-dlite-semantic-spacing-${this.gap})`;
    this.style.alignItems = this._alignMap[this.align] || this.align;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-stack': DlStack;
  }
}
