import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { ResumeContent } from '@/components/resume-content'
import { ResumeSidebar } from '@/components/resume-sidebar'

export const metadata = {
  title: 'Résumé — Mark Tichý',
  description:
    'Design Technologist with 15+ years across McKinsey & Company, MTV Networks, and Parsons School of Design.',
}

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      <NavBar />
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
