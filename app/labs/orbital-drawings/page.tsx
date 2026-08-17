import OrbitalDrawings from '@/components/labs/orbital-drawings'
import { NavBar } from '@/components/nav-bar'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: '3d orbital interface experiment',
  description:
    'An interactive 3D orbital interface of old drawings — a labs experiment with live A/B controls.',
  path: '/labs/orbital-drawings',
})

export default function OrbitalDrawingsPage() {
  return (
    <div className="orbital-lab-page flex min-h-screen flex-col bg-background">
      <NavBar activePath="/builds" />
      <main className="relative flex min-h-0 flex-1 flex-col">
        <OrbitalDrawings />
      </main>
    </div>
  )
}
