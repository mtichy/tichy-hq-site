import type { CardImage } from '@/components/card'
import { ORBITAL_DRAWINGS_HREF } from '@/lib/labs/orbital-drawings'
import { PIXELATOR_EFFECT_HREF } from '@/lib/labs/pixelator'

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
    slug: 'fetch',
    title: 'Fetch: people-first editorial intelligence',
    description:
      'A sanitized rebuild of an editorial analytics product: people and stories as the way in, plain-language answers, and one home route that defaults differently for authors and editors.',
    tags: ['analytics', 'interactive demo'],
    ctaLabel: 'View project →',
    image: {
      src: '/images/builds-fetch.png',
      width: 760,
      height: 428,
      unoptimized: true,
    },
  },
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
    slug: 'pixelator-effect',
    title: 'Pixel-a-tor effect microtool',
    description:
      'This is the little P5.JS sketch I built to create my site avatar. Give it a try.',
    tags: ['P5.JS', 'build your own tools'],
    href: PIXELATOR_EFFECT_HREF,
    ctaLabel: 'Enter lab →',
    image: {
      src: '/images/builds-pixelator-effect.png',
      width: 760,
      height: 428,
      unoptimized: true,
    },
  },
  {
    slug: 'orbital-drawings',
    title: '3d orbital interface experiment',
    description:
      'Got interested in 3d interfaces and made this with about 350 of my old drawings. The tech stack: Next/React builds the page; Three.js (via R3F) draws the floating cards; GSAP handles focus animation; and I added controls to be able to A/B the effects and learn more about what is possible.',
    tags: ['three.js', 'drawing'],
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
