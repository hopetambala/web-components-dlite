import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Checkbox with label.
 *
 * @fires dl-change - Fires on change with `detail.checked`
 * @fires change - Native-compatible change event with `detail.checked` (works with React onChange)
 */
@customElement('dl-checkbox')
export class DlCheckbox extends LitElement {
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
    .box {
      width: 18px;
      height: 18px;
      border: 2px solid var(--tk-dlite-semantic-color-border);
      border-radius: var(--tk-dlite-semantic-border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--tk-dlite-semantic-duration-fast) ease;
      flex-shrink: 0;
    }
    :host([checked]) .box {
      background: var(--tk-dlite-semantic-color-action-primary);
      border-color: var(--tk-dlite-semantic-color-action-primary);
    }
    .check {
      display: none;
      width: 10px;
      height: 10px;
    }
    :host([checked]) .check {
      display: block;
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

  private _toggle(e: Event) {
    e.preventDefault();
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('dl-change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <label @click=${this._toggle}>
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          tabindex="-1"
        />
        <span class="box" part="box">
          <svg class="check" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        ${this.label ? html`<span>${this.label}</span>` : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-checkbox': DlCheckbox;
  }
}
