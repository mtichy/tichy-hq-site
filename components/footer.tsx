import { Hyperlink } from '@/components/hyperlink'
import { TrackedHyperlink } from '@/components/tracked-hyperlink'
import { email, linkedInUrl, siteName } from '@/lib/site'

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-[81px]">
      <div className="flex w-full max-w-[600px] flex-col gap-6">
        <h2 className="text-mega font-bold leading-mega text-foreground text-balance">
          Say Hi!
        </h2>
        <hr className="h-[6px] w-full border-0 bg-[var(--color-brand-cyan)]" />
        <div className="flex flex-col items-start gap-4">
          <TrackedHyperlink
            href={`mailto:${email}`}
            event="Contact Click"
            eventData={{ channel: 'email' }}
            className="text-medium leading-medium"
          >
            Email
          </TrackedHyperlink>
          <TrackedHyperlink
            href={linkedInUrl}
            event="Contact Click"
            eventData={{ channel: 'linkedin' }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-medium leading-medium"
          >
            Linked In
          </TrackedHyperlink>
        </div>
      </div>
      <p className="mt-40 text-small leading-small font-bold text-foreground">
        © 2026 {siteName} ·{' '}
        <Hyperlink
          href="https://github.com/mtichy/tichy-hq-site/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-small leading-small"
        >
          MIT License
        </Hyperlink>
      </p>
    </footer>
  )
}
