import { Hero } from '@/components/hero'
import { NavBar } from '@/components/nav-bar'

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
    </div>
  )
}
