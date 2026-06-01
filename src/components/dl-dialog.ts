import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Modal dialog with backdrop.
 *
 * @slot - Dialog body content
 * @slot header - Dialog header content
 * @slot footer - Dialog footer content (actions)
 * @fires dl-close - Fires when dialog is closed
 * @fires close - Native-compatible close event (works with React onClose)
 */
@customElement('dl-dialog')
export class DlDialog extends LitElement {
  /** Whether the dialog is open */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Dialog heading text (alternative to header slot) */
  @property() heading = '';

  /** Whether clicking the backdrop closes the dialog */
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;

  /** Whether pressing Escape closes the dialog */
  @property({ type: Boolean, attribute: 'close-on-escape' }) closeOnEscape = true;

  /** Panel width: narrow (20rem) | normal (40rem) | wide (60rem) */
  @property({ reflect: true }) size: 'narrow' | 'normal' | 'wide' = 'normal';

  static styles = css`
    :host {
      display: none;
    }
    :host([open]) {
      display: block;
    }
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, var(--tk-dlite-semantic-motion-opacity-backdrop));
      z-index: var(--tk-dlite-semantic-z-index-modal);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--tk-dlite-semantic-spacing-400);
    }
    .panel {
      background: var(--tk-dlite-semantic-color-surface-raised);
      border-radius: var(--tk-dlite-semantic-border-radius-lg);
      box-shadow: var(--tk-dlite-semantic-elevation-high);
      max-width: var(--tk-dlite-semantic-sizing-modal-width-normal);
      width: 100%;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: dialog-in var(--tk-dlite-semantic-motion-duration-base)
                 var(--tk-dlite-semantic-motion-easing-entrance);
    }
    :host([size='narrow']) .panel {
      max-width: var(--tk-dlite-semantic-sizing-modal-width-narrow);
    }
    :host([size='wide']) .panel {
      max-width: var(--tk-dlite-semantic-sizing-modal-width-wide);
    }
    @keyframes dialog-in {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(8px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--tk-dlite-semantic-spacing-400);
      border-bottom: 1px solid var(--tk-dlite-semantic-color-border);
    }
    .header-text {
      font-family: var(--tk-dlite-semantic-typography-font-heading);
      font-size: var(--tk-dlite-semantic-typography-size-500);
      font-weight: var(--tk-dlite-primitive-fontWeight-semibold);
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: var(--tk-dlite-semantic-typography-size-500);
      color: var(--tk-dlite-semantic-color-text-secondary);
      padding: 0;
      line-height: 1;
    }
    .close-btn:hover {
      color: var(--tk-dlite-semantic-color-text-primary);
    }
    .body {
      padding: var(--tk-dlite-semantic-spacing-400);
      overflow-y: auto;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
      flex: 1;
    }
    .footer {
      padding: var(--tk-dlite-semantic-spacing-300) var(--tk-dlite-semantic-spacing-400);
      border-top: 1px solid var(--tk-dlite-semantic-color-border);
      display: flex;
      justify-content: flex-end;
      gap: var(--tk-dlite-semantic-spacing-200);
    }
    .footer:empty {
      display: none;
    }
  `;

  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open && this.closeOnEscape) {
      this._close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeydown);
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('dl-close', { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _onBackdropClick(e: Event) {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this._close();
    }
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div class="backdrop" @click=${this._onBackdropClick}>
        <div class="panel" role="dialog" aria-modal="true" aria-label=${this.heading}>
          <div class="header">
            <span class="header-text">
              <slot name="header">${this.heading}</slot>
            </span>
            <button class="close-btn" aria-label="Close" @click=${this._close}>&times;</button>
          </div>
          <div class="body" part="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-dialog': DlDialog;
  }
}
