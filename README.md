# web-components-dlite

Lightweight, web component library built with [Lit](https://lit.dev), styled entirely by [dlite design tokens](https://github.com/hopetambala/style-dictionary-dlite).

- **20 components** — layout, typography, form controls, feedback, navigation, overlays
- **Brand-agnostic** — swap `variables.css` to retheme everything
- **Dark mode** — toggle between `variables.css` and `variables.dark.css`
- **SSR-compatible** — works in Next.js App Router with `"use client"` boundary
- **TypeScript-first** — ships React JSX type declarations for all 20 components
- **~8 KB gzipped** (lit is a peer dependency)

> **📖 [Engineering Docs](docs/engineering.md)** — event strategy, shadow DOM details, architecture decisions

## Quick start

```bash
npm install web-components-dlite lit style-dictionary-dlite-tokens
```

### 1. Load fonts

The design system requires three Google Fonts. Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

Or with Next.js (`next/font/google`):

```tsx
import { Plus_Jakarta_Sans, Source_Serif_4, Source_Code_Pro } from 'next/font/google';

const heading = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading' });
const body = Source_Serif_4({ subsets: ['latin'], variable: '--font-body' });
const mono = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });
```

### 2. Load tokens at document level

```html
<!-- In your HTML head or global layout -->
<link rel="stylesheet" href="node_modules/style-dictionary-dlite-tokens/dist/web/puente/default/variables.css" />
```

Or in a framework like Next.js:

```tsx
// app/layout.tsx
import 'style-dictionary-dlite-tokens/dist/web/puente/default/variables.css';
```

### 3. Import and use components

```tsx
import 'web-components-dlite';

// Use in your templates
<dl-button variant="primary" size="md">Click me</dl-button>
<dl-card elevation="low" padding="400">
  <dl-heading level="3">Hello</dl-heading>
  <dl-text color="secondary">Styled by dlite tokens</dl-text>
</dl-card>
```

### Dark mode

Swap the CSS file to switch themes:

```tsx
// Toggle between light and dark
import 'style-dictionary-dlite-tokens/dist/web/puente/default/variables.css';
// or
import 'style-dictionary-dlite-tokens/dist/web/puente/default/variables.dark.css';
```

### Switch brands

Load a different brand's tokens — components automatically adapt:

```tsx
import 'style-dictionary-dlite-tokens/dist/web/survivor/default/variables.css';
```

## Usage with Next.js (App Router)

Lit web components depend on browser APIs (`customElements`, `HTMLElement`, `ShadowRoot`) that don't exist in Node.js. This means they must be registered client-side. Next.js App Router makes this straightforward with a `"use client"` boundary.

### TypeScript setup

This package ships auto-generated React JSX type declarations. Add a single reference to get full IntrinsicElements typing for all `<dl-*>` tags:

```ts
// src/dlite.d.ts  (or any .d.ts in your project)
/// <reference types="web-components-dlite/react" />
```

That's it — no manual `IntrinsicElements` declarations needed. All component props, including union types like `variant`, `size`, and `color`, are fully typed.

### Token CSS setup

Import the token CSS files in your global stylesheet. Use the [exports map](https://github.com/hopetambala/style-dictionary-dlite) — no `dist/` in the path:

```css
/* app/globals.css */
@import "style-dictionary-dlite-tokens/web/puente/default/reset.css";
@import "style-dictionary-dlite-tokens/web/puente/default/variables.css";
@import "style-dictionary-dlite-tokens/web/puente/default/utilities.css";
@import "style-dictionary-dlite-tokens/web/puente/default/components.css";
@import "style-dictionary-dlite-tokens/web/puente/default/semantics.css";
```

To switch brands or themes, swap the path segment:

```css
/* Survivor brand */
@import "style-dictionary-dlite-tokens/web/survivor/default/variables.css";
/* Dark mode */
@import "style-dictionary-dlite-tokens/web/puente/default/variables.dark.css";
```

---

### Option A: Client-Side Rendering (recommended)

The standard approach for Lit + Next.js. Components register in the browser and render inside their Shadow DOM after JavaScript loads. React 19 has [native custom element support](https://react.dev/blog/2024/04/25/react-19#support-for-custom-elements), so `<dl-button>` works as a first-class JSX element.

**Step 1:** Create a registration file and a client provider:

```ts
// src/dlite-design-system/register.ts
"use client";
import "web-components-dlite"; // side-effect: registers all <dl-*> custom elements
```

```tsx
// src/dlite-design-system/DliteProvider.tsx
"use client";
import "./register";

export default function DliteProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

**Step 2:** Wrap your root layout:

```tsx
// app/layout.tsx
import DliteProvider from "@/dlite-design-system/DliteProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DliteProvider>{children}</DliteProvider>
      </body>
    </html>
  );
}
```

**Step 3:** Use components in any `"use client"` page:

```tsx
// app/page.tsx
"use client";

export default function Home() {
  return (
    <dl-card elevation="low" padding="400">
      <dl-heading level={3}>Hello</dl-heading>
      <dl-text color="secondary">Styled by dlite tokens</dl-text>
      <dl-button variant="primary" onClick={() => alert("clicked!")}>
        Click me
      </dl-button>
    </dl-card>
  );
}
```

**Handling events:** Every event-emitting component dispatches both a `dl-*` semantic event and a native-compatible event (`change`, `input`, `close`). In React 19, use the standard `onChange` / `onInput` props:

```tsx
<dl-input
  placeholder="Email"
  value={email}
  onInput={(e: CustomEvent) => setEmail(e.detail.value)}
/>

<dl-select
  options={options}
  onChange={(e: CustomEvent) => setChoice(e.detail.value)}
/>

<dl-toggle
  checked={enabled}
  onChange={(e: CustomEvent) => setEnabled(e.detail.checked)}
/>
```

See [docs/engineering.md](docs/engineering.md) for the full event contract table and framework usage guide.

**When to use CSR:** This is the recommended approach for most apps. It's simple, reliable, and leverages the `"use client"` boundary that Next.js provides natively. Since web components render in their Shadow DOM, there's no layout shift — the token CSS custom properties are already loaded globally, and Shadow DOM elements inherit them before they render.

---

### Option B: Full Server-Side Rendering (SSR)

> **⚠️ Experimental / advanced** — Lit SSR is possible but has significant caveats with Next.js App Router.

For true SSR, Lit components render their Shadow DOM on the server as [Declarative Shadow DOM](https://developer.chrome.com/docs/css-ui/declarative-shadow-dom) (`<template shadowrootmode="open">`). This means the styled HTML is in the initial response — no JavaScript needed for first paint.

**Why this is hard with Next.js App Router:**

1. **No official App Router integration.** The `@lit-labs/nextjs` package was built for Pages Router and uses Webpack plugins that don't work with App Router's React Server Components architecture.

2. **RSC rendering pipeline isn't pluggable.** Server Components return an RSC wire format, not raw HTML. You can't call Lit's `render()` and splice the HTML into Next.js's streaming pipeline without `dangerouslySetInnerHTML`, which breaks React hydration.

3. **Hydration mismatches.** If the server emits `<template shadowrootmode>` and the browser expands it into a shadow root, React's hydration won't know about it — leading to mismatches or double-rendering.

**If you still want SSR**, the options are:

- **Use a non-React meta-framework** like [Astro](https://astro.build) or [Enhance](https://enhance.dev) that has native SSR support for web components
- **Use `@lit-labs/ssr`** directly in a custom Node.js server outside of Next.js routing
- **Wait for framework-level support** as the [Web Components Community Group SSR protocol](https://github.com/webcomponents-cg/community-protocols/issues/7) matures

**Recommendation:** For Next.js apps, use **Option A (CSR)**. The `"use client"` pattern is what the Lit team officially recommends for React frameworks. If your app has dynamic data (auth, APIs), your pages are already client-rendered anyway — SSR of the component markup provides no meaningful benefit.

---

### CSR vs SSR comparison

| | CSR (Option A) | SSR (Option B) |
|---|---|---|
| **Setup** | 3 files, no extra packages | Requires custom server or Astro |
| **Next.js App Router** | ✅ Fully supported | ❌ No official integration |
| **First paint** | Tokens load instantly, WC render after JS | Full Shadow DOM in initial HTML |
| **TypeScript** | ✅ `web-components-dlite/react` types | Same |
| **React 19 events** | ✅ Native custom element support | Same |
| **Complexity** | Simple | High |
| **Recommendation** | **Use this** | Only for non-React SSR frameworks |

## Components

| Component         | Element            | Description                         |
|-------------------|--------------------|-------------------------------------|
| `DlStack`         | `<dl-stack>`       | Vertical/horizontal flex layout     |
| `DlCluster`       | `<dl-cluster>`     | Inline wrapping cluster layout      |
| `DlCard`          | `<dl-card>`        | Container with padding & elevation  |
| `DlDivider`       | `<dl-divider>`     | Horizontal/vertical separator       |
| `DlHeading`       | `<dl-heading>`     | Semantic heading (h1–h6)            |
| `DlText`          | `<dl-text>`        | Body text with size/color/weight    |
| `DlBadge`         | `<dl-badge>`       | Inline status badge                 |
| `DlButton`        | `<dl-button>`      | Button with variant/size            |
| `DlIconButton`    | `<dl-icon-button>` | Icon-only button                    |
| `DlInput`         | `<dl-input>`       | Text input with label/error         |
| `DlTextarea`      | `<dl-textarea>`    | Multi-line text input               |
| `DlSelect`        | `<dl-select>`      | Native select dropdown              |
| `DlCheckbox`      | `<dl-checkbox>`    | Checkbox with label                 |
| `DlToggle`        | `<dl-toggle>`      | Toggle switch                       |
| `DlAlert`         | `<dl-alert>`       | Alert banner (info/success/warning/danger) |
| `DlSpinner`       | `<dl-spinner>`     | Loading spinner                     |
| `DlTable`         | `<dl-table>`       | Styled table wrapper                |
| `DlDialog`        | `<dl-dialog>`      | Modal dialog with backdrop          |
| `DlTabs`          | `<dl-tabs>`        | Tab bar with tab panels             |
| `DlTab`           | `<dl-tab>`         | Individual tab panel (child of dl-tabs) |

## Development

```bash
npm install
npm run storybook    # Preview components at localhost:6006
npm run build        # Build library to dist/ (includes auto-generated react.d.ts)
```

The build pipeline runs three steps:

1. **Vite** bundles `src/` → `dist/index.js`
2. **tsc** emits declaration files → `dist/**/*.d.ts`
3. **generate-react-types** parses all `@customElement` / `@property` decorators and generates `dist/react.d.ts` with React JSX `IntrinsicElements` types

When you add a new component or change props, the types update automatically on next build.

## How it works

All components use `var(--tk-dlite-semantic-*)` CSS custom properties in their Shadow DOM styles. No utility classes, no bundled CSS — consumers load the token variables at the document `:root` level, and Shadow DOM elements inherit them naturally.

This means:
- Components are **completely brand-agnostic** — they never reference specific colors
- Theming is done by swapping the `variables.css` file — zero component changes needed
- Dark mode is a CSS file swap, not a JavaScript toggle

## License

ISC
