import Image from 'next/image'
import { controlButtonClassName } from '@/components/hyperlink'
import { PublishingAdmin } from '@/components/publishing-admin'

/**
 * Article body for /builds/publishing-admin.
 * Governance and admin-surface case study. All UI is redrawn and sanitized.
 */
export function PublishingAdminContent() {
  return (
    <div className="flex w-full flex-col gap-16">
      <div className="overflow-hidden rounded-md bg-muted">
        <Image
          src="/images/builds-publishing-admin-hero.png"
          alt="Three views of the article-creation admin: hero details, media uploads, and authors and contributors"
          width={1024}
          height={537}
          className="h-auto w-full"
          sizes="(max-width: 808px) 100vw, 808px"
          priority
          unoptimized
        />
      </div>

      <header className="flex max-w-[65ch] flex-col gap-6">
        <h1 className="text-mega font-bold leading-mega text-balance text-foreground">
          The admin panel is the product
        </h1>
        <p className="text-medium font-light leading-medium text-pretty text-foreground">
          For a large part of my career I designed for two parallel tracks of
          &ldquo;users&rdquo;. Track one was the product users. Track two was
          the producers, editors, writers, and coordinators who crafted the
          content our users engaged with. This is what I learned designing the
          publishing and configuration surfaces that over 100 editors,
          designers, and producers worked in, and how sprawling systems can be
          brought back into line.
        </p>
        <p>
          <a href="#publishing-admin-demo" className={controlButtonClassName}>
            Skip to the demo ↓
          </a>
        </p>
      </header>

      <section className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
        <p className="text-pretty">
          Nobody demos the admin panel. The CMS is often an afterthought. The
          user experience gets the redesign and the well-crafted launch note,
          and the screen where the work actually happens often only gets
          whatever is left. The editors and producers I worked with spent more
          hours in the CMS than any reader ever spent on the site, and the
          quality of everything downstream was set by what that system made easy
          (or hard). So this asymmetry is a smart thing to tackle.
        </p>
        <h2 className="text-xlarge font-bold leading-xlarge text-balance">
          What went wrong first
        </h2>
        <p className="text-pretty">
          Using a default CMS meant many incoming requests got sentenced to the
          Jira backlog. They may come to fruition some day but not in time to
          satisfy the reason they were created. Further, well-meaning,
          enterprising producers taking matters into their own hands led to site
          styles and components getting sprawled out and redundant. Three ways
          to set a headline, four near-identical card treatments, spacing that
          drifted a little further from standards with every page built. This is
          the ordinary failure mode of any tool that lets people compose freely,
          that forces ambitious producers to hack together their own solutions,
          and it does not announce itself. It accumulates doggedly over time.
        </p>
        <p className="text-pretty">
          The knee-jerk reaction to avoid this is an approval gate. But a gate
          makes contribution expensive and laborious, and I had the feeling that
          the people contributing were not the problem: the system was.
        </p>
        <h2 className="text-xlarge font-bold leading-xlarge text-balance">
          Empower the system, free the composition
        </h2>
        <p className="text-pretty">
          Three things helped reel this problem in. First, a design system:
          every new element had to be built from sanctioned McKinsey Design
          System and Editorial Design System assets, in other words, access to
          the right tools and building blocks. This access empowered producers
          to compose nearly whatever they wanted while minimizing drift. Second,
          a taxonomy, so the content library has a clear shape and components
          are findable. Third, regular checkpoints to prune any outliers along
          the way.
        </p>
        <p className="text-pretty">
          A core team of about 10-20 contributors ran those reviews themselves,
          from the beginning. That part is worth stating precisely, because the
          usual version of this story is a team that eventually reaches
          federated governance after starting with a gatekeeper. That is not
          what happened. It was community-run the whole time, and what improved
          was the workflow around it, refined until it worked.
        </p>
        <p className="text-pretty">
          Governance turned out to be mostly a design problem rather than a
          policing problem. Get the system right and there is very little left
          to police.
        </p>
      </section>

      <section className="flex w-full flex-col gap-6 text-regular leading-regular text-foreground">
        <div className="flex max-w-[65ch] flex-col gap-6">
          <h2 className="text-xlarge font-bold leading-xlarge text-balance">
            The surface, redrawn
          </h2>
          <p className="text-pretty">
            Below is the article-creation panel, rebuilt from my original design
            work and sanitized for this portfolio.{' '}
            <strong className="font-bold">
              You can click through the six sections.
            </strong>{' '}
            The three decisions worth looking at are called out underneath.
          </p>
        </div>

        <div
          id="publishing-admin-demo"
          className="scroll-mt-[calc(var(--site-nav-height)+1.5rem)]"
        >
          <PublishingAdmin />
        </div>

        <div className="flex max-w-[65ch] flex-col gap-6">
          <p className="text-small leading-small text-muted-foreground">
            This is redrawn in my site&apos;s own design system. No backend, no
            real content, no storage. Structure only.
          </p>
        </div>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
        <h2 className="text-xlarge font-bold leading-xlarge text-balance">
          Three decisions
        </h2>
        <p className="text-pretty">
          <strong className="font-bold">
            Publish status is a state machine, not a boolean.
          </strong>{' '}
          Published and visible are different questions. An article can be live
          and deliberately hidden from search, from the feeds, or from the news
          home page, independently, because those are three different audiences
          reaching it three different ways. Collapsing that into one toggle
          would have pushed the real decision into email.
        </p>
        <p className="text-pretty">
          <strong className="font-bold">
            The Stacks Manager, rather than a component catalogue.
          </strong>{' '}
          Editors, producers, and designers could all contribute new components
          and styles, and place them straight into the content they were
          building. A catalogue is something you go and consult. This put the
          block where the writing was happening. Letting non-designers
          contribute is the harder governance problem, and the custom library is
          what made it safe.
        </p>
        <p className="text-pretty">
          <strong className="font-bold">
            Automatic URL, with the override one click away.
          </strong>{' '}
          Slugs are generated by default, so the common case is consistent and
          nobody has to think about it. The manual override still exists,
          because sometimes it genuinely matters. Safe default, cheap escape
          hatch. The same argument as the design system, applied to a text
          field.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
        <h2 className="text-xlarge font-bold leading-xlarge text-balance">
          A second audience, and a much harder permission model
        </h2>
        <p className="text-pretty">
          I got the chance to carry this same discipline into a global benefits
          product with its own admin panel, for an entirely different and more
          varied population: developer admins, global admins, country admins,
          and country coordinators. Four tiers, running from engineers at one
          end to non-technical coordinators at the other, all working in the
          same system. This product scoped permissions by country, across a firm
          operating in more than 60 of them.
        </p>
        <p className="text-pretty">
          Here, there were four domains to control for: which content a person
          could see, what they could edit, what they had authority to approve,
          and which eligibility data they could reach. That last one is the
          reason the model had to be real rather than tidy. Benefits differ by
          country because the law differs by country, so the permission model
          was carrying a regulatory boundary, not just an org chart. Getting it
          wrong does not just produce an inconsistent page. It bumps up against
          regulatory frameworks.
        </p>
        <p className="text-pretty">
          Two different admin surfaces, audiences who had never met, and in the
          second case a span of expertise inside one tool that most products get
          to split across several. What travelled between them was not the
          interface. It was the method: model the object, name the states,
          decide what the default protects, and put the escape hatch one step
          further away than the safe path.
        </p>
        <p className="text-pretty">
          It is the same idea as the design-system constraint, one level up.
          There, the primitives were tokens and the thing being protected was
          consistency. Here the primitives are capability and country, and the
          thing being protected is someone&apos;s private information. Constrain
          what can be composed and most of the enforcement problem stops
          existing.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-6 text-regular leading-regular text-foreground">
        <h2 className="text-xlarge font-bold leading-xlarge text-balance">
          What it produced
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-6">
          <li>
            <strong className="font-bold">
              100+ editors, designers, and producers
            </strong>{' '}
            working in the platforms, across combined products in 60 countries.
          </li>
          <li>
            A flexible and dynamic production workflow that could grow with the
            team&apos;s ambitions without burdening engineers.
          </li>
          <li>
            <strong className="font-bold">A core team of about 10-20</strong>{' '}
            contributing components and reviewing each other&apos;s work.
          </li>
          <li>
            <strong className="font-bold">
              Sprawl and redundancy reversed
            </strong>{' '}
            by a design system, a dynamic library, and regular checkpoints,
            without the need for another approval gate.
          </li>
          <li>
            <strong className="font-bold">Still in production today</strong>,
            running on the original design.
          </li>
        </ul>
        <p className="text-pretty">
          Tokens are a taxonomy. Constraining what people can build from is the
          same move as structuring a corpus so that a model can answer questions
          about it. Structure is what makes contribution and growth sustainable.
        </p>
      </section>
    </div>
  )
}
