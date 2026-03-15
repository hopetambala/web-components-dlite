import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Semantic heading element (h1–h6).
 *
 * @slot - Heading text content
 */
@customElement('dl-heading')
export class DlHeading extends LitElement {
  /** Heading level (1–6) */
  @property({ type: Number }) level: 1 | 2 | 3 | 4 | 5 | 6 = 2;

  /** Typography size token (100–1000). Defaults vary by level. */
  @property() size = '';

  static styles = css`
    :host {
      display: block;
      color: var(--tk-dlite-semantic-color-text-primary);
      font-family: var(--tk-dlite-semantic-typography-font-heading);
      margin: 0;
    }
    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font: inherit;
      color: inherit;
    }
  `;

  private get _size() {
    if (this.size) return this.size;
    const map: Record<number, string> = { 1: '1000', 2: '800', 3: '700', 4: '600', 5: '500', 6: '400' };
    return map[this.level] ?? '800';
  }

  private get _weight() {
    return this.level <= 2 ? '700' : '600';
  }

  render() {
    const tag = `h${this.level}`;
    const fontSize = `var(--tk-dlite-semantic-typography-size-${this._size})`;
    return html`
      <style>
        :host {
          font-size: ${fontSize};
          font-weight: ${this._weight};
          line-height: var(--tk-dlite-primitive-number-line-height-snug);
          letter-spacing: var(--tk-dlite-primitive-dimension-letter-spacing-tight);
        }
      </style>
      ${this.level === 1 ? html`<h1><slot></slot></h1>` : ''}
      ${this.level === 2 ? html`<h2><slot></slot></h2>` : ''}
      ${this.level === 3 ? html`<h3><slot></slot></h3>` : ''}
      ${this.level === 4 ? html`<h4><slot></slot></h4>` : ''}
      ${this.level === 5 ? html`<h5><slot></slot></h5>` : ''}
      ${this.level === 6 ? html`<h6><slot></slot></h6>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-heading': DlHeading;
  }
}
