import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Toggle / switch control.
 *
 * @fires dl-change - Fires on toggle with `detail.checked`
 */
@customElement('dl-toggle')
export class DlToggle extends LitElement {
  @property() label = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--tk-dlite-semantic-spacing-200);
      font-family: var(--tk-dlite-semantic-typography-font-body);
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
      cursor: pointer;
    }
    :host([disabled]) {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .track {
      width: 40px;
      height: 22px;
      border-radius: var(--tk-dlite-semantic-border-radius-full);
      background: var(--tk-dlite-semantic-color-border);
      position: relative;
      transition: background var(--tk-dlite-semantic-duration-fast) ease;
      flex-shrink: 0;
    }
    :host([checked]) .track {
      background: var(--tk-dlite-semantic-color-action-primary);
    }
    .thumb {
      width: 18px;
      height: 18px;
      border-radius: var(--tk-dlite-semantic-border-radius-full);
      background: var(--tk-dlite-semantic-color-surface-base);
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform var(--tk-dlite-semantic-duration-fast) ease;
    }
    :host([checked]) .thumb {
      transform: translateX(18px);
    }
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    label {
      display: inline-flex;
      align-items: center;
      gap: var(--tk-dlite-semantic-spacing-200);
      cursor: inherit;
    }
  `;

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('dl-change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <label @click=${this._toggle}>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.checked}
          tabindex="-1"
        />
        <span class="track" part="track">
          <span class="thumb"></span>
        </span>
        ${this.label ? html`<span>${this.label}</span>` : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-toggle': DlToggle;
  }
}
