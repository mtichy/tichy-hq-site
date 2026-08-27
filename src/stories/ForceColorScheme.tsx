import type { ReactNode } from 'react'

/**
 * Isolate a story from the Storybook toolbar / html.light|dark class.
 * Uses data-color-scheme so it does not collide with storybook-dark-mode's
 * lightClass/darkClass on the document element.
 */
export function ForceColorScheme({
  scheme,
  children,
}: {
  scheme: 'light' | 'dark'
  children: ReactNode
}) {
  return (
    <div
      data-color-scheme={scheme}
      className="min-h-screen bg-background p-8 font-sans text-foreground antialiased"
    >
      {children}
    </div>
  )
}
