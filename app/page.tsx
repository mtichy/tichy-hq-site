import { Hero } from '@/components/hero'
import { JourneySection } from '@/components/journey-section'
import { NavBar } from '@/components/nav-bar'

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <JourneySection />
    </div>
  )
}
