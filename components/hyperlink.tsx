import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Flat 4px magenta bar — square ends, no layout shift, not a card shadow.
 * Class strings must stay complete/static for Tailwind detection.
 */
export const hyperlinkUnderlineClassName = cn(
  'hover:[background-image:linear-gradient(to_top,var(--color-brand-magenta)_4px,transparent_4px)]',
  'focus-visible:[background-image:linear-gradient(to_top,var(--color-brand-magenta)_4px,transparent_4px)]',
)

/** Group-hover underline when the interactive target is a parent (e.g. Card). */
export const hyperlinkUnderlineGroupClassName = cn(
  'group-hover:[background-image:linear-gradient(to_top,var(--color-brand-magenta)_4px,transparent_4px)]',
  'group-focus-within:[background-image:linear-gradient(to_top,var(--color-brand-magenta)_4px,transparent_4px)]',
)

/** Shared lime chrome (real links and decorative CTAs). Font size inherits. */
export const hyperlinkChromeClassName = cn(
  'inline bg-accent px-1.5 text-accent-foreground [box-decoration-break:clone]',
  'font-sans font-bold',
  'no-underline rounded-none',
)

/**
 * Standalone control buttons (Back links, lab toggles, card CTAs, actions).
 * Always 700 / small — do not use on inline hyperlinked prose, which should
 * inherit the surrounding text size.
 */
export const controlButtonClassName = cn(
  hyperlinkChromeClassName,
  hyperlinkUnderlineClassName,
  'inline-flex items-center px-2.5 py-1',
  'text-small font-bold leading-small',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  'cursor-pointer',
)

type HyperlinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          hyperlinkChromeClassName,
          hyperlinkUnderlineClassName,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'cursor-pointer',
          className,
        )}
        {...props}
      />
    )
  },
)
Hyperlink.displayName = 'Hyperlink'

export { Hyperlink }
