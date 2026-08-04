import type { Metadata } from 'next'
import { BuildsGrid } from '@/components/builds-grid'
import { BuildsIntro } from '@/components/builds-intro'
import { BuildsSidebar } from '@/components/builds-sidebar'
import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Builds',
  description:
    'A selection of projects, experiments, and things built by Mark Tichý.',
}

export default function BuildsPage() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/builds" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <BuildsSidebar />
          <BuildsIntro />
        </div>

        <div className="mt-16">
          <BuildsGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
