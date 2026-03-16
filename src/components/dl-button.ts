import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Button with variant and size props.
 *
 * @slot - Button label
 */
@customElement('dl-button')
export class DlButton extends LitElement {
  /** Visual variant */
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';

  /** Size */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Disabled state */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Full width */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

  static styles = css`
    :host {
      display: inline-block;
    }
    :host([full-width]) {
      display: block;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--tk-dlite-semantic-spacing-200);
      border: none;
      cursor: pointer;
      font-family: var(--tk-dlite-semantic-typography-font-heading);
      font-weight: var(--tk-dlite-primitive-fontWeight-semibold);
      border-radius: var(--tk-dlite-semantic-border-radius-md);
      transition: background var(--tk-dlite-semantic-duration-fast) ease,
                  color var(--tk-dlite-semantic-duration-fast) ease;
      width: 100%;
    }
    button:focus-visible {
      outline: 2px solid var(--tk-dlite-semantic-color-primary);
      outline-offset: 2px;
    }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Sizes — default is md (no attribute needed for SSR compat) */
    button {
      font-size: var(--tk-dlite-semantic-typography-size-300);
      padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-400);
      /* Default variant is primary */
      background: var(--tk-dlite-semantic-color-action-primary);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-primary-active);
    }
    :host([size='sm']) button {
      font-size: var(--tk-dlite-semantic-typography-size-200);
      padding: var(--tk-dlite-semantic-spacing-100) var(--tk-dlite-semantic-spacing-300);
    }
    :host([size='lg']) button {
      font-size: var(--tk-dlite-semantic-typography-size-400);
      padding: var(--tk-dlite-semantic-spacing-300) var(--tk-dlite-semantic-spacing-500);
    }

    /* Primary */
    :host([variant='primary']) button {
      background: var(--tk-dlite-semantic-color-action-primary);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    :host([variant='primary']) button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-primary-active);
    }

    /* Secondary */
    :host([variant='secondary']) button {
      background: var(--tk-dlite-semantic-color-action-secondary);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='secondary']) button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-secondary-active);
    }

    /* Danger */
    :host([variant='danger']) button {
      background: var(--tk-dlite-semantic-color-feedback-danger);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    :host([variant='danger']) button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-feedback-danger-active);
    }

    /* Ghost */
    :host([variant='ghost']) button {
      background: transparent;
      color: var(--tk-dlite-semantic-color-action-primary);
    }
    :host([variant='ghost']) button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-secondary);
    }
  `;

  render() {
    return html`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-button': DlButton;
  }
}
