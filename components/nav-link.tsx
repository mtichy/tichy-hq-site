import * as React from 'react'
import { cn } from '@/lib/utils'

export type NavLinkVariant = 'global' | 'filter'

export function navLinkClassName({
  selected = false,
  variant = 'global',
  className,
}: {
  selected?: boolean
  variant?: NavLinkVariant
  className?: string
}) {
  const isFilter = variant === 'filter'
  return cn(
    'inline-block pb-1 font-sans font-bold text-foreground no-underline',
    isFilter ? 'text-regular leading-regular' : 'text-small',
    // reserve the 6px bar so state changes never shift layout
    'border-b-[6px] border-transparent',
    isFilter
      ? 'transition-[border-color] duration-150'
      : 'transition-[filter,border-color] duration-150 [filter:blur(1px)]',
    'hover:[filter:none] hover:border-[var(--color-brand-cyan)]',
    'focus-visible:[filter:none] focus-visible:border-[var(--color-brand-cyan)] focus-visible:outline-none',
    selected &&
      '[filter:none] border-[var(--color-brand-magenta)] hover:border-[var(--color-brand-magenta)]',
    'cursor-pointer',
    className,
  )
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  selected?: boolean
  /** `filter` is regular size with no default blur — mosaic chips, not global nav. */
  variant?: NavLinkVariant
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, selected = false, variant = 'global', ...props }, ref) => {
    return (
      <a
        ref={ref}
        aria-current={selected && variant === 'global' ? 'page' : undefined}
        className={navLinkClassName({ selected, variant, className })}
        {...props}
      />
    )
  },
)
NavLink.displayName = 'NavLink'

export { NavLink }
