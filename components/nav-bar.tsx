import { NavLink } from '@/components/nav-link'

const NAV_ITEMS = [
  { label: 'Home', href: '#', selected: true },
  { label: 'Résumé', href: '#' },
  { label: 'Builds', href: '#' },
]

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-t-2 border-t-[var(--color-brand-cyan)] bg-background">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-content items-center gap-8 px-6 py-3"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.label} href={item.href} selected={item.selected}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
