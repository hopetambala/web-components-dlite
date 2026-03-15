import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Body text with semantic styling.
 *
 * @slot - Text content
 */
@customElement('dl-text')
export class DlText extends LitElement {
  /** Typography size token (100–1000) */
  @property() size = '400';

  /** Text color: primary | secondary | tertiary | on-brand */
  @property() color: 'primary' | 'secondary' | 'tertiary' | 'on-brand' = 'primary';

  /** Font weight: regular | medium | semibold | bold */
  @property() weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular';

  /** Whether text should be truncated with ellipsis */
  @property({ type: Boolean }) truncate = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      line-height: var(--tk-dlite-primitive-number-line-height-normal);
      letter-spacing: var(--tk-dlite-primitive-dimension-letter-spacing-normal);
      margin: 0;
    }
    p {
      margin: 0;
      font: inherit;
      color: inherit;
    }
    :host([truncate]) p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  render() {
    return html`
      <style>
        :host {
          font-size: var(--tk-dlite-semantic-typography-size-${this.size});
          color: var(--tk-dlite-semantic-color-text-${this.color});
          font-weight: var(--tk-dlite-primitive-fontWeight-${this.weight});
        }
      </style>
      <p><slot></slot></p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-text': DlText;
  }
}
