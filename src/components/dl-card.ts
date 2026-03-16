import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Card container with optional padding, elevation, and interactive mode.
 *
 * When `interactive` is set, the card renders as a semantic `<button>`,
 * gains hover/focus/active states, and dispatches `dl-click` + `click`
 * CustomEvents on activation.
 *
 * @slot - Default slot for card content
 */
@customElement('dl-card')
export class DlCard extends LitElement {
  /** Padding token name */
  @property() padding = '400';

  /** Border radius token name */
  @property({ attribute: 'radius' }) radius = 'md';

  /** Elevation token name (none | low | medium | high) */
  @property() elevation: 'none' | 'low' | 'medium' | 'high' = 'low';

  /** Makes the card a clickable button with hover/focus states */
  @property({ type: Boolean, reflect: true }) interactive = false;

  /** Disabled state (only applies when interactive) */
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      background: var(--tk-dlite-semantic-color-surface-raised);
      border: 1px solid var(--tk-dlite-semantic-color-border);
      overflow: hidden;
    }
    :host([interactive]) {
      cursor: pointer;
      transition: background var(--tk-dlite-semantic-duration-fast) ease,
                  border-color var(--tk-dlite-semantic-duration-fast) ease,
                  box-shadow var(--tk-dlite-semantic-duration-fast) ease;
    }
    :host([interactive]:hover) {
      background: var(--tk-dlite-semantic-color-surface-hover);
      border-color: var(--tk-dlite-semantic-color-border-strong);
    }
    :host([interactive]:active) {
      background: var(--tk-dlite-semantic-color-surface-pressed);
    }
    :host([interactive]:focus-visible) {
      outline: 2px solid var(--tk-dlite-semantic-color-primary);
      outline-offset: 2px;
    }
    :host([interactive][disabled]) {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }
    button {
      appearance: none;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      font: inherit;
      color: inherit;
      display: block;
      width: 100%;
      text-align: left;
      cursor: inherit;
    }
  `;

  updated() {
    const shadow = this.elevation === 'none'
      ? 'none'
      : `var(--tk-dlite-semantic-elevation-${this.elevation})`;
    this.style.padding = `var(--tk-dlite-semantic-spacing-${this.padding})`;
    this.style.borderRadius = `var(--tk-dlite-semantic-border-radius-${this.radius})`;
    this.style.boxShadow = shadow;

    if (this.interactive) {
      this.setAttribute('role', 'button');
      this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('tabindex');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeydown);
  }

  private _onClick = (e: Event) => {
    if (this.disabled) { e.preventDefault(); return; }
    this.dispatchEvent(new CustomEvent('dl-click', { bubbles: true, composed: true }));
  };

  private _onKeydown = (e: KeyboardEvent) => {
    if (!this.interactive || this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._onClick(e);
      this.click();
    }
  };

  render() {
    if (this.interactive) {
      return html`<button
        part="button"
        ?disabled=${this.disabled}
        @click=${this._onClick}
      ><slot></slot></button>`;
    }
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-card': DlCard;
  }
}
