import type { Metadata } from 'next'

export const siteUrl = 'https://marktichy.com'

export const siteName = 'Mark Tichý'

export const jobTitle = 'Product Designer + Design Technologist'

export const tagline =
  'AI-native Product Designer + Design Technologist. I design digital products and the systems that power them, and I work in GitHub and a terminal too.'

export const email = 'mf.tichy@gmail.com'

export const linkedInUrl = 'https://www.linkedin.com/in/mark-tichy'

export const githubUrl = 'https://github.com/mtichy/tichy-hq-site'

export const defaultTitle = `${siteName} — ${jobTitle}`

export const defaultDescription =
  'Product designer and design technologist with 15+ years across McKinsey & Company and MTV Networks. Product UX, design systems, and AI-native design-to-code workflows.'

export const ogImage = {
  url: '/images/og.png',
  width: 1200,
  height: 630,
  alt: `Pixel-art portrait of ${siteName}`,
}

/**
 * Next.js App Router merges metadata shallowly at the top level, so a child
 * that sets only `title` and `description` inherits the root `openGraph` and
 * `twitter` objects in full — including the homepage description and `url: '/'`.
 * Always return a complete social block from this helper instead of partial
 * page metadata.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  noIndex?: boolean
}): Metadata {
  const socialTitle = `${title} — ${siteName}`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName,
      title: socialTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}

/** Schema.org Person JSON-LD for search engines. */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteName,
  jobTitle,
  url: siteUrl,
  image: `${siteUrl}${ogImage.url}`,
  email,
  description: defaultDescription,
  sameAs: [linkedInUrl, githubUrl],
} as const
