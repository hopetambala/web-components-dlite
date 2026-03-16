import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A single tab panel. Must be used inside `<dl-tabs>`.
 *
 * @slot - Tab panel content (shown when active)
 */
@customElement('dl-tab')
export class DlTab extends LitElement {
  /** Label shown in the tab bar */
  @property() label = '';

  /** Value used to identify this tab. Defaults to label if omitted. */
  @property() value = '';

  /** Whether this tab is currently active (set by parent dl-tabs) */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Whether this tab is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css`
    :host {
      display: none;
    }
    :host([active]) {
      display: block;
    }
  `;

  /** Resolved value: explicit value or label fallback */
  get resolvedValue(): string {
    return this.value || this.label;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-tab': DlTab;
  }
}
