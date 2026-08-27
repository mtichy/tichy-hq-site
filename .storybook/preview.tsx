import { ThemeProvider } from '@/components/theme-provider'
import type { Preview } from '@storybook/nextjs-vite'
import { create } from 'storybook/theming'

import './preview.css'

/**
 * Storybook 10's `themes.normal` follows the OS color scheme — it is not
 * "the light theme". Spreading it into `darkMode.light` copies dark-mode
 * text/icon colors onto light backgrounds. Always pin `base` explicitly.
 */
const lightTheme = create({
  base: 'light',
  appBg: '#f1f7ee',
  appContentBg: '#ffffff',
  appPreviewBg: '#f1f7ee',
  appHoverBg: '#e7eee4',
  appBorderColor: '#dbe2d8',
  barBg: '#ffffff',
  barTextColor: '#5c6666',
  textColor: '#333333',
  textMutedColor: '#5c6666',
  inputBg: '#ffffff',
  inputTextColor: '#333333',
  inputBorder: '#dbe2d8',
  buttonBg: '#f1f7ee',
  booleanBg: '#e7eee4',
  booleanSelectedBg: '#ffffff',
})

const darkTheme = create({
  base: 'dark',
  appBg: '#14191a',
  appContentBg: '#1f2729',
  appPreviewBg: '#14191a',
  appHoverBg: '#232b2d',
  appBorderColor: '#313b3b',
  barBg: '#1f2729',
  barTextColor: '#949e9e',
  textColor: '#ecf1ea',
  textMutedColor: '#949e9e',
  inputBg: '#14191a',
  inputTextColor: '#ecf1ea',
  inputBorder: '#313b3b',
  buttonBg: '#14191a',
  booleanBg: '#14191a',
  booleanSelectedBg: '#232b2d',
})

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
      dark: darkTheme,
      light: lightTheme,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview
