import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { DlTab } from './dl-tab.js';

/**
 * Tab bar with tab panels. Wrap `<dl-tab>` children to create a tabbed interface.
 *
 * @fires dl-change - Fires when the active tab changes with `detail.value`
 * @fires change - Native-compatible change event with `detail.value` (works with React onChange)
 *
 * ### Framework usage
 *
 * **React** — use `onChange` for the native-compatible event:
 * ```tsx
 * <dl-tabs value={activeTab} onChange={(e) => setActiveTab(e.detail.value)}>
 * ```
 *
 * **Vanilla / Astro / Enhance** — use either event name:
 * ```js
 * el.addEventListener('change', (e) => console.log(e.detail.value));
 * el.addEventListener('dl-change', (e) => console.log(e.detail.value));
 * ```
 *
 * @example
 * ```html
 * <dl-tabs value="leaderboard">
 *   <dl-tab label="Leaderboard" value="leaderboard">…</dl-tab>
 *   <dl-tab label="Rosters" value="rosters">…</dl-tab>
 * </dl-tabs>
 * ```
 */
@customElement('dl-tabs')
export class DlTabs extends LitElement {
  /** The value of the currently active tab */
  @property() value = '';

  @state() private _tabs: DlTab[] = [];

  static styles = css`
    :host {
      display: block;
      font-family: var(--tk-dlite-semantic-typography-font-body);
    }
    .tab-bar {
      display: flex;
      gap: var(--tk-dlite-semantic-spacing-100);
      overflow-x: auto;
      margin-bottom: var(--tk-dlite-semantic-spacing-400);
    }
    .tab-button {
      padding: var(--tk-dlite-semantic-spacing-200) var(--tk-dlite-semantic-spacing-400);
      border-radius: var(--tk-dlite-semantic-border-radius-md);
      font-family: var(--tk-dlite-semantic-typography-font-heading);
      font-size: var(--tk-dlite-semantic-typography-size-300);
      font-weight: var(--tk-dlite-primitive-fontWeight-medium);
      white-space: nowrap;
      cursor: pointer;
      border: none;
      transition: background-color var(--tk-dlite-semantic-duration-fast) ease;
    }
    .tab-button[aria-selected='true'] {
      background-color: var(--tk-dlite-semantic-color-action-primary);
      color: var(--tk-dlite-semantic-color-text-on-brand);
    }
    .tab-button[aria-selected='false'] {
      background-color: var(--tk-dlite-semantic-color-surface-raised);
      color: var(--tk-dlite-semantic-color-text-secondary);
    }
    .tab-button[aria-selected='false']:hover {
      background-color: var(--tk-dlite-semantic-color-muted);
    }
    .tab-button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .panels {
      display: block;
    }
  `;

  private _syncTabs() {
    const tabs = [...this.querySelectorAll<DlTab>(':scope > dl-tab')];
    this._tabs = tabs;

    // If no value set yet, pick the first tab
    if (!this.value && tabs.length > 0) {
      this.value = tabs[0].resolvedValue;
    }

    // Set active state on children
    for (const tab of tabs) {
      tab.active = tab.resolvedValue === this.value;
    }
  }

  private _onSlotChange() {
    this._syncTabs();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this._syncTabs();
    }
  }

  firstUpdated() {
    this._syncTabs();
  }

  private _selectTab(tab: DlTab) {
    if (tab.disabled) return;
    const val = tab.resolvedValue;
    if (val === this.value) return;
    this.value = val;
    this._syncTabs();
    this.dispatchEvent(new CustomEvent('dl-change', { detail: { value: val }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: { value: val }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="tab-bar" role="tablist">
        ${this._tabs.map(
          (tab) => html`
            <button
              class="tab-button"
              role="tab"
              id=${tab.tabId}
              aria-selected=${tab.resolvedValue === this.value ? 'true' : 'false'}
              aria-controls=${tab.panelId}
              ?disabled=${tab.disabled}
              @click=${() => this._selectTab(tab)}
              part="tab"
            >
              ${tab.label}
            </button>
          `,
        )}
      </div>
      <div class="panels">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dl-tabs': DlTabs;
  }
}
