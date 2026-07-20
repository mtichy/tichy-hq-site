import { Hyperlink } from '@/components/hyperlink'

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-[81px]">
      <div className="flex w-full max-w-[600px] flex-col gap-6">
        <h2 className="text-mega font-bold leading-mega text-foreground text-balance">
          Say Hi!
        </h2>
        <hr className="h-[6px] w-full border-0 bg-[var(--color-brand-cyan)]" />
        <div className="flex flex-col items-start gap-4">
          <Hyperlink
            href="mailto:mf.tichy@gmail.com"
            className="text-medium leading-medium"
          >
            Email
          </Hyperlink>
          <Hyperlink
            href="https://www.linkedin.com/in/mark-tichy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-medium leading-medium"
          >
            Linked In
          </Hyperlink>
        </div>
      </div>
      <p className="mt-40 text-small leading-small font-bold text-foreground">
        {'© 2026 Mark Tichy | All Rights Reserved'}
      </p>
    </footer>
  )
}
