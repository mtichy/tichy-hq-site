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
          'inline-block pb-1 font-sans font-bold text-regular text-foreground no-underline',
          // reserve the 6px bar so state changes never shift layout
          'border-b-[6px] border-transparent transition-[filter,border-color] duration-150',
          // default state: soft blur, no underline bar
          '[filter:blur(1px)]',
          // hover state: crisp, brand-cyan underline bar
          'hover:[filter:none] hover:border-[var(--color-brand-cyan)]',
          'focus-visible:[filter:none] focus-visible:border-[var(--color-brand-cyan)] focus-visible:outline-none',
          // selected state: crisp, brand-magenta bar (wins over hover/default)
          selected &&
            '[filter:none] border-[var(--color-brand-magenta)] hover:border-[var(--color-brand-magenta)]',
          'cursor-pointer',
          className,
        )}
        {...props}
      />
    )
  },
)
NavLink.displayName = 'NavLink'

export { NavLink }
