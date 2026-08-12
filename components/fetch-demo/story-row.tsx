'use client'

import Link from 'next/link'
import { Sparkline } from '@/components/fetch-demo/sparkline'
import { DEMO_BASE, people } from '@/lib/fetch-demo/data'
import { useDemoRole } from '@/lib/fetch-demo/role-context'
import { formatPublishDate, storyListNote } from '@/lib/fetch-demo/selectors'
import type { Story } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'

type StoryRowProps = {
  story: Story
  showAuthor?: boolean
  /** When true, omit pageviews / sparkline (error degrade). */
  hideMetrics?: boolean
  className?: string
}

export function StoryRow({
  story,
  showAuthor = false,
  hideMetrics = false,
  className,
}: StoryRowProps) {
  const { role } = useDemoRole()
  const author = people.find((p) => p.slug === story.authorSlug)
  const note = storyListNote(story, role)

  return (
    <li
      className={cn(
        'border-b border-foreground/20 py-4 last:border-b-0',
        className,
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <Link
            href={`${DEMO_BASE}/stories/${story.slug}`}
            className="text-regular leading-regular font-medium text-pretty text-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {story.headline}
          </Link>
          <p className="mt-1 text-small leading-small text-muted-foreground">
            <span className="font-bold text-small leading-small">
              {formatPublishDate(story.publishDate)}
            </span>
            {showAuthor && author ? (
              <>
                {' · '}
                <Link
                  href={`${DEMO_BASE}/people/${author.slug}`}
                  className="text-foreground underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {author.name}
                </Link>
              </>
            ) : null}
          </p>
          {!hideMetrics ? (
            <p className="mt-1 text-small leading-small text-pretty text-muted-foreground">
              {note}
            </p>
          ) : null}
        </div>
        {!hideMetrics ? (
          <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
            <span className="text-small leading-small font-bold tabular-nums text-foreground">
              {story.pageviews.toLocaleString()} views
            </span>
            <Sparkline values={story.trend} direction={story.trendDirection} />
          </div>
        ) : null}
      </div>
    </li>
  )
}
