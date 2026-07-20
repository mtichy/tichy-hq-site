import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { BuildsContent } from '@/components/builds-content'
import { BuildsSidebar } from '@/components/builds-sidebar'

export const metadata = {
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
          <BuildsContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
