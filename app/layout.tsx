import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import {
  defaultDescription,
  defaultTitle,
  ogImage,
  siteName,
  siteUrl,
} from '@/lib/site'
import './globals.css'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-quicksand',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s — ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary',
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
