import type { Metadata } from 'next'
import { BuildsBackLink } from '@/components/builds-back-link'
import { Footer } from '@/components/footer'
import { HowIBuiltThisSiteContent } from '@/components/how-i-built-this-site-content'
import { NavBar } from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'How I built this site',
  description:
    'The short version: a real design system as the foundation, AI tools doing the heavy lifting on execution, and a human reviewing and directing every step.',
}

export default function HowIBuiltThisSitePage() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/builds" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        {/* Figma article column ~808px; centered in the content grid */}
        <article className="mx-auto flex w-full max-w-[808px] flex-col gap-8">
          <BuildsBackLink />
          <HowIBuiltThisSiteContent />
        </article>
      </main>
      <Footer />
    </div>
  )
}
