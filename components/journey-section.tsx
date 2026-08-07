import Image from 'next/image'
import { JourneyArrow } from '@/components/journey-arrow'

const LOGOS = [
  {
    src: '/figma/saic.png',
    alt: 'School of the Art Institute of Chicago',
    width: 311,
    height: 96,
    className: 'h-10 w-auto object-contain md:h-12',
  },
  {
    src: '/figma/parsons.png',
    alt: 'Parsons School of Design',
    width: 152,
    height: 44,
    // Match SAIC’s rendered width (h-10 / md:h-12 → ~130 / ~156)
    className: 'h-auto w-[130px] object-contain md:w-[156px]',
  },
  {
    src: '/figma/mtv-logo.png',
    alt: 'MTV',
    width: 147,
    height: 90,
    className: 'h-12 w-auto object-contain md:h-[45px]',
  },
  {
    src: '/figma/mckinsey.png',
    alt: 'McKinsey & Company',
    width: 301,
    height: 96,
    className: 'h-11 w-auto object-contain md:h-12',
  },
] as const

export function JourneySection() {
  return (
    <section className="relative isolate w-full overflow-x-clip">
      {/* Noise filter used to roughen the top & bottom edges of the dark background */}
      <svg
        aria-hidden
        className="pointer-events-none absolute h-0 w-0"
        focusable="false"
      >
        <defs>
          <filter
            id="journey-noise"
            x="-2%"
            y="-15%"
            width="104%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.999"
              numOctaves="3"
              seed="5253"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="40"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Textured dark background layer. Extends past the horizontal edges so the
          rough left/right fringe is clipped off-screen, leaving only the top and
          bottom edges visibly textured. */}
      <div
        aria-hidden
        className="absolute inset-y-0 -left-10 -right-10 bg-[var(--color-surface-muted-dark)] dark:bg-background"
        style={{ filter: 'url(#journey-noise)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--breakpoint-content)] px-6 pt-16 pb-[152px] lg:pt-[118px]">
        <h2 className="text-mega font-bold leading-mega text-[var(--color-surface-page)] text-balance">
          My journey...
        </h2>

        <div className="mt-6 max-w-[600px] space-y-6">
          <p className="text-regular font-normal leading-regular text-[var(--color-neutral-white)] text-pretty">
            With roots in fine art, my curiosity has led me through design,
            storytelling, and engineering, helping me learn new skills at each
            stop. This is how a maker evolved into a design technologist.
          </p>
          <p className="text-regular font-normal leading-regular text-[var(--color-neutral-white)]">
            So, what&apos;s next?
          </p>
        </div>

        {/* Logo row */}
        <div className="mt-16 grid grid-cols-2 justify-items-start gap-x-12 gap-y-10 md:flex md:flex-wrap md:items-center md:justify-items-center md:gap-x-12 md:gap-y-8">
          {LOGOS.map((logo, index) => (
            <div key={logo.src} className="contents">
              {index > 0 && (
                <JourneyArrow className="hidden h-5 w-[100px] text-[var(--color-surface-page)] md:block" />
              )}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={logo.className}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
