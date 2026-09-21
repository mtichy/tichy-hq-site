import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { JourneySection } from '@/components/journey-section'
import { NavBar } from '@/components/nav-bar'
import { ProjectsSection } from '@/components/projects-section'

// Title and description inherit from app/layout.tsx defaults.

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/" />
      <main>
        <Hero />
        <ProjectsSection />
        <JourneySection />
      </main>
      <Footer />
    </div>
  )
}
