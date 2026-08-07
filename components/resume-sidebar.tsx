import Image from 'next/image'
import { controlButtonClassName } from '@/components/hyperlink'
import { TrackedHyperlink } from '@/components/tracked-hyperlink'
import { cn } from '@/lib/utils'
import { tagline } from '@/lib/site'

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
          {tagline}
        </p>
        <TrackedHyperlink
          href="/mark-tichy-resume.pdf"
          download
          event="Resume Download"
          className={cn(controlButtonClassName, 'w-fit gap-2')}
        >
          <Image
            src="/figma/download-icon.svg"
            alt=""
            width={23}
            height={18}
            unoptimized
            aria-hidden
            className="h-[14px] w-[18px]"
          />
          Download résumé (PDF)
        </TrackedHyperlink>
      </div>
    </aside>
  )
}
