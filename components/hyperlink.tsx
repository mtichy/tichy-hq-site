import * as React from 'react'
import { cn } from '@/lib/utils'

type HyperlinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          // inline text link: lime highlight sits behind the text only
          'inline bg-accent text-accent-foreground [box-decoration-break:clone]',
          // bold Quicksand type, inherits surrounding font size
          'font-sans font-bold',
          // magenta bar flush to the bottom of the lime frame, only on hover/focus
          'border-b-4 border-transparent no-underline',
          'hover:border-[var(--color-brand-magenta)] focus-visible:border-[var(--color-brand-magenta)]',
          'rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
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
