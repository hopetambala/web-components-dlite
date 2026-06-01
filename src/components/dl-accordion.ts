import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Collapsible disclosure: a header that expands/collapses its content.
 *
 * @slot - Collapsible body content
 * @slot header - Header content (alternative to the `heading` attribute)
 * @fires dl-toggle - Fires on expand/collapse with `detail.open`
 * @fires toggle - Native-compatible toggle event with `detail.open`
 */
@customElement('dl-accordion')
export class DlAccordion extends LitElement {
  /** Whether the panel is expanded */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Header text (alternative to the `header` slot) */
  @property() heading = '';

  /** Disables toggling */
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      border-bottom: 1px solid var(--tk-dlite-semantic-color-border);
    }
    .header {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--tk-dlite-semantic-spacing-300);
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      padding: var(--tk-dlite-semantic-spacing-300) 0;
      font-family: var(--tk-dlite-semantic-typography-font-heading);
      font-size: var(--tk-dlite-semantic-typography-size-400);
      font-weight: var(--tk-dlite-primitive-fontWeight-semibold);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    .header:disabled {
      cursor: not-allowed;
      opacity: var(--tk-dlite-semantic-motion-opacity-disabled);
    }
    .header:focus-visible {
      outline: none;
      box-shadow: var(--tk-dlite-semantic-elevation-low);
    }
    .arrow {
      flex-shrink: 0;
      width: var(--tk-dlite-semantic-sizing-icon-sm);
      height: var(--tk-dlite-semantic-sizing-icon-sm);
      color: var(--tk-dlite-semantic-color-text-secondary);
      transition: transform var(--tk-dlite-semantic-motion-duration-base)
                  var(--tk-dlite-semantic-motion-easing-standard);
    }
    :host([open]) .arrow {
      transform: rotate(180deg);
    }
    /* 0fr -> 1fr grid trick animates to content height without a fixed max-height */
    .region {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--tk-dlite-semantic-motion-duration-base)
                  var(--tk-dlite-semantic-motion-easing-standard);
    }
    :host([open]) .region {
      grid-template-rows: 1fr;
    }
    .content {
      overflow: hidden;
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    .inner {
      padding-bottom: var(--tk-dlite-semantic-spacing-300);
    }
  `;

  private _toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    const detail = { open: this.open };
    this.dispatchEvent(new CustomEvent('dl-toggle', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toggle', { detail, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <button
        class="header"
        part="header"
        ?disabled=${this.disabled}
        aria-expanded=${this.open ? 'true' : 'false'}
        @click=${this._toggle}
      >
        <span><slot name="header">${this.heading}</slot></span>
        <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="region">
        <div class="content" part="content">
          <div class="inner"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-accordion': DlAccordion;
  }
}
