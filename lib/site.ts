export const siteUrl = 'https://marktichy.com'

export const siteName = 'Mark Tichý'

export const jobTitle = 'Product Designer + Design Technologist'

export const tagline =
  'AI-native Product Designer + Design Technologist. I design digital products and the systems that power them, and I work in GitHub and a terminal too.'

export const email = 'mf.tichy@gmail.com'

export const linkedInUrl = 'https://www.linkedin.com/in/mark-tichy'

export const githubUrl =
  'https://github.com/mtichy/tichy-hq-site?tab=readme-ov-file'

export const defaultTitle = `${siteName} — ${jobTitle}`

export const defaultDescription =
  'Design Technologist with 15+ years across McKinsey & Company, MTV Networks, and Parsons School of Design. Product UX, design systems, and AI-native workflows.'

export const ogImage = {
  url: '/images/og.png',
  width: 1200,
  height: 630,
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
  sameAs: [linkedInUrl, githubUrl],
} as const
