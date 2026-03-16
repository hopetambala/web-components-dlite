import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Simple styled table wrapper.
 *
 * Injects a scoped light-DOM `<style>` to style nested table elements
 * (`<table>`, `<th>`, `<td>`) that `::slotted()` cannot reach.
 *
 * @slot - Table content (`<table>` with `<thead>`, `<tbody>`, etc.)
 *
 * ### Striped rows
 *
 * Set the `striped` attribute to enable alternating row backgrounds:
 *
 * ```html
 * <dl-table striped>
 *   <table>…</table>
 * </dl-table>
 * ```
 */
@customElement('dl-table')
export class DlTable extends LitElement {
  /** Enables striped row styling on even tbody rows */
  @property({ type: Boolean, reflect: true }) striped = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
      font-size: var(--tk-dlite-semantic-typography-size-300);
      color: var(--tk-dlite-semantic-color-text-primary);
      overflow-x: auto;
    }
  `;

  private _styleEl: HTMLStyleElement | null = null;

  private _injectStyles() {
    if (this._styleEl) return;
    this._styleEl = document.createElement('style');
    this._styleEl.textContent = `
      :host > table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
      }
      :host > table th,
      :host > table td {
        padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-300);
        text-align: left;
        border-bottom: 1px solid var(--tk-dlite-semantic-color-border);
      }
      :host > table th {
        font-weight: var(--tk-dlite-primitive-fontWeight-semibold);
        font-size: var(--tk-dlite-semantic-typography-size-200);
        color: var(--tk-dlite-semantic-color-text-secondary);
      }
      :host([striped]) > table tbody tr:nth-child(even) {
        background: var(--tk-dlite-semantic-color-surface-sunken);
      }
    `;
    this.prepend(this._styleEl);
  }

  connectedCallback() {
    super.connectedCallback();
    this._injectStyles();
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-table': DlTable;
  }
}
