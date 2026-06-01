import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Small inline badge / tag for status or categorization.
 *
 * `appearance="solid"` (default) uses bold feedback fills; `appearance="soft"`
 * uses the subtle feedback `-bg`/`-fg` token pairs (since tokens 0.3.0) for a
 * quieter status pill.
 *
 * @slot - Badge text content
 */
@customElement('dl-badge')
export class DlBadge extends LitElement {
  /** Visual variant */
  @property({ reflect: true }) variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';

  /** Fill style: solid (bold) or soft (subtle tinted background) */
  @property({ reflect: true }) appearance: 'solid' | 'soft' = 'solid';

  static styles = css`
    :host {
      display: inline-flex;
    }
    span {
      display: inline-flex;
      align-items: center;
      gap: var(--tk-dlite-semantic-spacing-100);
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

    /* ===== SOLID (default) ===== */
    :host([variant='default']) span {
      background: var(--tk-dlite-semantic-color-action-secondary);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='primary']) span {
      background: var(--tk-dlite-semantic-color-action-primary);
      color: var(--tk-dlite-semantic-color-text-on-primary);
    }
    :host([variant='success']) span {
      background: var(--tk-dlite-semantic-color-feedback-success);
      color: var(--tk-dlite-semantic-color-text-on-primary);
    }
    :host([variant='warning']) span {
      background: var(--tk-dlite-semantic-color-feedback-warning);
      color: var(--tk-dlite-semantic-color-text-on-primary);
    }
    :host([variant='danger']) span {
      background: var(--tk-dlite-semantic-color-feedback-danger);
      color: var(--tk-dlite-semantic-color-text-on-primary);
    }
    :host([variant='info']) span {
      background: var(--tk-dlite-semantic-color-feedback-info);
      color: var(--tk-dlite-semantic-color-text-on-primary);
    }

    /* ===== SOFT (subtle tinted bg + strong fg) ===== */
    :host([appearance='soft'][variant='default']) span {
      background: var(--tk-dlite-semantic-color-surface-sunken);
      color: var(--tk-dlite-semantic-color-text-secondary);
    }
    :host([appearance='soft'][variant='primary']) span {
      background: var(--tk-dlite-semantic-color-feedback-info-bg);
      color: var(--tk-dlite-semantic-color-feedback-info-fg);
    }
    :host([appearance='soft'][variant='success']) span {
      background: var(--tk-dlite-semantic-color-feedback-success-bg);
      color: var(--tk-dlite-semantic-color-feedback-success-fg);
    }
    :host([appearance='soft'][variant='warning']) span {
      background: var(--tk-dlite-semantic-color-feedback-warning-bg);
      color: var(--tk-dlite-semantic-color-feedback-warning-fg);
    }
    :host([appearance='soft'][variant='danger']) span {
      background: var(--tk-dlite-semantic-color-feedback-danger-bg);
      color: var(--tk-dlite-semantic-color-feedback-danger-fg);
    }
    :host([appearance='soft'][variant='info']) span {
      background: var(--tk-dlite-semantic-color-feedback-info-bg);
      color: var(--tk-dlite-semantic-color-feedback-info-fg);
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
