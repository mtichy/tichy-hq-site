import type { CardImage } from '@/components/card'
import { ORBITAL_DRAWINGS_HREF } from '@/lib/labs/orbital-drawings'

export type BuildProject = {
  slug: string
  title: string
  description: string
  tags?: readonly string[]
  image: CardImage
  /** Defaults to /builds/${slug}; labs override to /labs/... */
  href?: string
  ctaLabel?: string
}

/**
 * Portfolio samples shown on /builds. Adding a project: create
 * `app/builds/[slug]/page.tsx` (article) or `app/labs/[slug]/page.tsx`
 * (live experiment), then append an entry here. Use `href` for labs.
 */
export const buildProjects: readonly BuildProject[] = [
  {
    slug: 'thank-a-thon',
    title: 'Designing a McKinsey tradition',
    description:
      'How to keep spirits high? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe.',
    tags: ['zero-to-one'],
    image: {
      src: '/images/builds-thank-a-thon.png',
      width: 760,
      height: 428,
      unoptimized: true,
      priority: true,
    },
  },
  {
    slug: 'how-i-built-this-site',
    title: 'How I built this site',
    description:
      'The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step.',
    tags: ['build notes', 'design systems', 'tech stack'],
    image: {
      src: '/images/builds-how-i-built-this-site.png',
      width: 1024,
      height: 537,
      unoptimized: true,
    },
  },
  {
    slug: 'orbital-drawings',
    title: '3d orbital interface experiment',
    description:
      'I found myself interested in 3d interfaces and made this orbital interface with a few hundred old drawings of mine. The tech stack: Next/React builds the page; Three.js (via R3F) draws the floating cards; GSAP handles focus animation; and I added controls to be able to A/B the effects and learn more about what is possible.',
    tags: ['lab', 'three.js', 'drawing'],
    href: ORBITAL_DRAWINGS_HREF,
    ctaLabel: 'Enter lab →',
    image: {
      src: '/images/builds-orbital-drawings.png',
      width: 760,
      height: 428,
      unoptimized: true,
    },
  },
] as const

export function buildHref(slug: string) {
  return `/builds/${slug}`
}

export function projectHref(project: BuildProject) {
  return project.href ?? buildHref(project.slug)
}
