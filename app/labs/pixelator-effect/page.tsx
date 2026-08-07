import type { Metadata } from 'next'
import PixelatorEffect from '@/components/labs/pixelator-effect'
import { NavBar } from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Pixelator effect',
  description:
    'A tools lab: upload a photo, threshold it into a pixel portrait, and export a transparent PNG — the same process behind the site avatar.',
}

export default function PixelatorEffectPage() {
  return (
    <div className="pixelator-lab-page flex min-h-screen flex-col bg-background">
      <NavBar activePath="/builds" />
      <main className="relative flex min-h-0 flex-1 flex-col">
        <PixelatorEffect />
      </main>
    </div>
  )
}
