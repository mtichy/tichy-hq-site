import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { JourneySection } from '@/components/journey-section'
import { NavBar } from '@/components/nav-bar'

export const metadata = {
  title: 'Mark Tichý — Design Technologist',
  description:
    'Design Technologist with 15+ years across McKinsey & Company, MTV Networks, and Parsons School of Design. Product UX, design systems, and AI-native workflows.',
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <JourneySection />
      <Footer />
    </div>
  )
}
