import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Multi-line text area input.
 *
 * @fires dl-input - Fires on input with `detail.value`
 * @fires dl-change - Fires on change with `detail.value`
 * @fires input - Native-compatible input event with `detail.value` (works with React onInput)
 * @fires change - Native-compatible change event with `detail.value` (works with React onChange)
 */
@customElement('dl-textarea')
export class DlTextarea extends LitElement {
  @property() label = '';
  @property() placeholder = '';
  @property() value = '';
  @property({ type: Number }) rows = 4;
  @property() error = '';
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
    textarea {
      box-sizing: border-box;
      width: 100%;
      font-family: inherit;
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
      background: var(--tk-dlite-semantic-color-surface-base);
      border: 1px solid var(--tk-dlite-semantic-color-border);
      border-radius: var(--tk-dlite-semantic-border-radius-md);
      padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-300);
      resize: vertical;
      transition: border-color var(--tk-dlite-semantic-duration-fast) ease;
    }
    textarea::placeholder {
      color: var(--tk-dlite-semantic-color-text-tertiary);
    }
    textarea:focus {
      outline: none;
      border-color: var(--tk-dlite-semantic-color-action-primary);
      box-shadow: 0 0 0 1px var(--tk-dlite-semantic-color-action-primary);
    }
    textarea:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    textarea.has-error {
      border-color: var(--tk-dlite-semantic-color-feedback-danger);
    }
    textarea.has-error:focus {
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
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('dl-input', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('dl-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      ${this.label ? html`<label>${this.label}</label>` : nothing}
      <textarea
        .value=${this.value}
        placeholder=${this.placeholder}
        rows=${this.rows}
        ?disabled=${this.disabled}
        ?required=${this.required}
        class=${this.error ? 'has-error' : ''}
        @input=${this._onInput}
        @change=${this._onChange}
        part="textarea"
      ></textarea>
      ${this.error ? html`<div class="error-text">${this.error}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-textarea': DlTextarea;
  }
}
