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
          // underline only on hover/focus, drawn in the same dark ink
          'no-underline underline-offset-2 decoration-4 decoration-accent-foreground',
          'hover:underline focus-visible:underline',
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
