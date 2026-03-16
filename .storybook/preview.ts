import type { Preview } from '@storybook/web-components';

/* ------------------------------------------------------------------ */
/*  Auto-discover all token CSS via Vite glob imports                 */
/*  Adding a new brand/theme to the token package automatically       */
/*  populates the toolbar — no manual imports needed.                 */
/* ------------------------------------------------------------------ */
const cssModules = import.meta.glob<{ default: string }>(
  '@dlite-tokens/*/*/variables{,.dark}.css',
  { query: '?inline', eager: true },
);

// Parse glob results into TOKEN_MAP and toolbar items
const TOKEN_MAP: Record<string, Record<string, string>> = {};
const toolbarItems: { value: string; title: string }[] = [];

for (const [filePath, mod] of Object.entries(cssModules)) {
  // filePath example: /node_modules/style-dictionary-dlite-tokens/dist/web/puente/default/variables.css
  //               or: /node_modules/style-dictionary-dlite-tokens/dist/web/survivor/winter-holiday/variables.dark.css
  const match = filePath.match(/\/([^/]+)\/([^/]+)\/variables(\.dark)?\.css$/);
  if (!match) continue;

  const [, brand, theme, isDark] = match;
  const brandTheme = `${brand}/${theme}`;
  const mode = isDark ? 'dark' : 'light';

  if (!TOKEN_MAP[brandTheme]) TOKEN_MAP[brandTheme] = {};
  TOKEN_MAP[brandTheme][mode] = mod.default;
}

// Build sorted toolbar items with formatted labels
for (const brandTheme of Object.keys(TOKEN_MAP).sort()) {
  const [brand, theme] = brandTheme.split('/');
  const label = `${brand.charAt(0).toUpperCase() + brand.slice(1)}${
    theme === 'default'
      ? ''
      : ` ${theme.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`
  }`;
  toolbarItems.push({ value: brandTheme, title: label });
}

/* ------------------------------------------------------------------ */
/*  Inject the chosen token CSS into head                             */
/* ------------------------------------------------------------------ */
const STYLE_ID = 'dlite-token-style';
let currentKey = '';

function applyTokens(brandTheme: string, mode: string) {
  const key = `${brandTheme}::${mode}`;
  if (key === currentKey) return;
  currentKey = key;

  const entry = TOKEN_MAP[brandTheme] ?? TOKEN_MAP[Object.keys(TOKEN_MAP)[0]];
  const cssText = entry?.[mode] ?? entry?.light ?? '';

  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = cssText;
}

/* ------------------------------------------------------------------ */
/*  Preview config                                                    */
/* ------------------------------------------------------------------ */
const preview: Preview = {
  globalTypes: {
    brandTheme: {
      description: 'Dlite brand / theme',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: toolbarItems,
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Light / Dark mode',
      toolbar: {
        title: 'Mode',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark',  title: 'Dark',  icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    brandTheme: toolbarItems[0]?.value ?? 'puente/default',
    colorMode: 'light',
  },

  parameters: {
    controls: { expanded: true },
  },

  decorators: [
    (story, context) => {
      const brand = (context.globals.brandTheme as string) ?? toolbarItems[0]?.value ?? 'puente/default';
      const mode  = (context.globals.colorMode as string)  ?? 'light';
      applyTokens(brand, mode);
      return story();
    },
  ],
};

export default preview;
