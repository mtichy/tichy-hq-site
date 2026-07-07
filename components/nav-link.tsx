'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  selected?: boolean
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, selected = false, ...props }, ref) => {
    return (
      <a
        ref={ref}
        aria-current={selected ? 'page' : undefined}
        className={cn(
          // bold Quicksand nav type in dark ink
          'font-sans font-bold text-regular text-foreground',
          // underline is drawn thick and offset for all active states
          'underline-offset-4 decoration-2 cursor-pointer transition-[filter]',
          // default state: soft blur, no underline
          'no-underline [filter:blur(1px)]',
          // hover state: crisp, brand-cyan underline
          'hover:[filter:none] hover:underline hover:decoration-[var(--color-brand-cyan)]',
          'focus-visible:[filter:none] focus-visible:underline focus-visible:decoration-[var(--color-brand-cyan)]',
          'focus-visible:outline-none',
          // selected state: crisp, brand-magenta underline (wins over default)
          selected &&
            '[filter:none] underline decoration-[var(--color-brand-magenta)] hover:decoration-[var(--color-brand-magenta)]',
          className,
        )}
        {...props}
      />
    )
  },
)
NavLink.displayName = 'NavLink'

export { NavLink }
