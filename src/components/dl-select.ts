import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Native select wrapper with dlite styling.
 *
 * Pass options via the `options` property (JSON array) or the `options` attribute
 * (JSON string). Include `{ value: '', label: 'Choose…' }` for a placeholder.
 *
 * @fires dl-change - Fires on change with `detail.value`
 * @fires change - Native-compatible change event with `detail.value` (works with React onChange)
 */
@customElement('dl-select')
export class DlSelect extends LitElement {
  @property() label = '';
  @property() value = '';
  @property() error = '';
  @property() placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  /** Options array — set via JS property or JSON attribute string */
  @property({
    type: Array,
    converter: {
      fromAttribute(val: string | null): SelectOption[] {
        if (!val) return [];
        try { return JSON.parse(val); } catch { return []; }
      },
    },
  })
  options: SelectOption[] = [];

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
    }
    label {
      display: block;
      font-size: var(--tk-dlite-semantic-typography-size-200);
      font-weight: var(--tk-dlite-primitive-fontWeight-medium);
      color: var(--tk-dlite-semantic-color-text-primary);
      margin-bottom: var(--tk-dlite-semantic-spacing-100);
    }
    .select-wrapper {
      position: relative;
    }
    select {
      box-sizing: border-box;
      width: 100%;
      font-family: inherit;
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
      background: var(--tk-dlite-semantic-color-surface-base);
      border: 1px solid var(--tk-dlite-semantic-color-border);
      border-radius: var(--tk-dlite-semantic-border-radius-md);
      padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-300);
      appearance: none;
      cursor: pointer;
      transition: border-color var(--tk-dlite-semantic-duration-fast) ease;
      padding-right: var(--tk-dlite-semantic-spacing-600);
    }
    .select-wrapper::after {
      content: '';
      position: absolute;
      right: var(--tk-dlite-semantic-spacing-300);
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--tk-dlite-semantic-color-text-secondary);
      pointer-events: none;
    }
    select:focus {
      outline: none;
      border-color: var(--tk-dlite-semantic-color-action-primary);
      box-shadow: 0 0 0 1px var(--tk-dlite-semantic-color-action-primary);
    }
    select:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    select.has-error {
      border-color: var(--tk-dlite-semantic-color-feedback-danger);
    }
    .error-text {
      font-size: var(--tk-dlite-semantic-typography-size-200);
      color: var(--tk-dlite-semantic-color-feedback-danger);
      margin-top: var(--tk-dlite-semantic-spacing-100);
    }
  `;

  private _onChange(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('dl-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      ${this.label ? html`<label>${this.label}</label>` : nothing}
      <div class="select-wrapper">
        <select
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          class=${this.error ? 'has-error' : ''}
          @change=${this._onChange}
          part="select"
        >
          ${this.placeholder
            ? html`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>`
            : nothing}
          ${this.options.map(
            (opt) => html`
              <option value=${opt.value} ?disabled=${opt.disabled} ?selected=${opt.value === this.value}>
                ${opt.label}
              </option>
            `,
          )}
        </select>
      </div>
      ${this.error ? html`<div class="error-text">${this.error}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-select': DlSelect;
  }
}
