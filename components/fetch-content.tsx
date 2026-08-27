import Link from 'next/link'
import { ExpandableImage } from '@/components/expandable-image'
import { controlButtonClassName, Hyperlink } from '@/components/hyperlink'
import { DEMO_BASE } from '@/lib/fetch-demo/data'

/**
 * Case-study framing for /builds/fetch — thesis, role decision, and demo entry.
 * Vertical rhythm: section stacks use gap-6 (same as paragraph → header).
 * Images sit in that same gap-6 flow so space above/below matches.
 */
export function FetchContent() {
  return (
    <div className="flex w-full flex-col gap-16">
      <header className="flex max-w-[65ch] flex-col gap-6">
        <h1 className="text-mega font-bold leading-mega text-balance text-foreground">
          Fetch: people-first editorial intelligence
        </h1>
        <p className="text-medium font-light leading-medium text-pretty text-foreground">
          Editorial writers know their stories better than anyone. Yet, standard
          analytics tools force them to build multi-level queries using
          unfamiliar jargon just to get basic answers. This product eschews the
          typical &lsquo;wall of charts&rsquo; and puts writers and their
          content at the center, delivering answers in plain English.
        </p>
        <p>
          <Link href={DEMO_BASE} className={controlButtonClassName}>
            Open the interactive demo →
          </Link>
        </p>
      </header>

      <section className="flex w-full flex-col gap-6 text-regular leading-regular text-foreground">
        <div className="flex max-w-[65ch] flex-col gap-6">
          <p className="text-pretty">
            This project comes from proximity rather than a brief. I spent years
            building and running content platforms alongside McKinsey&apos;s
            editorial teams, and the same exchange kept repeating: an author or
            stakeholder would ask a straightforward content question and I would
            go pull the answer for them. The analytics tool was built for
            analysts, which meant that the people closest to the work had the
            least direct access to how it was doing. This was my answer to
            quickly getting insights to both the authors and the stakeholders.
          </p>
          <h2 className="text-xlarge font-bold leading-xlarge text-balance">
            Same route, opposite defaults
          </h2>
          <p className="text-pretty">
            The product has two audiences with opposite needs. An author wants
            their own work. An editor or leader wants the whole publication.
            Fetch does not split those into separate apps. It keeps one home
            route and changes the default by who you are.
          </p>
          <p className="text-pretty">
            In the demo, a persistent{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
              Viewing as: Author | Editor
            </code>{' '}
            toggle sits in the header. Most portfolio demos describe a design
            decision. This one lets you flip it. Author view opens in second
            person with anomaly cards highlighting trends first. Editor view
            opens on the publication and puts filters up front. If something
            starts to look like a query builder or a chart dashboard, it is
            wrong.
          </p>
        </div>

        <ExpandableImage
          src="/images/builds-fetch-flow.png"
          alt="Fetch product flow: authors and editors share one home route with opposite defaults, leading into anomaly cards, story detail, and Ask Fetch"
          width={3232}
          height={2312}
          caption="Initial planning and notes on the user flow"
        />

        <div className="flex max-w-[65ch] flex-col gap-6">
          <h2 className="text-xlarge font-bold leading-xlarge text-balance">
            What the demo shows
          </h2>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              Anomaly cards dynamically highlight emerging trends such as
              resurfacing content, underperformers, and new audiences, all
              written in plain language and linked to the story.
            </li>
            <li>
              Sparklines and horizontal reader breakdowns instead of pie charts.
              Every trend and bar has a text label, and color never carries
              meaning alone.
            </li>
            <li>
              &ldquo;Ask Fetch&rdquo; absorbs search: one input for lookup and
              questions. In this demo the answers are keyword-matched over
              synthetic fixtures, not a live model.
            </li>
          </ul>
          <p className="text-pretty">
            (Everything here runs on hardcoded synthetic data. No backend, no
            API calls, no browser storage. Names, headlines, and numbers are
            invented for this portfolio piece.)
          </p>
        </div>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
        <h2 className="text-xlarge font-bold leading-xlarge text-balance">
          Evals before models
        </h2>
        <p className="text-pretty">
          Ask is the one surface that pretends to take a natural-language
          question. That is exactly where quality drifts if you only eyeball the
          happy path. An eval here is a frozen question, a structured expected
          match (person, story, canned prose, or fallback), and a scorer that
          says pass or fail. The suite lives next to the matcher and runs in CI,
          so a keyword change cannot silently reroute Dana to the wrong card.
        </p>
        <p className="text-pretty">
          What it proves: regression on routing. &ldquo;What is
          resurfacing&rdquo; still returns the sprawl piece. Empty and unknown
          questions still refuse. Collisions stay visible instead of becoming
          folklore: first matching keyword wins, so &ldquo;meeting sprawl vs
          automation&rdquo; hits resurfacing before compare, and &ldquo;weather
          in EMEA&rdquo; hits the audience pair because EMEA is a keyword.
          &ldquo;Marcus&rdquo; alone falls through; the full name does not.
          Those are product facts, not test trivia.
        </p>
        <p className="text-pretty">
          What it does not prove: whether a generated paragraph would be helpful
          or grounded. This demo has no model, so there is nothing for an
          LLM-as-judge to grade. If Ask later swapped implementations, the same
          cases would stay as the contract — Dana still has to resolve to Dana —
          and only then would free-form prose need a second scorer, with
          fallback still a first-class label.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
        <h2 className="text-xlarge font-bold leading-xlarge text-balance">
          What I cut
        </h2>
        <p className="text-pretty">
          Three things came out between the planning sketches and the build.
          Each was removed for the same reason: it put back the complexity the
          product exists to remove.
        </p>
        <p className="text-pretty">
          Search. The first nav had Home, Search, and Ask. Search and Ask were
          answering the same question at different levels of specificity, so
          Search came out and Ask took the whole job. Typing &ldquo;Dana&rdquo;
          and typing &ldquo;how did Dana do last month&rdquo; now land in the
          same input.
        </p>
        <p className="text-pretty">
          The filter row under the author view. Planning put Author, Topic, and
          Date range directly below an author&apos;s own stories. That is the
          query builder again, only smaller, and it competes with the default
          the page just personalized. It became a single &ldquo;Explore all
          content&rdquo; link. The filters still exist, they are one step
          further away, which is where an escape hatch belongs.
        </p>
        <p className="text-pretty">
          A permanent Reset. The editor filters were drawn with a Reset control
          always visible. With three dropdowns resting at &ldquo;All
          topics,&rdquo; &ldquo;All authors,&rdquo; and &ldquo;All time,&rdquo;
          there is usually nothing to reset. &ldquo;Clear filters&rdquo; now
          appears only once a filter is set.
        </p>
      </section>

      <section className="flex w-full flex-col gap-6 text-regular leading-regular text-foreground">
        <div className="flex max-w-[65ch] flex-col gap-6">
          <h2 className="text-xlarge font-bold leading-xlarge text-balance">
            Demonstrable states
          </h2>
          <p className="text-pretty">
            Real product states, with copy in the product&apos;s voice, are
            linked here for easy review:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              <Hyperlink href={`${DEMO_BASE}?state=firstrun`}>
                First run
              </Hyperlink>{' '}
              — nothing published yet
            </li>
            <li>
              <Hyperlink href={`${DEMO_BASE}?state=empty`}>
                Empty anomalies
              </Hyperlink>{' '}
              — a quiet, normal week
            </li>
            <li>
              <Hyperlink href={`${DEMO_BASE}?state=loading`}>Loading</Hyperlink>{' '}
              — skeletons at final dimensions
            </li>
            <li>
              <Hyperlink href={`${DEMO_BASE}?state=error`}>Error</Hyperlink> —
              degrade gracefully, list still readable
            </li>
          </ul>
          <p>
            <Link href={DEMO_BASE} className={controlButtonClassName}>
              Enter the demo →
            </Link>
          </p>
        </div>

        <ExpandableImage
          src="/images/builds-fetch-states.png"
          alt="Fetch demonstrable states: first run, empty anomalies, loading skeletons, and error degradation across author and editor views"
          width={4160}
          height={2520}
          caption="Mapping out the various sections and states"
        />
      </section>
    </div>
  )
}
