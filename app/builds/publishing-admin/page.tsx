import { BuildsBackLink } from '@/components/builds-back-link'
import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { PublishingAdminContent } from '@/components/publishing-admin-content'
import { socialImageFromBuild } from '@/lib/builds'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'The admin panel is the product',
  description:
    'What I learned designing publishing and configuration surfaces that over 100 editors, designers, and producers worked in, and how sprawling systems can be brought back into line.',
  path: '/builds/publishing-admin',
  image: socialImageFromBuild('publishing-admin'),
})

export default function PublishingAdminPage() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/builds" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        <article className="mx-auto flex w-full max-w-[808px] flex-col gap-8">
          <BuildsBackLink />
          <PublishingAdminContent />
        </article>
      </main>
      <Footer />
    </div>
  )
}
