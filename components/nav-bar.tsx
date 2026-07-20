import { NavLink } from '@/components/nav-link'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Résumé', href: '/resume' },
  { label: 'Builds', href: '/builds' },
] as const

type NavBarProps = {
  activePath: (typeof NAV_ITEMS)[number]['href']
}

export function NavBar({ activePath }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-t-2 border-t-[var(--color-brand-cyan)] bg-background">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-[var(--breakpoint-content)] items-center gap-8 px-6 py-3"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            href={item.href}
            selected={activePath === item.href}
          >
            {item.label}
          </NavLink>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}
