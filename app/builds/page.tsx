import { BuildsGrid } from '@/components/builds-grid'
import { BuildsIntro } from '@/components/builds-intro'
import { BuildsSidebar } from '@/components/builds-sidebar'
import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Builds',
  description:
    'Product case studies and process write-ups — how each project was designed, built, and shipped through a Figma-to-code workflow.',
  path: '/builds',
})

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
