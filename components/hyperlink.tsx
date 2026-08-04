import * as React from 'react'
import { cn } from '@/lib/utils'

/** Shared lime + magenta-underline chrome (real links and decorative CTAs). */
export const hyperlinkChromeClassName = cn(
  'inline bg-accent px-1.5 text-accent-foreground [box-decoration-break:clone]',
  'font-sans font-bold',
  'border-b-4 border-transparent no-underline',
  'rounded-[2px]',
)

type HyperlinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          hyperlinkChromeClassName,
          'hover:border-[var(--color-brand-magenta)] focus-visible:border-[var(--color-brand-magenta)]',
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
