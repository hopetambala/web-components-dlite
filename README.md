# web-components-dlite

Lightweight, presentational web component library built with [Lit](https://lit.dev), styled entirely by [dlite design tokens](https://github.com/hopetambala/style-dictionary-dlite).

- **18 components** — layout, typography, form controls, feedback, overlays
- **Brand-agnostic** — swap `variables.css` to retheme everything
- **Dark mode** — toggle between `variables.css` and `variables.dark.css`
- **SSR-ready** — works with Lit's Declarative Shadow DOM for Next.js
- **~6 KB gzipped** (lit is a peer dependency)

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

There are two ways to use dlite web components in Next.js: **Client-Side Rendering (CSR)** or **Server-Side Rendering (SSR)**. Both require the same layout setup.

### Layout setup (required for both CSR and SSR)

```tsx
// app/layout.tsx
import { Plus_Jakarta_Sans, Source_Serif_4, Source_Code_Pro } from 'next/font/google';
import 'style-dictionary-dlite-tokens/web/puente/default/variables.css';

const heading = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading' });
const body = Source_Serif_4({ subsets: ['latin'], variable: '--font-body' });
const mono = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${heading.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

To switch brands or dark mode, swap the CSS import:

```tsx
// Survivor brand
import 'style-dictionary-dlite-tokens/web/survivor/default/variables.css';
// Dark mode
import 'style-dictionary-dlite-tokens/web/puente/default/variables.dark.css';
```

---

### Option A: Client-Side Rendering (CSR)

The simplest approach. Components render in the browser after JavaScript loads. The page may show unstyled content briefly (FOUC) before components hydrate.

**Step 1:** Create a provider that loads components client-side:

```tsx
// components/dlite-provider.tsx
'use client';

import { useEffect, useState } from 'react';

export function DliteProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import('web-components-dlite').then(() => setReady(true));
  }, []);

  return <div style={{ visibility: ready ? 'visible' : 'hidden' }}>{children}</div>;
}
```

**Step 2:** Wrap your app (or specific pages) with the provider:

```tsx
// app/layout.tsx
import { DliteProvider } from '@/components/dlite-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <DliteProvider>{children}</DliteProvider>
      </body>
    </html>
  );
}
```

**Step 3:** Use components in any page — no `'use client'` needed on the page itself:

```tsx
// app/page.tsx
export default function Home() {
  return (
    <dl-card elevation="low" padding="400">
      <dl-heading level={3}>Hello</dl-heading>
      <dl-text color="secondary">Styled by dlite tokens</dl-text>
      <dl-button variant="primary">Click me</dl-button>
    </dl-card>
  );
}
```

**When to use CSR:** Quick setup, prototyping, internal dashboards, or any app where a brief loading flash is acceptable.

---

### Option B: Server-Side Rendering (SSR)

Components render their full Shadow DOM in the server HTML using [Declarative Shadow DOM](https://developer.chrome.com/docs/css-ui/declarative-shadow-dom). No FOUC — content is visible immediately on first paint.

**Step 1:** Install the Lit SSR packages:

```bash
npm install @lit-labs/ssr @lit-labs/nextjs
```

**Step 2:** Configure `next.config.js`:

```js
// next.config.js
const withLitSSR = require('@lit-labs/nextjs')();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withLitSSR(nextConfig);
```

**Step 3:** Import components at the top of your layout:

```tsx
// app/layout.tsx
import 'web-components-dlite';
```

**Step 4:** Use components in any page — they work in both server and client components:

```tsx
// app/page.tsx (no 'use client' needed!)
export default function Home() {
  return (
    <dl-card elevation="low" padding="400">
      <dl-heading level={3}>Hello</dl-heading>
      <dl-text color="secondary">Styled by dlite tokens</dl-text>
      <dl-button variant="primary">Click me</dl-button>
    </dl-card>
  );
}
```

**When to use SSR:** Production apps where first-paint performance matters, SEO-sensitive pages, or when you want web components to behave like native server-rendered HTML.

---

### CSR vs SSR comparison

| | CSR (Option A) | SSR (Option B) |
|---|---|---|
| **Setup** | No extra packages | Requires `@lit-labs/ssr` + `@lit-labs/nextjs` |
| **First paint** | Brief flash while JS loads | Instant — HTML rendered on server |
| **SEO** | Content not in initial HTML | Full content in initial HTML |
| **Complexity** | Simple | Moderate |
| **`'use client'`** | Only on the provider | Not needed |

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

## Development

```bash
npm install
npm run storybook    # Preview components at localhost:6006
npm run build        # Build library to dist/
```

## How it works

All components use `var(--tk-dlite-semantic-*)` CSS custom properties in their Shadow DOM styles. No utility classes, no bundled CSS — consumers load the token variables at the document `:root` level, and Shadow DOM elements inherit them naturally.

This means:
- Components are **completely brand-agnostic** — they never reference specific colors
- Theming is done by swapping the `variables.css` file — zero component changes needed
- Dark mode is a CSS file swap, not a JavaScript toggle

## License

ISC
