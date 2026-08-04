import type { Metadata } from 'next'
import { BuildsBackLink } from '@/components/builds-back-link'
import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { ThankAThonContent } from '@/components/thank-a-thon-content'

export const metadata: Metadata = {
  title: 'Designing a McKinsey tradition',
  description:
    'How to keep spirits high? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe.',
}

export default function ThankAThonPage() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/builds" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        <article className="mx-auto flex w-full max-w-[808px] flex-col gap-8">
          {/* Media uses full 808px; title/body use max-w-[65ch] for reading measure */}
          <BuildsBackLink />
          <ThankAThonContent />
        </article>
      </main>
      <Footer />
    </div>
  )
}
