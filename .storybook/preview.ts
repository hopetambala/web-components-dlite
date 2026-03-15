import type { Preview } from '@storybook/web-components';

/* ------------------------------------------------------------------ */
/*  Eagerly import all token CSS as raw strings via Vite ?inline      */
/* ------------------------------------------------------------------ */
// @ts-expect-error Vite ?inline CSS import
import puenteDefaultLight     from 'style-dictionary-dlite-tokens/web/puente/default/variables.css?inline';
// @ts-expect-error Vite ?inline CSS import
import puenteDefaultDark      from 'style-dictionary-dlite-tokens/web/puente/default/variables.dark.css?inline';
// @ts-expect-error Vite ?inline CSS import
import survivorDefaultLight   from 'style-dictionary-dlite-tokens/web/survivor/default/variables.css?inline';
// @ts-expect-error Vite ?inline CSS import
import survivorDefaultDark    from 'style-dictionary-dlite-tokens/web/survivor/default/variables.dark.css?inline';
// @ts-expect-error Vite ?inline CSS import
import survivorWinterLight    from 'style-dictionary-dlite-tokens/web/survivor/winter-holiday/variables.css?inline';
// @ts-expect-error Vite ?inline CSS import
import survivorWinterDark     from 'style-dictionary-dlite-tokens/web/survivor/winter-holiday/variables.dark.css?inline';

const TOKEN_MAP: Record<string, Record<string, string>> = {
  'puente/default':           { light: puenteDefaultLight,   dark: puenteDefaultDark },
  'survivor/default':         { light: survivorDefaultLight, dark: survivorDefaultDark },
  'survivor/winter-holiday':  { light: survivorWinterLight,  dark: survivorWinterDark },
};

/* ------------------------------------------------------------------ */
/*  Inject the chosen token CSS into head                             */
/* ------------------------------------------------------------------ */
const STYLE_ID = 'dlite-token-style';
let currentKey = '';

function applyTokens(brandTheme: string, mode: string) {
  const key = `${brandTheme}::${mode}`;
  if (key === currentKey) return;
  currentKey = key;

  const entry = TOKEN_MAP[brandTheme] ?? TOKEN_MAP['puente/default'];
  const cssText = entry[mode] ?? entry.light;

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
        items: [
          { value: 'puente/default',           title: 'Puente' },
          { value: 'survivor/default',         title: 'Survivor' },
          { value: 'survivor/winter-holiday',  title: 'Survivor Winter Holiday' },
        ],
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
    brandTheme: 'puente/default',
    colorMode: 'light',
  },

  parameters: {
    controls: { expanded: true },
  },

  decorators: [
    (story, context) => {
      const brand = (context.globals.brandTheme as string) ?? 'puente/default';
      const mode  = (context.globals.colorMode as string)  ?? 'light';
      applyTokens(brand, mode);
      return story();
    },
  ],
};

export default preview;
