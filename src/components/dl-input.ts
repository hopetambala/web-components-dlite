import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Text input with label and optional error message.
 *
 * @fires dl-input - Fires on input with `detail.value`
 * @fires dl-change - Fires on change with `detail.value`
 * @fires input - Native-compatible input event with `detail.value` (works with React onInput)
 * @fires change - Native-compatible change event with `detail.value` (works with React onChange)
 */
@customElement('dl-input')
export class DlInput extends LitElement {
  @property() label = '';
  @property() placeholder = '';
  @property() value = '';
  @property() type: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' = 'text';
  @property() error = '';
  @property() min = '';
  @property() max = '';
  @property() step = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

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
    input {
      box-sizing: border-box;
      width: 100%;
      font-family: inherit;
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
      background: var(--tk-dlite-semantic-color-surface-base);
      border: 1px solid var(--tk-dlite-semantic-color-border);
      border-radius: var(--tk-dlite-semantic-border-radius-md);
      padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-300);
      transition: border-color var(--tk-dlite-semantic-duration-fast) ease;
    }
    input::placeholder {
      color: var(--tk-dlite-semantic-color-text-tertiary);
    }
    input:focus {
      outline: none;
      border-color: var(--tk-dlite-semantic-color-action-primary);
      box-shadow: 0 0 0 1px var(--tk-dlite-semantic-color-action-primary);
    }
    input:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    :host([error]) input,
    input.has-error {
      border-color: var(--tk-dlite-semantic-color-feedback-danger);
    }
    :host([error]) input:focus,
    input.has-error:focus {
      box-shadow: 0 0 0 1px var(--tk-dlite-semantic-color-feedback-danger);
    }
    .error-text {
      font-size: var(--tk-dlite-semantic-typography-size-200);
      color: var(--tk-dlite-semantic-color-feedback-danger);
      margin-top: var(--tk-dlite-semantic-spacing-100);
    }
  `;

  private _onInput(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('dl-input', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('dl-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      ${this.label ? html`<label>${this.label}</label>` : nothing}
      <input
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder}
        min=${this.min || nothing}
        max=${this.max || nothing}
        step=${this.step || nothing}
        ?disabled=${this.disabled}
        ?required=${this.required}
        class=${this.error ? 'has-error' : ''}
        @input=${this._onInput}
        @change=${this._onChange}
        part="input"
      />
      ${this.error ? html`<div class="error-text">${this.error}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-input': DlInput;
  }
}
