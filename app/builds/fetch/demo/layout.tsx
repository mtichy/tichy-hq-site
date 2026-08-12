import Link from 'next/link'
import type { ReactNode } from 'react'
import { DemoShell } from '@/components/fetch-demo/demo-shell'
import { controlButtonClassName } from '@/components/hyperlink'
import { cn } from '@/lib/utils'

export default function FetchDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 px-3 py-6 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <a
          href="#fetch-demo-main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-small focus:font-bold focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to demo content
        </a>
        <nav aria-label="Case study">
          <Link
            href="/builds/fetch"
            className={cn(controlButtonClassName, 'w-fit self-start')}
          >
            ← Back to case study
          </Link>
        </nav>
        <DemoShell>{children}</DemoShell>
      </div>
    </div>
  )
}
