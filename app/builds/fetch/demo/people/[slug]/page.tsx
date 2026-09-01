import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BarBreakdown } from '@/components/fetch-demo/bar-breakdown'
import { PersonSummary } from '@/components/fetch-demo/person-summary'
import { StoryRow } from '@/components/fetch-demo/story-row'
import { DEMO_BASE, people } from '@/lib/fetch-demo/data'
import {
  aggregateBreakdowns,
  getPerson,
  storiesForAuthor,
} from '@/lib/fetch-demo/selectors'
import { socialImageFromBuild } from '@/lib/builds'
import { pageMetadata } from '@/lib/site'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const person = getPerson(slug)
  return pageMetadata({
    title: person ? `${person.name} · Fetch demo` : 'Person · Fetch demo',
    description: person
      ? `${person.name}, ${person.roleTitle}. Synthetic Fetch demo — illustrative only.`
      : 'Person in the Fetch demo. Synthetic editorial analytics. Illustrative only.',
    path: `/builds/fetch/demo/people/${slug}`,
    noIndex: true,
    image: socialImageFromBuild('fetch'),
  })
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params
  const person = getPerson(slug)
  if (!person) notFound()

  const theirs = storiesForAuthor(person.slug)
  const aggregates = aggregateBreakdowns(theirs)

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
              <span>Contributor</span>
            </li>
          </ol>
        </nav>
        <div className="flex items-center gap-4">
          <span
            className="flex size-14 shrink-0 items-center justify-center rounded-md bg-secondary text-medium font-bold text-secondary-foreground"
            aria-hidden="true"
          >
            {person.initials}
          </span>
          <div>
            <h1 className="text-large font-bold leading-large text-balance text-foreground">
              {person.name}
            </h1>
            <p className="text-small leading-small text-muted-foreground">
              {person.roleTitle} · {person.storyCount}{' '}
              {person.storyCount === 1 ? 'story' : 'stories'}
            </p>
          </div>
        </div>
      </header>

      <PersonSummary person={person} />

      <section aria-labelledby="their-stories">
        <h2
          id="their-stories"
          className="mb-2 text-medium font-bold leading-medium text-foreground"
        >
          Stories
        </h2>
        <ul className="list-none">
          {theirs.map((story) => (
            <StoryRow key={story.slug} story={story} />
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="readers-heading"
        className="flex flex-col gap-8"
      >
        <h2
          id="readers-heading"
          className="text-medium font-bold leading-medium text-foreground"
        >
          Readers
        </h2>
        <BarBreakdown
          id="person-who"
          title="Who's reading"
          caption="Reader seniority, last 30 days"
          items={aggregates.seniority}
        />
        <BarBreakdown
          id="person-where"
          title="Where they are"
          caption="Reader location, last 30 days"
          items={aggregates.location}
        />
        <BarBreakdown
          id="person-how"
          title="How they arrived"
          caption="First touch, last 30 days"
          items={aggregates.arrival}
        />
      </section>
    </article>
  )
}
