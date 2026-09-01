import { AskPanel } from '@/components/fetch-demo/ask-panel'
import { socialImageFromBuild } from '@/lib/builds'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Ask · Fetch demo',
  description: 'Ask Fetch a question. Synthetic demo responses only.',
  path: '/builds/fetch/demo/ask',
  noIndex: true,
  image: socialImageFromBuild('fetch'),
})

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
