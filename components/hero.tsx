export function Hero() {
  return (
    <section className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        {/* Name + subtitle column */}
        <div className="flex w-full max-w-[288px] flex-col gap-6">
          <h1 className="text-mega font-bold leading-mega text-foreground text-balance">
            mark
            <br />
            tichý
          </h1>
          <hr className="h-[6px] w-full border-0 bg-[var(--color-brand-cyan)]" />
          <p className="text-medium leading-medium text-foreground text-pretty">
            Design Technologist. Imagining and building digital products and the
            systems, workflows, and content models that power them.
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

        {/* Portrait column */}
        <div className="w-full max-w-[288px] shrink-0">
          <img
            src="/images/portrait.png"
            alt="Pixel-art portrait of mark tichý"
            width={288}
            height={288}
            className="h-72 w-72 [image-rendering:pixelated]"
          />
        </div>
      </div>
    </section>
  )
}
