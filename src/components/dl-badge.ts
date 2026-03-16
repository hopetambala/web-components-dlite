import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Small inline badge / tag for status or categorization.
 *
 * @slot - Badge text content
 */
@customElement('dl-badge')
export class DlBadge extends LitElement {
  /** Visual variant */
  @property({ reflect: true }) variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';

  static styles = css`
    :host {
      display: inline-flex;
    }
    span {
      display: inline-flex;
      align-items: center;
      font-family: var(--tk-dlite-semantic-typography-font-heading);
      font-size: var(--tk-dlite-semantic-typography-size-200);
      font-weight: var(--tk-dlite-primitive-fontWeight-medium);
      line-height: 1;
      padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-300);
      border-radius: var(--tk-dlite-semantic-border-radius-full);
      white-space: nowrap;
      /* Default variant */
      background: var(--tk-dlite-semantic-color-action-secondary);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='default']) span {
      background: var(--tk-dlite-semantic-color-action-secondary);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='primary']) span {
      background: var(--tk-dlite-semantic-color-action-primary);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    :host([variant='success']) span {
      background: var(--tk-dlite-semantic-color-feedback-success);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    :host([variant='warning']) span {
      background: var(--tk-dlite-semantic-color-feedback-warning);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    :host([variant='danger']) span {
      background: var(--tk-dlite-semantic-color-feedback-danger);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
  `;

  render() {
    return html`<span><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-badge': DlBadge;
  }
}
