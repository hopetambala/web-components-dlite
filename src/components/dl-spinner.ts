import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Loading spinner indicator.
 */
@customElement('dl-spinner')
export class DlSpinner extends LitElement {
  /** Size */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  static styles = css`
    :host {
      display: inline-block;
    }
    .spinner {
      border-style: solid;
      border-color: var(--tk-dlite-semantic-color-border);
      border-top-color: var(--tk-dlite-semantic-color-primary);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    /* Sizes — default is md */
    .spinner { width: 24px; height: 24px; border-width: 3px; }
    :host([size='sm']) .spinner { width: 16px; height: 16px; border-width: 2px; }
    :host([size='lg']) .spinner { width: 40px; height: 40px; border-width: 4px; }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  render() {
    return html`<div class="spinner" role="status" aria-label="Loading"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-spinner': DlSpinner;
  }
}
