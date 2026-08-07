import type { Metadata } from 'next'
import PixelatorEffect from '@/components/labs/pixelator-effect'
import { NavBar } from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Pixelator effect',
  description:
    'Upload a photo, adjust the threshold and grid size, export as a PNG. This is exactly how I made my site avatar.',
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
