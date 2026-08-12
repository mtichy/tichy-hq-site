'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { RoleToggle } from '@/components/fetch-demo/role-toggle'
import { NavLink } from '@/components/nav-link'
import { DEMO_BASE } from '@/lib/fetch-demo/data'
import { RoleProvider, useDemoRole } from '@/lib/fetch-demo/role-context'
import { cn } from '@/lib/utils'

const NAV = [
  { href: DEMO_BASE, label: 'Home', match: (p: string) => p === DEMO_BASE },
  {
    href: `${DEMO_BASE}/ask`,
    label: 'Ask Fetch',
    match: (p: string) => p.startsWith(`${DEMO_BASE}/ask`),
  },
] as const

/** AA-friendly nav chrome: strong bars (≥3:1) + visible focus ring. */
const demoNavClassName = cn(
  'text-small leading-small [filter:none]',
  'hover:border-[var(--color-brand-cyan-strong)]',
  'focus-visible:border-[var(--color-brand-cyan-strong)] focus-visible:outline-none',
  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
)

function DemoChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { role, setRole } = useDemoRole()

  return (
    <div className="flex min-h-[min(100vh,56rem)] w-full flex-col border border-border bg-background shadow-[var(--elevation-rest)] sm:rounded-md">
      <header className="px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-regular font-bold leading-regular text-foreground">
              Fetch
            </p>
            <span className="rounded-md bg-muted px-2 py-0.5 text-small leading-small text-muted-foreground">
              Synthetic data for illustrative purposes only
            </span>
          </div>
          <RoleToggle value={role} onChange={setRole} />
        </div>
        <nav className="mt-3 flex items-center gap-8" aria-label="Demo">
          {NAV.map((item) => {
            const selected = item.match(pathname)
            return (
              <NavLink
                key={item.href}
                href={item.href}
                selected={selected}
                className={cn(
                  demoNavClassName,
                  selected &&
                    'border-[var(--color-brand-magenta-strong)] hover:border-[var(--color-brand-magenta-strong)] focus-visible:border-[var(--color-brand-magenta-strong)]',
                )}
              >
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </header>
      <main id="fetch-demo-main" className="flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
      <footer className="border-t border-border px-4 py-3 sm:px-6">
        <p className="text-small leading-small text-muted-foreground">
          Fetch demo · User-centered editorial intelligence
        </p>
      </footer>
    </div>
  )
}

export function DemoShell({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <DemoChrome>{children}</DemoChrome>
    </RoleProvider>
  )
}
