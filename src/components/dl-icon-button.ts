import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Icon-only button for compact actions.
 *
 * @slot - Icon content (SVG or text)
 */
@customElement('dl-icon-button')
export class DlIconButton extends LitElement {
  /** Visual variant */
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'ghost' = 'secondary';

  /** Size */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Accessible label (required) */
  @property() label = '';

  /** Disabled state */
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      font-family: var(--tk-dlite-semantic-typography-font-heading);
      border-radius: var(--tk-dlite-semantic-border-radius-md);
      transition: background var(--tk-dlite-semantic-duration-fast) ease;
    }
    button:focus-visible {
      outline: 2px solid var(--tk-dlite-semantic-color-primary);
      outline-offset: 2px;
    }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Sizes — default is md */
    button { width: 36px; height: 36px; font-size: 18px; }
    :host([size='sm']) button { width: 28px; height: 28px; font-size: 14px; }
    :host([size='lg']) button { width: 44px; height: 44px; font-size: 22px; }

    /* Variants — default is secondary */
    button {
      background: var(--tk-dlite-semantic-color-action-secondary);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-secondary-active);
    }
    :host([variant='primary']) button {
      background: var(--tk-dlite-semantic-color-action-primary);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    :host([variant='primary']) button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-primary-active);
    }
    :host([variant='secondary']) button {
      background: var(--tk-dlite-semantic-color-action-secondary);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='secondary']) button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-secondary-active);
    }
    :host([variant='ghost']) button {
      background: transparent;
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    :host([variant='ghost']) button:hover:not(:disabled) {
      background: var(--tk-dlite-semantic-color-action-secondary);
    }

    ::slotted(svg) {
      width: 1em;
      height: 1em;
    }
  `;

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        aria-label=${this.label}
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-icon-button': DlIconButton;
  }
}
