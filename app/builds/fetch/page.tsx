import { BuildsBackLink } from '@/components/builds-back-link'
import { FetchContent } from '@/components/fetch-content'
import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { socialImageFromBuild } from '@/lib/builds'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Fetch: people-first editorial intelligence',
  description:
    'A sanitized rebuild of an editorial analytics product: people and stories as the way in, plain-language answers, and a single route that defaults differently for authors and editors.',
  path: '/builds/fetch',
  image: socialImageFromBuild('fetch'),
})

export default function FetchPage() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/builds" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        <article className="mx-auto flex w-full max-w-[808px] flex-col gap-8">
          <BuildsBackLink />
          <FetchContent />
        </article>
      </main>
      <Footer />
    </div>
  )
}
