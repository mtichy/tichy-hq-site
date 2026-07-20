export const siteUrl = 'https://marktichy.com'

export const siteName = 'Mark Tichý'

export const jobTitle = 'Design Technologist'

export const email = 'mf.tichy@gmail.com'

export const linkedInUrl = 'https://www.linkedin.com/in/mark-tichy'

export const defaultTitle = `${siteName} — ${jobTitle}`

export const defaultDescription =
  'Design Technologist with 15+ years across McKinsey & Company, MTV Networks, and Parsons School of Design. Product UX, design systems, and AI-native workflows.'

/** Placeholder until a dedicated 1200×630 OG asset is added. */
export const ogImage = {
  url: '/images/avatar-333333.png',
  width: 576,
  height: 576,
  alt: `Pixel-art portrait of ${siteName}`,
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
  sameAs: [linkedInUrl],
} as const
