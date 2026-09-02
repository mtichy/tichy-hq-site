import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/nextjs-vite'
import { mergeConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  async viteFinal(config, { configType }) {
    // Vite can miss the root postcss.config.mjs; without it, Tailwind v4
    // @theme tokens never compile into utilities.
    return mergeConfig(config, {
      base: configType === 'PRODUCTION' ? '/storybook/' : '/',
      css: {
        postcss: path.resolve(dirname, '../postcss.config.mjs'),
      },
    })
  },
}

export default config
