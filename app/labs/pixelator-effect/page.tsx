import PixelatorEffect from '@/components/labs/pixelator-effect'
import { NavBar } from '@/components/nav-bar'
import { socialImageFromBuild } from '@/lib/builds'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Pixelator effect',
  description:
    'Upload a photo, adjust threshold, softness, and grid size, export as a PNG. This is how I made my site avatar.',
  path: '/labs/pixelator-effect',
  image: socialImageFromBuild('pixelator-effect'),
})

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
