import { Card } from '@/components/card'
import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Card demo',
  description: 'Local lab page for the Card component.',
  path: '/test/card',
  noIndex: true,
})

/** Dev-only Card mosaic lab — gated by `app/test/layout.tsx`. */
export default function CardDemoPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        <h1 className="text-xlarge font-bold leading-xlarge text-balance text-foreground">
          Card component lab
        </h1>
        <p className="mt-4 max-w-[600px] text-regular leading-regular text-pretty text-muted-foreground">
          Dev-only mosaic preview — card height follows content. Toggle theme to
          check light and dark. This route 404s in production.
        </p>

        <h2 className="mt-12 text-large font-bold leading-large text-foreground">
          Mosaic examples
        </h2>

        <div className="mt-8 columns-1 gap-8 sm:columns-2 xl:columns-3">
          <Card
            className="mb-8 max-w-none break-inside-avoid"
            title="How I built this site"
            description="The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step."
            image={{
              src: '/images/avatar-dark.png',
              width: 576,
              height: 576,
              unoptimized: true,
            }}
            href="/builds"
          />
          <Card
            className="mb-8 max-w-none break-inside-avoid"
            title="Employee recognition platform I designed that became a McKinsey tradition"
            description="How to improve morale? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe."
            image={{
              src: '/images/og.png',
              width: 1200,
              height: 630,
            }}
            href="/resume"
          />
          <Card
            className="mb-8 max-w-none break-inside-avoid"
            title="Fetch: An Editorial Intelligence Dashboard"
            description="An analytics tool centered on the content users are familiar with instead of just tons of charts."
            image={{
              src: '/images/avatar-333333.png',
              width: 576,
              height: 576,
              unoptimized: true,
            }}
            href="/"
          />
          <Card
            className="mb-8 max-w-none break-inside-avoid"
            title="Dream log"
            description="The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step."
            image={{
              src: '/images/avatar-dark.png',
              width: 576,
              height: 576,
              unoptimized: true,
            }}
            tags={['Personal', 'Writing']}
            href="/builds"
          />
          <Card
            className="mb-8 max-w-none break-inside-avoid"
            title="Chess Scoresheet Digitizer friend"
            description="How to improve morale? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe."
            image={{
              src: '/images/og.png',
              width: 1200,
              height: 630,
            }}
            href="/resume"
          />
          <Card
            className="mb-8 max-w-none break-inside-avoid"
            title="Digital Commonplace Book"
            description="The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step."
            image={{
              src: '/images/avatar-333333.png',
              width: 576,
              height: 576,
              unoptimized: true,
            }}
            tags={['Design Systems', 'React', 'Figma', 'Next.js']}
            href="/"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
