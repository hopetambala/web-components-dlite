import type { StorybookConfig } from '@storybook/web-components-vite';
import path from 'node:path';

const tokensWebDir = path.resolve(__dirname, '../node_modules/style-dictionary-dlite-tokens/dist/web');

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|js)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> ?? {}),
      '@dlite-tokens': tokensWebDir,
    };
    return config;
  },
};

export default config;
