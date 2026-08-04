import type { CardImage } from '@/components/card'

export type BuildProject = {
  slug: string
  title: string
  description: string
  tags?: readonly string[]
  image: CardImage
}

/**
 * Portfolio samples shown on /builds. Adding a project: create
 * `app/builds/[slug]/page.tsx` and append an entry here.
 */
export const buildProjects: readonly BuildProject[] = [
  {
    slug: 'how-i-built-this-site',
    title: 'How I built this site?',
    description:
      'The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step.',
    tags: ['build notes', 'design systems', 'tech stack'],
    image: {
      src: '/images/builds-how-i-built-this-site.png',
      width: 1024,
      height: 537,
      unoptimized: true,
      priority: true,
    },
  },
  {
    slug: 'thank-a-thon',
    title: 'Designing a McKinsey tradition',
    description:
      'How keep spirits high? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe.',
    tags: ['zero-to-one'],
    image: {
      src: '/images/builds-thank-a-thon.png',
      width: 760,
      height: 428,
      unoptimized: true,
    },
  },
] as const

export function buildHref(slug: string) {
  return `/builds/${slug}`
}
