import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { ResumeContent } from '@/components/resume-content'
import { ResumeSidebar } from '@/components/resume-sidebar'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Résumé',
  description:
    'Product designer and design technologist with 15+ years across McKinsey & Company and MTV Networks. Product UX, design systems, and AI-native design-to-code workflows.',
  path: '/resume',
})

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/resume" />
      <main className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <ResumeSidebar />
          <ResumeContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
