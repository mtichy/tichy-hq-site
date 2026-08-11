import { Hyperlink } from '@/components/hyperlink'

export function ResumeContent() {
  return (
    <div className="w-full max-w-[600px]">
      {/* Summary */}
      <section>
        <h2 className="text-medium font-bold leading-medium text-foreground">
          Summary
        </h2>
        <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          I design products and then build them. My work sits at the
          intersection of product UX, front-end engineering, design systems, and
          AI-native workflows, across consumer products at MTV Networks and
          enterprise platforms at McKinsey &amp; Company. I design in Figma and
          ship in React, using Claude, Cursor, and v0 to close the gap between
          design intent and production code rather than handing it off. I build
          design systems, component libraries, and token architecture that let
          teams move fast without losing coherence, and I turn ambiguous
          stakeholder needs into things that are usable, buildable, and
          maintainable.
        </p>
        <p className="mt-4 text-regular leading-regular text-foreground text-pretty">
          Selected case studies live on the{' '}
          <Hyperlink href="/builds" className="text-regular leading-regular">
            Builds
          </Hyperlink>{' '}
          page.
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

          <h4 className="mt-2 text-regular font-bold leading-regular text-foreground">
            UX Design &amp; Technical Lead (2017–2026)
          </h4>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
            <li>
              Designed, built, and managed a portfolio of 15+ digital products
              reaching 45,000 people globally, owning UX, user research,
              information architecture, content modeling, and front-end
              delivery. Included the global benefits platform, architected to
              scale across languages and regional legal requirements.
            </li>
            <li>
              Designed and shipped Thank-a-thon, an employee recognition
              platform generating tens of thousands of messages and 200,000+
              pageviews during a two-week annual run, owning UX, development
              coordination, QA, and round-the-clock launch support.
            </li>
            <li>
              Introduced and piloted AI-native prototyping and design-to-code
              workflows using Claude, Cursor, v0, and Figma Make, building
              working prototypes to validate concepts before engineering
              committed. Shipped internal microtools including a custom GPT
              agent trained on roughly 3,000 articles used to restructure site
              taxonomy, an editorial intelligence dashboard with a
              natural-language analytics interface, and a Jira ticket generator
              for non-technical teammates.
            </li>
            <li>
              Led jQuery-to-React component modernization across the product
              suite, building reusable template and component libraries with
              Figma and Storybook as the single source of truth, keeping fifteen
              products visually and behaviorally consistent.
            </li>
            <li>
              Owned analytics across the portfolio using Heap, Dynatrace, and
              custom dashboards, translating behavioral data into design
              decisions and building reporting consumed by senior leadership
              including the CEO.
            </li>
            <li>
              Partnered daily with engineering and product management on QA,
              sprint execution, and risk mitigation for high-stakes,
              high-traffic launches including the firm&apos;s Partner Elections,
              annual benefits enrollment, and global executive livestreams.
            </li>
            <li>
              Migrated the full product suite from external vendors to an
              internal engineering team with no loss of business continuity,
              importing product management and design-to-development practice.
            </li>
            <li>
              Led accessibility remediation across the product suite, including
              a full audit and dedicated improvement sprint on the recognition
              platform.
            </li>
            <li>
              Served as design and technical advisor to teams across the firm
              including publishing, alumni, benefits, engineering, and client
              service, covering AI search strategy, platform migration,
              analytics, CMS architecture, and component reuse.
            </li>
            <li>
              Introduced and onboarded Slack to our function nearly two years
              before firm-wide adoption, licensed and rolled out Monday across
              multiple functions, then brought on Notion which is now used
              firm-wide, including on client engagements. Modernizing my
              functions comms and project management is how &ldquo;Technical
              Lead&rdquo; was added to my title.
            </li>
            <li>
              Advanced through the firm&apos;s impact bands to Expert, one tier
              below Associate Partner.
            </li>
          </ul>

          <h4 className="mt-6 text-regular font-bold leading-regular text-foreground">
            Lead Interactive Designer (2014–2017)
          </h4>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
            <li>
              Redesigned and rebuilt the firm&apos;s flagship editorial channel
              from the ground up, establishing the design-to-development
              workflow that grew into the product suite I went on to lead.
              Sustained a 3x readership increase, with 95% of readers reporting
              trust in the publication and 71% reporting they tried something
              new at work based on what they read.
            </li>
            <li>
              Designed, built, and maintained a native mobile application (iOS
              and Android) delivering the firm&apos;s flagship editorial
              channel, owning it end to end for two years. Designed mobile-first
              across the full product portfolio for the past decade.
            </li>
            <li>
              Hired and managed the development team that became a ten-year
              collaboration. Onboarded junior designers and engineers and moved
              the team&apos;s UX workflow from Photoshop to Sketch.
            </li>
            <li>
              Created interactive content, campaign systems, and editorial
              design for dozens of global initiatives.
            </li>
          </ul>
        </div>

        {/* MTV Networks / Viacom */}
        <div className="mt-10">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            MTV Networks / Viacom
          </h3>

          <h4 className="mt-2 text-regular font-bold leading-regular text-foreground">
            Producer, Designer, Writer (2007–2014)
          </h4>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
            <li>
              Designed, produced, and shipped consumer digital experiences
              across mtvU&apos;s web, social, and on-air properties,
              contributing to tentpole franchises including the MTV Movie
              Awards, Video Music Awards, and the O Music Awards.
            </li>
            <li>
              Conceived, designed, and built social-syndicated voting widgets
              that collected over 1.5 million votes, designed for one-tap
              participation by an audience with no incentive to work at it.
            </li>
            <li>
              Designed and built embeddable interactive flipbooks syndicated
              across award show and fan social properties, generating millions
              of impressions.
            </li>
            <li>
              Grew mtvU&apos;s Twitter presence organically to 30,000+ followers
              and owned editorial strategy across blog, television, and social.
            </li>
            <li>
              Managed the mtvU-Fulbright program blog in partnership with the
              U.S. Department of State and the Fulbright Foreign Scholarship
              Board.
            </li>
            <li>
              Nominated for two Daytime Emmy Awards for production work on
              mtvU&apos;s pro-social campaigns: &ldquo;Against Our Will&rdquo;
              anti-trafficking (2013) and &ldquo;InDebtEd&rdquo; financial
              education (2010).
            </li>
          </ul>
        </div>

        {/* Parsons School of Design */}
        <div className="mt-10">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            Parsons School of Design
          </h3>

          <h4 className="mt-2 text-regular font-bold leading-regular text-foreground">
            Adjunct Faculty (2006–2007)
          </h4>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-6 text-regular leading-regular text-foreground">
            <li>
              Taught Design &amp; Visuality, mentoring undergraduates in visual
              communication, digital practice, and critique, connecting design
              theory to technology.
            </li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-16">
        <h2 className="text-medium font-bold leading-medium text-foreground">
          Skills
        </h2>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            Core Strengths
          </h3>
          <p className="mt-2 text-regular leading-regular text-foreground text-pretty">
            Product Design &amp; UX Leadership | Design Systems, Component
            Libraries &amp; Design Tokens | AI-Native Prototyping &amp;
            Design-to-Code | Front-End Engineering | Native Mobile &amp;
            Responsive Web | User Research | Accessibility | Analytics-Informed
            Design | High-Traffic Launch Management | Cross-Functional
            Partnership | Mentorship
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            Design &amp; Prototyping
          </h3>
          <p className="mt-2 text-regular leading-regular text-foreground text-pretty">
            Figma, v0, Cursor, Lovable, Sketch, Photoshop, Illustrator, After
            Effects, Premiere
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            AI
          </h3>
          <p className="mt-2 text-regular leading-regular text-foreground text-pretty">
            Claude and Claude Code, ChatGPT and custom GPTs, Gemini, Perplexity,
            LLM and RAG prototypes, prompt and workflow design
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            Front-End
          </h3>
          <p className="mt-2 text-regular leading-regular text-foreground text-pretty">
            HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind,
            Storybook, Three.js / R3F, GSAP
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            Data
          </h3>
          <p className="mt-2 text-regular leading-regular text-foreground text-pretty">
            Heap, Dynatrace, Snowflake / SQL, Jira, Notion, Miro
          </p>
        </div>
      </section>

      {/* Recognition */}
      <section className="mt-16">
        <h2 className="text-medium font-bold leading-medium text-foreground">
          Recognition
        </h2>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            2013 Daytime Emmy Nominee, MTV &ldquo;Against Our Will&rdquo;
          </h3>
          <p className="mt-2 text-regular leading-regular text-foreground text-pretty">
            Outstanding New Approaches
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            2010 Daytime Emmy Nominee, MTV &ldquo;InDebtEd&rdquo;
          </h3>
          <p className="mt-2 text-regular leading-regular text-foreground text-pretty">
            New Approaches
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            2005 Fellowship, Skowhegan School of Painting &amp; Sculpture
          </h3>
        </div>
      </section>

      {/* Education */}
      <section className="mt-16">
        <h2 className="text-medium font-bold leading-medium text-foreground">
          Education
        </h2>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            MFA, Parsons School of Design
          </h3>
        </div>

        <div className="mt-6">
          <h3 className="text-regular font-bold leading-regular text-foreground">
            BFA, School of the Art Institute of Chicago, Art &amp; Technology
          </h3>
        </div>
      </section>
    </div>
  )
}
