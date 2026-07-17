export function BuildsSidebar() {
  return (
    <aside className="w-full lg:sticky lg:top-24 lg:max-w-[288px] lg:self-start">
      <div className="flex w-full max-w-[288px] flex-col gap-6">
        <h1 className="text-mega font-bold leading-mega text-foreground text-balance">
          Builds
        </h1>
        <hr className="h-[6px] w-full border-0 bg-[var(--color-brand-cyan)]" />
        <p className="text-medium leading-medium text-foreground text-pretty">
          A selection of projects, experiments, and things I&apos;ve made.
        </p>
      </div>
    </aside>
  )
}
