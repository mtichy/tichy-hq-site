import type { Metadata } from 'next'
import { AskPanel } from '@/components/fetch-demo/ask-panel'

export const metadata: Metadata = {
  title: 'Ask · Fetch demo',
  description: 'Ask Fetch a question. Synthetic demo responses only.',
  robots: { index: false, follow: false },
}

export default function AskPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-large font-bold leading-large text-balance text-foreground">
          Ask Fetch
        </h1>
        <p className="mt-2 text-regular leading-regular text-pretty text-muted-foreground">
          One spot to look someone up or ask how the work is landing.
        </p>
      </header>
      <AskPanel />
    </div>
  )
}
