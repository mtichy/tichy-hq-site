import type { Preview } from '@storybook/nextjs-vite'
import { themes } from 'storybook/theming'

import './preview.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    a11y: {
      test: 'todo',
    },
    darkMode: {
      current: 'light',
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
      dark: { ...themes.dark, appBg: '#14191a', appContentBg: '#14191a' },
      light: { ...themes.normal, appBg: '#f1f7ee', appContentBg: '#f1f7ee' },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8 font-sans text-foreground antialiased">
        <Story />
      </div>
    ),
  ],
}

export default preview
