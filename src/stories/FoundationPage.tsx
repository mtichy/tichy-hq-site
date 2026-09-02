import type { ReactNode } from 'react'

export function FoundationPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-[var(--breakpoint-content)] flex-col gap-10 p-8">
      <header>
        <h1 className="text-large leading-large font-medium text-foreground">
          {title}
        </h1>
        <p className="mt-2 max-w-prose text-regular leading-regular text-muted-foreground">
          {description}
        </p>
      </header>
      {children}
    </div>
  )
}
