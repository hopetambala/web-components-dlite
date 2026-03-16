import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Alert / notification banner.
 *
 * @slot - Alert message content
 */
@customElement('dl-alert')
export class DlAlert extends LitElement {
  /** Alert variant */
  @property({ reflect: true }) variant: 'info' | 'success' | 'warning' | 'danger' = 'info';

  /** Whether the alert can be dismissed */
  @property({ type: Boolean }) dismissible = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      font-size: var(--tk-dlite-semantic-typography-size-300);
      padding: var(--tk-dlite-semantic-spacing-300) var(--tk-dlite-semantic-spacing-400);
      border-radius: var(--tk-dlite-semantic-border-radius-md);
      border-left: 4px solid;
    }
    :host([variant='info']) {
      background: color-mix(in srgb, var(--tk-dlite-semantic-color-feedback-info) 10%, transparent);
      border-color: var(--tk-dlite-semantic-color-feedback-info);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='success']) {
      background: color-mix(in srgb, var(--tk-dlite-semantic-color-feedback-success) 10%, transparent);
      border-color: var(--tk-dlite-semantic-color-feedback-success);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='warning']) {
      background: color-mix(in srgb, var(--tk-dlite-semantic-color-feedback-warning) 10%, transparent);
      border-color: var(--tk-dlite-semantic-color-feedback-warning);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='danger']) {
      background: color-mix(in srgb, var(--tk-dlite-semantic-color-feedback-danger) 10%, transparent);
      border-color: var(--tk-dlite-semantic-color-feedback-danger);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    .wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--tk-dlite-semantic-spacing-200);
    }
    .content {
      flex: 1;
    }
    .dismiss {
      background: none;
      border: none;
      cursor: pointer;
      font-size: var(--tk-dlite-semantic-typography-size-400);
      color: inherit;
      padding: 0;
      line-height: 1;
      opacity: 0.6;
    }
    .dismiss:hover {
      opacity: 1;
    }
  `;

  private _dismiss() {
    this.dispatchEvent(new CustomEvent('dl-dismiss', { bubbles: true, composed: true }));
    this.remove();
  }

  render() {
    return html`
      <div class="wrapper" role="alert">
        <div class="content"><slot></slot></div>
        ${this.dismissible
          ? html`<button class="dismiss" aria-label="Dismiss" @click=${this._dismiss}>&times;</button>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-alert': DlAlert;
  }
}
