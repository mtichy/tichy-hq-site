import { BuildsBackLink } from '@/components/builds-back-link'
import { Footer } from '@/components/footer'
import { HowIBuiltThisSiteContent } from '@/components/how-i-built-this-site-content'
import { NavBar } from '@/components/nav-bar'
import { socialImageFromBuild } from '@/lib/builds'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'How I built this site',
  description:
    'The short version: a real design system as the foundation, AI tools doing the heavy lifting on execution, and a human reviewing and directing every step.',
  path: '/builds/how-i-built-this-site',
  image: socialImageFromBuild('how-i-built-this-site'),
})

export default function HowIBuiltThisSitePage() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/builds" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        {/* Article shell ~808px for media; prose constrained to ~65ch inside */}
        <article className="mx-auto flex w-full max-w-[808px] flex-col gap-8">
          <BuildsBackLink />
          <HowIBuiltThisSiteContent />
        </article>
      </main>
      <Footer />
    </div>
  )
}
