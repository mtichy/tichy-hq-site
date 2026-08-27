import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FoundationPage } from '../FoundationPage'

function Layout() {
  return (
    <FoundationPage
      title="Layout / grid"
      description="Content max-width 1224px (--breakpoint-content), gutter 24px (--spacing-gutter / px-6), column 80px (--spacing-column). Page chrome uses max-w-[var(--breakpoint-content)] and px-6."
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
          w-column is 80px; gap-gutter is 24px between units.
        </p>
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
