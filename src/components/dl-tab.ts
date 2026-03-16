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

  private static _nextId = 0;
  private _uid = ++DlTab._nextId;

  /** Resolved value: explicit value or label fallback */
  get resolvedValue(): string {
    return this.value || this.label;
  }

  private get _slug(): string {
    return this.resolvedValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || String(this._uid);
  }

  /** Stable ID suffix derived from the resolved value */
  get panelId(): string {
    return `dl-tabpanel-${this._slug}-${this._uid}`;
  }

  /** Matching tab button ID */
  get tabId(): string {
    return `dl-tab-${this._slug}-${this._uid}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
  }

  updated() {
    this.id = this.panelId;
    this.setAttribute('aria-label', this.label);
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
