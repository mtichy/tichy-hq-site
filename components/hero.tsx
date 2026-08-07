import Image from 'next/image'
import { tagline } from '@/lib/site'

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 pt-[69px] pb-16 lg:pb-[83px]">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        {/* Name + subtitle column */}
        <div className="flex w-full max-w-[288px] flex-col gap-6">
          <h1 className="text-mega font-bold leading-mega text-foreground text-balance">
            mark
            <br />
            tichý
          </h1>
          <hr className="h-[6px] w-full border-0 bg-[var(--color-brand-cyan)]" />
          <p className="text-medium leading-medium text-foreground text-pretty">
            {tagline}
          </p>
        </div>

        {/* Bio column */}
        <div className="w-full max-w-[600px]">
          <p className="text-regular leading-regular text-foreground text-pretty">
            From enterprise platforms serving a global audience at McKinsey to
            digital interactives that reached millions at MTV, I work across
            product experience, design systems, content platforms, and AI-native
            workflows. I connect stakeholder vision with design and engineering
            know-how to ship, nurture, and evolve digital products.
          </p>
        </div>

        {/* Portrait column — unoptimized keeps pixel-art edges crisp */}
        <div className="mx-auto w-full max-w-[288px] shrink-0 lg:mx-0">
          <Image
            src="/images/avatar-333333.png"
            alt="Pixel-art portrait of mark tichý"
            width={576}
            height={576}
            priority
            unoptimized
            className="aspect-square h-auto w-full [image-rendering:pixelated] dark:hidden"
          />
          <Image
            src="/images/avatar-dark.png"
            alt="Pixel-art portrait of mark tichý"
            width={576}
            height={576}
            unoptimized
            className="hidden aspect-square h-auto w-full [image-rendering:pixelated] dark:block"
          />
        </div>
      </div>
    </section>
  )
}
