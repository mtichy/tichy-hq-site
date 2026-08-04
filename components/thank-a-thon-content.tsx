import Image from 'next/image'
import { Hyperlink } from '@/components/hyperlink'

const BEST_EMPLOYERS_URL =
  'https://www.mckinsey.com/featured-insights/people-in-progress/fueling-performance-through-health-and-wellbeing'

/**
 * Article body for /builds/thank-a-thon.
 * Copy and media from Figma “Designing a McKinsey tradition” frame.
 */
export function ThankAThonContent() {
  return (
    <div className="flex w-full flex-col gap-16">
      <div className="overflow-hidden rounded-md bg-muted">
        <Image
          src="/images/builds-thank-a-thon-hero.png"
          alt="Neon Thank-a-thon sign with a pink heart and an OPEN 24-HRS badge"
          width={1024}
          height={640}
          className="h-auto w-full"
          sizes="(max-width: 808px) 100vw, 808px"
          priority
          unoptimized
        />
      </div>

      <header className="flex max-w-[65ch] flex-col gap-6">
        <h1 className="text-mega font-bold leading-mega text-balance text-foreground">
          Designing a McKinsey tradition
        </h1>
        <p className="text-medium font-light leading-medium text-pretty text-foreground">
          How keep spirits high? Make gratitude contagious with an annual
          week-long Thank-a-thon that generates tens of thousands of thank you
          messages and hundreds of thousands of page views across the globe.
        </p>
      </header>

      <div className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
        <p className="text-pretty">
          In 2018 while on McKinsey&apos;s Global Internal Comms team,
          essentially an internal creative agency for the Managing Partner and
          senior firm leadership, we were tasked with creating an initiative to
          respond to some internal research on the benefits of workplace
          gratitude. My idea was a horizontally scrolling Thank You card
          &ldquo;wall&rdquo; that I called Thank-a-thon, the idea stuck and has
          been an annual firm tradition ever since.
        </p>
        <p className="text-pretty">
          The idea that made it stick wasn&apos;t the wall itself though, it was
          the notification loop I designed around it, where being publicly
          thanked triggered charming notifications that prompted colleagues to
          pay it forward, driving a viral flood of new messages every cycle for
          years afterward.
        </p>
        <p className="text-pretty">
          McKinsey has since cited Thank-a-thon publicly as one of{' '}
          <Hyperlink
            href={BEST_EMPLOYERS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-regular leading-regular"
          >
            five practices behind its 2025 Best Employers Award
          </Hyperlink>{' '}
          for well-being, with a Wall of Gratitude that&apos;s grown to more
          than 65,000 notes in one event.
        </p>
        <p className="text-pretty">
          As UX &amp; Tech Lead for the initiative, I researched and built the
          technical support model needed to run it, assembling and leading a
          team of just under 150 technical and engineering colleagues each year,
          and led the platform&apos;s modernization from jQuery to React,
          deliberately keeping the visual design consistent to protect years of
          built-up brand recognition. Over time I added features like a library
          of animated card designs and office-based sorting, and led the most
          recent firmwide relaunch in December 2025, including a live
          promotional ticker called Thank-o-meter that gave the site a dynamic
          presence on McKinsey&apos;s intranet homepage.
        </p>
      </div>

      <figure className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-md bg-muted">
          <Image
            src="/images/builds-thank-a-thon-map.png"
            alt="Thank-a-thon map prototype showing office markers across a world map with message and colleague counts"
            width={1024}
            height={713}
            className="h-auto w-full"
            sizes="(max-width: 808px) 100vw, 808px"
            unoptimized
          />
        </div>
        <figcaption className="text-center text-small leading-small text-muted-foreground">
          An experimental prototype exploring an alternate map-based interface
        </figcaption>
      </figure>
    </div>
  )
}
