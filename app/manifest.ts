import type { MetadataRoute } from 'next'
import { defaultDescription, siteName } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: 'Tichý',
    description: defaultDescription,
    start_url: '/',
    display: 'browser',
    background_color: '#f1f7ee',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
