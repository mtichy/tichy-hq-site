import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { JourneySection } from '@/components/journey-section'
import { NavBar } from '@/components/nav-bar'

// Title and description inherit from app/layout.tsx defaults.

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar activePath="/" />
      <main>
        <Hero />
        <JourneySection />
      </main>
      <Footer />
    </div>
  )
}
