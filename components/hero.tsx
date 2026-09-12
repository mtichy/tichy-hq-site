import Image from 'next/image'
import { tagline } from '@/lib/site'

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16 lg:pb-column">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-x-[calc(var(--spacing-column)+var(--spacing-gutter)*2)]">
        {/* Name + subtitle: columns 1–3 (288px) */}
        <div className="flex w-full max-w-[288px] shrink-0 flex-col gap-6">
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

        {/* Portrait (cols 5–7) above bio (cols 5–10) — unoptimized keeps pixel-art edges crisp */}
        <div className="flex w-full max-w-[600px] flex-col gap-16">
          <div className="w-full max-w-[288px] shrink-0">
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
          <p className="text-regular leading-regular text-foreground text-pretty">
            From enterprise platforms serving a global audience at McKinsey to
            digital interactives that reached millions at MTV, I work across
            product experience, design systems, content platforms, and AI-native
            workflows. I connect stakeholder vision with design and engineering
            know-how to ship, nurture, and evolve digital products.
          </p>
        </div>
      </div>
    </section>
  )
}
