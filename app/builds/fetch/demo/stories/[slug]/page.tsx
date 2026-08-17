import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BarBreakdown } from '@/components/fetch-demo/bar-breakdown'
import { Sparkline } from '@/components/fetch-demo/sparkline'
import { StoryRow } from '@/components/fetch-demo/story-row'
import { StorySummary } from '@/components/fetch-demo/story-summary'
import { DEMO_BASE, people } from '@/lib/fetch-demo/data'
import {
  formatPublishDate,
  getStory,
  relatedStories,
  storyArrivalItems,
  storyLocationItems,
  storySeniorityItems,
} from '@/lib/fetch-demo/selectors'
import { pageMetadata } from '@/lib/site'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { stories } = await import('@/lib/fetch-demo/data')
  return stories.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const story = getStory(slug)
  return pageMetadata({
    title: story ? `${story.headline} · Fetch demo` : 'Story · Fetch demo',
    description: story
      ? `${story.headline}. Synthetic Fetch demo — illustrative only.`
      : 'Story in the Fetch demo. Synthetic editorial analytics. Illustrative only.',
    path: `/builds/fetch/demo/stories/${slug}`,
    noIndex: true,
  })
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) notFound()

  const author = people.find((p) => p.slug === story.authorSlug)
  const related = relatedStories(story)

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <nav
          aria-label="Breadcrumb"
          className="text-small leading-small text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-x-1">
            <li>
              <Link
                href={DEMO_BASE}
                className="outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <span>{story.topic}</span>
            </li>
            {author ? (
              <>
                <li aria-hidden="true">·</li>
                <li>
                  <Link
                    href={`${DEMO_BASE}/people/${author.slug}`}
                    className="outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {author.name}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">·</li>
            <li>
              <span>{formatPublishDate(story.publishDate)}</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-large font-bold leading-large text-balance text-foreground">
          {story.headline}
        </h1>
      </header>

      <StorySummary story={story} />

      <section aria-labelledby="views-heading" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="views-heading"
              className="text-medium font-bold leading-medium text-foreground"
            >
              Views, last 12 weeks
            </h2>
            <p className="text-small leading-small text-muted-foreground">
              {story.pageviews.toLocaleString()} total · {story.trendDirection}
            </p>
          </div>
          <Sparkline
            values={story.trend}
            direction={story.trendDirection}
            width={160}
            height={40}
            showDirectionText={false}
          />
        </div>
      </section>

      <div className="flex flex-col gap-8">
        <BarBreakdown
          id="who-reading"
          title="Who's reading"
          caption="Reader seniority, last 30 days"
          items={storySeniorityItems(story)}
        />
        <BarBreakdown
          id="where-they-are"
          title="Where they are"
          caption="Reader location, last 30 days"
          items={storyLocationItems(story)}
        />
        <BarBreakdown
          id="how-arrived"
          title="How they arrived"
          caption="First touch, last 30 days"
          items={storyArrivalItems(story)}
        />
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="mb-2 text-medium font-bold leading-medium text-foreground"
          >
            Related in {story.topic}
          </h2>
          <ul className="list-none">
            {related.map((s) => (
              <StoryRow key={s.slug} story={s} showAuthor />
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
