import { Hyperlink } from '@/components/hyperlink'

export function ResumeSidebar() {
  return (
    <aside className="w-full lg:sticky lg:top-24 lg:max-w-[288px] lg:self-start">
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
        <Hyperlink
          href="/mark-tichy-resume.pdf"
          download
          className="inline-flex items-center gap-2 text-regular leading-regular"
        >
          <img
            src="/figma/download-icon.svg"
            alt=""
            aria-hidden="true"
            className="h-[18px] w-[23px]"
          />
          Download résumé (PDF)
        </Hyperlink>
      </div>
    </aside>
  )
}
