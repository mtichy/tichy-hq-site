import * as React from 'react'
import { cn } from '@/lib/utils'

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          // layout + shape (16px padding, 5px radius per Figma)
          'inline-flex items-center rounded-[5px] px-4 py-4',
          // fill + type: lime accent bg, black bold Quicksand at regular scale
          'bg-accent text-accent-foreground font-sans font-bold text-regular leading-regular',
          // interaction: underline appears on hover/focus
          'no-underline underline-offset-4 decoration-2 decoration-accent-foreground',
          'transition-colors hover:underline focus-visible:underline',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'cursor-pointer',
          className,
        )}
        {...props}
      />
    )
  },
)
LinkButton.displayName = 'LinkButton'

export { LinkButton }
