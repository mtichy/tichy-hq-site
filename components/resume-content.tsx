export function ResumeContent() {
  return (
    <div className="w-full max-w-[600px]">
      {/* Summary */}
      <section>
        <h2 className="text-medium font-bold leading-medium text-foreground">
          Summary
        </h2>
        <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          Design Technologist with 15+ years across McKinsey &amp; Company, MTV
          Networks, and Parsons School of Design, working at the intersection of
          UX, front-end engineering, design systems, and AI-powered workflows.
          Leads design and technical delivery for global platforms (benefits,
          intranet, employee engagement, leadership communications, and
          high-traffic events), turns ambiguous stakeholder needs into usable,
          buildable, and scalable products. Pairs design craft with hands-on
          engineering to modernize design-to-development workflows and ship
          reliably at scale.
        </p>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <h2 className="text-medium font-bold leading-medium text-foreground">
          Experience
        </h2>

        {/* McKinsey & Company */}
        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            McKinsey &amp; Company
          </h3>

          {/* UX Design & Technical Lead */}
          <h4 className="mt-2 text-regular font-bold leading-regular text-foreground">
            UX Design &amp; Technical Lead (2017–2026)
          </h4>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
            <li>
              <span className="font-bold">
                Designed, built, and managed a suite of 15+ products
              </span>{' '}
              across the Firm&apos;s Reach &amp; Engagement function; advanced
              through the Firm&apos;s impact bands to Expert, one tier below
              Associate Partner.
            </li>
            <li>
              Partnered with senior stakeholders and teams across the Firm —
              including client-service teams to problem-solve, ideate, and build
              custom solutions
            </li>
            <li>
              Led design and relaunch of McKinsey&apos;s global benefits platform
              (UX, information architecture, content model, rollout strategy),
              serving 45,000 global employees on infrastructure built to scale
              across languages and regional legal requirements.
            </li>
            <li>
              Designed, built, and managed the Firm&apos;s employee recognition
              platform (UX, development coordination, QA, round-the-clock
              support), generating 75K+ messages and 200K+ pageviews during its
              annual two-week run.
            </li>
            <li>
              Served as analytics point person across the product suite (Heap,
              Dynatrace, SQL), advising data-informed design decisions; piloted
              AI-native prototyping and design-to-code workflows (v0, Cursor,
              Figma).
            </li>
            <li>
              Modernized the function&apos;s tech stack ahead of the broader Firm
              — onboarding Sketch, then Figma, Heap, Brightcove, Slack, and
              Notion, several of which became Firm-wide standards, and drove team
              adoption each time.
            </li>
            <li>
              Led jQuery-to-React component modernization and built reusable
              component libraries, establishing Figma and Storybook as the single
              source of truth.
            </li>
            <li>
              Migrated entire product suite from external vendors to the internal
              engineering team with no loss of business continuity, importing
              product-management and design-to-dev handoff practices.
            </li>
            <li>
              Partnered with engineers and product managers on QA, sprint
              execution, and risk mitigation for high-traffic launches including
              the firm&apos;s Partner Elections, annual benefits open enrollment,
              and gloabl executive livestreams.
            </li>
            <li>
              Led Drupal-to-SharePoint migrations and Box-to-SharePoint
              migrations for multiple functions, enabling non-technical teams to
              self-manage content.
            </li>
          </ul>

          {/* Lead Interactive Designer */}
          <h4 className="mt-6 text-regular font-bold leading-regular text-foreground">
            Lead Interactive Designer (2014–2017)
          </h4>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
            <li>
              Set and executed design and product strategy for McKinsey&apos;s
              internal communications function in partnership with the Global
              Director of MD and Internal Communications, supporting the
              CEO&apos;s agenda to reshape and grow the Firm.
            </li>
            <li>
              Redesigned and built the Firm&apos;s flagship internal
              communications channel, laying the design-and-build foundation that
              grew into the product suite I went on to lead.
              <ul className="mt-2 flex list-disc flex-col gap-2 pl-6">
                <li>
                  Results: sustained 3x increase in readership; 95% of readers
                  reported trusting the publication; 71% reported trying
                  something new at work based on what they read.
                </li>
              </ul>
            </li>
            <li>
              Modernized the function&apos;s video and analytics infrastructure
              and modernized the team&apos;s UX workflow moving to Sketch
            </li>
            <li>
              Hired a development team that we successfully collaborated with for
              10-years
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
