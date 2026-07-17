export function BuildsContent() {
  return (
    <div className="w-full max-w-[600px]">
      {/* Intro */}
      <section className="flex flex-col gap-4">
        <p className="text-regular leading-regular text-foreground text-pretty">
          After building and managing confidential products at McKinsey &amp;
          Company for 12 years I will be using this space to share new projects
          and experiments moving forward.
        </p>
        <p className="text-regular leading-regular text-foreground text-pretty">
          For starters, a behind-the-scenes look at the process behind this site
          from design system to deployment.
        </p>
        <p className="text-regular leading-regular text-foreground text-pretty">
          The short version: a real design system as the foundation, AI tools
          doing what they do well on execution, and a carbon-based life form
          reviewing and directing every step.
        </p>
      </section>

      {/* 1 — Design System in Figma */}
      <section className="mt-16">
        <h2 className="text-xlarge font-bold leading-xlarge text-foreground text-balance">
          <span className="text-[var(--color-brand-cyan)]">1</span> Design
          System in Figma
        </h2>
        <p className="mt-6 text-regular leading-regular text-foreground text-pretty">
          Before any prompting or prototyping, I built a foundational design
          system in Figma:
        </p>
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
          <li>Color palette (including dark mode alternates)</li>
          <li>Typography system &amp; type scale</li>
          <li>Grid &amp; column structure</li>
          <li>A base set of reusable components</li>
        </ul>
        <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          This wasn&apos;t just a sketch or a moodboard, I structured it to
          translate directly into code as best I could. I exported it as two
          files that became the source of truth for everything downstream:
        </p>
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
          <li>globals.css (CSS custom properties for color, spacing, and typography)</li>
          <li>primitives.tokens.json (the raw design tokens)</li>
        </ul>
        <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          Defining the tokens up front meant every AI tool I used later had a
          shared vocabulary to build against, instead of guessing at hex codes
          and pixel values from a screenshot.
        </p>
      </section>

      {/* 2 — Rapid prototyping in v0 */}
      <section className="mt-16">
        <h2 className="text-xlarge font-bold leading-xlarge text-foreground text-balance">
          <span className="text-[var(--color-brand-cyan)]">2</span> Rapid
          prototyping in v0
        </h2>
        <p className="mt-6 text-regular leading-regular text-foreground text-pretty">
          With the design system exported, I moved into v0 and fed it the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
            globals.css
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
            primitives.tokens.json
          </code>{" "}
          files directly insuring that it inherited the actual design language
          rather than inventing its own.
        </p>
        <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          From there:
        </p>
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
          <li>
            Instead of generating a full page in one pass I directed v0 at
            individual Figma frames and built the interface one component at a
            time. I&apos;ve found that smaller units are easier to check against
            the source design
          </li>
          <li>
            Reviewed each component against its Figma frame before moving to the
            next one
          </li>
          <li>
            Once the static layout was in place refined interactions and states
            (hover, focus, transitions) in a second pass
          </li>
        </ul>
        <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          Human-in-the-loop matters here, v0 handled scaffolding and
          boilerplate, but every decision on whether the output actually matched
          intent was mine.
        </p>
      </section>

      {/* 3 — Handoff to GitHub */}
      <section className="mt-16">
        <h2 className="text-xlarge font-bold leading-xlarge text-foreground text-balance">
          <span className="text-[var(--color-brand-cyan)]">3</span> Handoff to
          GitHub
        </h2>
        <p className="mt-6 text-regular leading-regular text-foreground text-pretty">
          Before moving into Cursor the v0 project gets pushed to GitHub.<br/>Why:
        </p>
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
          <li>
            Cursor picks up a real git history from the start, with proper
            commits and the ability to branch or revert
          </li>
          <li>
            v0 stays connected to that same repo, so future prototyping sessions
            sync back to one source of truth instead of forking into
            disconnected exports
          </li>
          <li>
            Anyone (including future me) picking this up inherits a normal repo,
            not a zip file
          </li>
        </ul>
      </section>

      {/* 4 — Development in Cursor */}
      <section className="mt-16">
        <h2 className="text-xlarge font-bold leading-xlarge text-foreground text-balance">
          <span className="text-[var(--color-brand-cyan)]">4</span> Development
          in Cursor
        </h2>
        <p className="mt-6 text-regular leading-regular text-foreground text-pretty">
          With the repo open in Cursor, the remaining work shifts from
          generation to refinement and judgment:
        </p>
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
          <li>
            Finish content and interaction details v0 couldn&apos;t infer from a
            static frame
          </li>
          <li>
            Audit the AI-generated code: remove dead code, consolidate
            duplicated logic, tighten up accessibility and semantic HTML
          </li>
          <li>
            Write documentation (README, component notes) so the codebase is
            legible to a human (especially me), not just to the AI that helped
            write it
          </li>
          <li>
            Test across breakpoints and browsers, plus a basic accessibility
            pass (contrast, keyboard navigation, screen reader behavior)
          </li>
        </ul>
      </section>

      {/* 4 — Deployment with Vercel */}
      <section className="mt-16">
        <h2 className="text-xlarge font-bold leading-xlarge text-foreground text-balance">
          <span className="text-[var(--color-brand-cyan)]">4</span> Deployment
          with Vercel
        </h2>
        <p className="mt-6 text-regular leading-regular text-foreground text-pretty">
          Lastly, the GitHub repo connects to Vercel for continuous integration
          and deployment:
        </p>
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
          <li>
            Every push to main triggers a production deploy; every branch or PR
            gets its own preview URL for review before merging
          </li>
          <li>Custom domain pointed at Vercel, with SSL handled automatically</li>
          <li>
            Basic analytics enabled to see how the site is actually used
            post-launch
          </li>
        </ul>
      </section>

      {/* ? — Why this workflow */}
      <section className="mt-16">
        <h2 className="text-xlarge font-bold leading-xlarge text-foreground text-balance">
          <span className="text-[var(--color-destructive)]">?</span> Why this
          workflow
        </h2>
        <p className="mt-6 text-regular leading-regular text-foreground text-pretty">
          Each AI tool in this pipeline was chosen for the narrow job it&apos;s
          good at: Figma for systematic design thinking, v0 for rapid
          prototyping with real tokens, Cursor for precision editing and
          improved code quality. None of it ran unsupervised: every handoff
          between tools was a checkpoint where I reviewed the output before it
          moved forward. The result is a process that&apos;s fast where AI is
          fast, and careful where judgment still matters. Carbon and silicon
          working together in harmony...
        </p>
      </section>
    </div>
  )
}
