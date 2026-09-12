import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FoundationPage } from '../FoundationPage'

function FamilyCard({
  name,
  shell,
  stack,
  routes,
}: {
  name: string
  shell: string
  stack: string
  routes: string
}) {
  return (
    <article className="flex flex-col gap-3 rounded-md border border-border bg-muted p-6">
      <h3 className="text-regular leading-regular font-medium text-foreground">
        {name}
      </h3>
      <dl className="flex flex-col gap-3 text-small leading-small">
        <div className="flex flex-col gap-1">
          <dt className="font-bold text-foreground">Shell</dt>
          <dd className="font-mono text-muted-foreground">{shell}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-bold text-foreground">Inner stack</dt>
          <dd className="font-mono text-muted-foreground">{stack}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-bold text-foreground">Use on</dt>
          <dd className="text-muted-foreground">{routes}</dd>
        </div>
      </dl>
    </article>
  )
}

function Layout() {
  return (
    <FoundationPage
      title="Layout / grid"
      description="Content max-width 1224px (--breakpoint-content), gutter 24px (--spacing-gutter / px-6), column 80px (--spacing-column). Vertical page padding snaps to 64px (16) and 80px (column). Page chrome uses max-w-[var(--breakpoint-content)] and px-6."
    >
      <section className="flex flex-col gap-3">
        <h2 className="text-medium leading-medium font-medium text-foreground">
          Content width
        </h2>
        <div className="w-full max-w-[var(--breakpoint-content)] border border-dashed border-border bg-muted px-gutter py-4">
          <p className="text-small leading-small text-foreground">
            max-w-[var(--breakpoint-content)] (1224px) with px-gutter (24px)
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-medium leading-medium font-medium text-foreground">
          Column unit
        </h2>
        <div className="flex flex-wrap gap-gutter">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-16 w-column bg-brand-cyan/40"
              title="80px column"
            />
          ))}
        </div>
        <p className="text-small leading-small text-muted-foreground">
          w-column is 80px; gap-gutter is 24px between units. 3 columns = 288px
          (sidebars), 6 = 600px (résumé / home bio), 8 = 808px (articles).
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-medium leading-medium font-medium text-foreground">
          Vertical scale
        </h2>
        <div className="flex flex-wrap items-end gap-gutter">
          <div className="flex flex-col gap-2">
            <div className="w-column bg-brand-cyan/40" style={{ height: 64 }} />
            <p className="text-small leading-small text-muted-foreground">
              64px · py-16
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-column w-column bg-brand-cyan/40" />
            <p className="text-small leading-small text-muted-foreground">
              80px · py-column
            </p>
          </div>
        </div>
        <p className="text-small leading-small text-muted-foreground">
          Larger verticals are multiples: pt-32 is 128px (64×2), pb-40 is 160px
          (80×2). Do not introduce one-off pixel padding on page chrome.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-medium leading-medium font-medium text-foreground">
            Page families
          </h2>
          <p className="text-small leading-small text-muted-foreground">
            Pick one family and keep its shell and stack. Mixing them (for
            example article py-16 with tool-lab pt-8) is how new pages drift.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FamilyCard
            name="Marketing"
            shell="px-6, 1224 canvas. Hero py-16 / lg:pb-column. Journey pt-16 pb-40 / lg:pt-32. Footer py-column."
            stack="gap-16 hero; space-y-6 journey; footer gap-6"
            routes="Home (/)"
          />
          <FamilyCard
            name="Article / listing"
            shell="px-6 py-16, 1224 → 808px article. Type at max-w-[65ch]."
            stack="article gap-8, content gap-16, section gap-6"
            routes="Builds, case studies, résumé, Motion Studies, 404"
          />
          <FamilyCard
            name="Tool lab"
            shell="px-6, pt-8 pb-4/6, full 1224 canvas (no 808 column)"
            stack="gap-4 chrome, lg:gap-12 rail, 288px controls"
            routes="Orbital, Pixelator, (Un)Commonplace. Chess coach is this family with a denser py-8."
          />
        </div>
      </section>
    </FoundationPage>
  )
}

const meta = {
  title: 'Foundations/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {}
