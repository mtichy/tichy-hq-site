import { Footer } from '@/components/footer'
import { Hyperlink, controlButtonClassName } from '@/components/hyperlink'
import { NavBar } from '@/components/nav-bar'
import { NotFoundGlitch } from '@/components/not-found-glitch'
import { pageMetadata } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata = pageMetadata({
  title: '404',
  description: 'Apologies, this URL is not on the site.',
  path: '/404',
})

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex min-h-[calc(100svh-var(--site-nav-height))] w-full flex-col items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-[var(--breakpoint-content)] flex-col items-center gap-6 text-center">
          <NotFoundGlitch />
          <p className="text-regular leading-regular text-foreground text-pretty">
            Apologies, this URL is not on the site.
          </p>
          <Hyperlink href="/" className={cn(controlButtonClassName, 'w-fit')}>
            Home
          </Hyperlink>
        </div>
      </main>
      <Footer />
    </div>
  )
}
