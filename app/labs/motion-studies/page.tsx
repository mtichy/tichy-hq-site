import { BuildsBackLink } from '@/components/builds-back-link'
import { Footer } from '@/components/footer'
import { MotionStudiesContent } from '@/components/labs/motion-studies-content'
import { NavBar } from '@/components/nav-bar'
import { socialImageFromBuild } from '@/lib/builds'
import { MOTION_STUDIES_HREF } from '@/lib/labs/motion-studies'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Motion studies: how little is enough?',
  description:
    'How little is enough? Studies in motion from After Effects, P5.js, and Procreate.',
  path: MOTION_STUDIES_HREF,
  image: socialImageFromBuild('motion-studies'),
})

export default function MotionStudiesPage() {
  return (
    <div className="min-h-screen">
      <a
        href="#motion-studies-article"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-small focus:font-bold focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to article
      </a>
      <NavBar activePath="/builds" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        <article
          id="motion-studies-article"
          className="mx-auto flex w-full max-w-[808px] flex-col gap-8"
        >
          <BuildsBackLink />
          <MotionStudiesContent />
        </article>
      </main>
      <Footer />
    </div>
  )
}
