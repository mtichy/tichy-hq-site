import type { ReactNode } from 'react'
import { ExpandableImage } from '@/components/expandable-image'
import { Hyperlink } from '@/components/hyperlink'
import { LabVideo } from '@/components/labs/lab-video'

function SectionHeading({
  id,
  n,
  children,
}: {
  id: string
  n: number
  children: string
}) {
  return (
    <h2
      id={id}
      className="max-w-[65ch] text-xlarge font-bold leading-xlarge text-balance text-foreground"
    >
      <span
        aria-hidden="true"
        className="text-[var(--color-brand-cyan-strong)] dark:text-[var(--color-brand-cyan)]"
      >
        {n}
      </span>{' '}
      {children}
    </h2>
  )
}

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <>
      <Hyperlink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-regular leading-regular"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </Hyperlink>
      {/* Explicit text node — production JSX minify drops a space after </ExternalLink> */}{' '}
    </>
  )
}

/**
 * Article body for /labs/motion-studies.
 */
export function MotionStudiesContent() {
  return (
    <div className="flex w-full flex-col gap-16">
      <div className="flex max-w-[65ch] flex-col gap-6">
        <h1 className="text-mega font-bold leading-mega text-balance text-foreground">
          Motion studies: how little is enough?
        </h1>
        <div className="flex flex-col gap-6 text-regular leading-regular text-foreground">
          <p className="text-pretty">
            I attended the{' '}
            <ExternalLink href="https://skowheganart.org/">
              Skowhegan School of Painting and Sculpture
            </ExternalLink>
            in 2005 on a fellowship for my drawing and film/video work. After
            that I got to work at MTV producing the digital side of on-air shows
            &amp; events, then, a move to McKinsey building editorial, digital,
            and enterprise products. Through it all I have never stopped drawing
            and experimenting.
          </p>
          <p className="text-pretty">
            Motion has been a thread through all of the above. As a UX Designer
            it is not optional, transitions and interactions are how an
            interface explains itself. That said, I have also kept a separate
            interest in motion graphics and effects, and a fun habit of learning
            and testing emerging tools in this space.
          </p>
          <p className="text-pretty">
            While browsing some of my video files recently I noticed a common
            theme: how little is enough? Can three frames make something feel
            alive? Can you build a pattern with one calligraphic stroke? Is one
            dial enough to create variations of an image? Will one bit of color
            do?
          </p>
          <p className="text-pretty">
            None of these clips were briefed or assigned. They are studies
            driven by curiosity and made in After Effects, P5.js, and Procreate.
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-6" aria-labelledby="three-frames">
        <SectionHeading id="three-frames" n={1}>
          Three frames
        </SectionHeading>
        <LabVideo
          src="/videos/labs/motion-studies/02-three-frames.mp4?v=9s"
          poster="/images/labs/motion-studies/02-three-frames-poster.jpg"
          width={1080}
          height={1080}
          label="Four three-frame looping drawings in a grid. Solomon's Knot, also called Lover's Knot, is in the upper left."
          mode="loop"
        />
        <div className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
          <p className="text-pretty">
            Four loops, drawn and animated in Procreate. Each one is only three
            frames.
          </p>
          <p className="text-pretty">
            How little is needed before a loop reads as movement rather than a
            flicker?
          </p>
          <p className="text-pretty">
            Two frames reads as an on/off switch, four frames already starts to
            feel a bit like animation, but three frames sits in a strange place
            where the eye fills in motion that was seemingly never drawn.
            Surprising how just three frames can lend a loop a feeling of
            &ldquo;being&rdquo;.
          </p>
          <p className="text-pretty">
            My favorite is the &ldquo;Solomon&apos;s Knot&rdquo; (aka
            &ldquo;Lover&apos;s Knot&rdquo;) in the upper left, this is an
            ancient image dating back to the Bronze Age with symbolic meanings
            related to eternity, union of dualities (hence its alias as the
            Lover&apos;s Knot), protection, and wisdom. Also like the idea of a
            looping loop.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="one-stroke">
        <SectionHeading id="one-stroke" n={2}>
          One stroke
        </SectionHeading>
        <LabVideo
          src="/videos/labs/motion-studies/03-glyphs.mp4"
          poster="/images/labs/motion-studies/03-glyphs-poster.jpg"
          width={2048}
          height={2048}
          label="Looping animation of calligraphic strokes accumulating into shapes and texture."
          mode="loop"
        />
        <div className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
          <p className="text-pretty">
            This is also made in Procreate with a custom brush. Built entirely
            from basic calligraphy strokes, repeated and varied until they
            accumulate into shapes and then fields of texture.
          </p>
        </div>
        <ExpandableImage
          src="/images/labs/motion-studies/maze.jpg"
          alt="Sketchbook page of maze-like systemic drawings in pencil and ink"
          width={2024}
          height={1518}
          caption="Similar vibes from my sketches"
        />
        <div className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
          <p className="text-pretty">
            I have drawn systems like this by hand for years. Mazes that never
            resolve, alphabets for languages that don&apos;t exist, grids that
            drift and morph. Systemic drawings where an established rule is
            repeated until completion. This is the same idea from the drawings
            but in motion.
          </p>
        </div>
      </section>

      <section
        className="flex flex-col gap-6"
        aria-labelledby="live-in-the-browser"
      >
        <SectionHeading id="live-in-the-browser" n={3}>
          Live, in the browser
        </SectionHeading>
        <LabVideo
          src="/videos/labs/motion-studies/01-motion-capture.mp4?v=2"
          poster="/images/labs/motion-studies/01-motion-capture-poster.jpg?v=2"
          width={1280}
          height={720}
          label="Split webcam feed: one-bit threshold on the left, misregistered CMYK dot screen on the right."
          mode="loop"
        />
        <div className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
          <p className="text-pretty">
            Two effects running on the same webcam feed, side by side.
          </p>
          <p className="text-pretty">
            I built these in the browser with{' '}
            <ExternalLink href="https://p5js.org/">p5.js</ExternalLink> because
            I wanted to adjust the values while watching live video. The point
            was to find the settings by feel, then keep the frames worth
            keeping. It&apos;s another example of how you can build your own
            micro-tools to generate graphic effects, or even interface
            interactions.
          </p>
          <p className="text-pretty">
            Adjusting the dial, I noticed the misregistration has a number. Zero
            is aligned, six is broken, everything in between is available. That
            makes it a state rather than a texture, and a state can carry
            information. Content that has not loaded could sit at four and
            settle to zero as it arrives. A stream that is buffering could drift
            out of alignment and come back when it recovers. The printing error
            becomes a loading state.
          </p>
        </div>
      </section>

      <section
        className="flex flex-col gap-6"
        aria-labelledby="time-as-a-direction"
      >
        <SectionHeading id="time-as-a-direction" n={4}>
          Time as a direction
        </SectionHeading>
        <LabVideo
          src="/videos/labs/motion-studies/04-time-displace.mp4"
          poster="/images/labs/motion-studies/04-time-displace-poster.jpg"
          width={1280}
          height={720}
          label="Time-displacement video of a gesture. Includes a mountain dulcimer score."
          mode="sound"
        />
        <div className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
          <p className="text-pretty">
            In an ordinary video every pixel in a frame comes from the same
            moment. Here the row a pixel sits in decides how far back in time it
            is read. The top of the frame is now. The bottom is a second ago.
            Everything between is a distortion.
          </p>
          <p className="text-pretty">
            The technique is old and usually called time displacement or
            slit-scan. I was primarily interested in adding new layers of
            abstraction to an already abstract form.
          </p>
          <p className="text-pretty">
            Built in After Effects. The score is mine as well, played on my
            mountain dulcimer.
          </p>
        </div>
      </section>

      <section
        className="flex flex-col gap-6"
        aria-labelledby="from-play-to-product"
      >
        <SectionHeading id="from-play-to-product" n={5}>
          From play to product
        </SectionHeading>
        <LabVideo
          src="/videos/labs/motion-studies/05-glitch.mp4"
          poster="/images/labs/motion-studies/05-glitch-poster.jpg"
          width={654}
          height={290}
          label="Animated hero banner that reads HACKED, with RGB channels pulled out of alignment."
          mode="loop"
        />
        <div className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
          <p className="text-pretty">
            Finally, here is an example of how the exploratory processes above
            can translate into shipped assets.
          </p>
          <p className="text-pretty">
            I learned some things on the prior time displacement sketch that
            came in handy when I made this animated hero banner for a McKinsey
            cybersecurity piece in After Effects.
          </p>
          <p className="text-pretty">It pays to play.</p>
        </div>
      </section>
    </div>
  )
}
