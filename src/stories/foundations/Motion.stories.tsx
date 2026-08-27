import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FoundationPage } from '../FoundationPage'

function Motion() {
  return (
    <FoundationPage
      title="Motion"
      description="Shared Card / NavLink motion: 200ms ease-out. Reduced motion drops the transition (motion-reduce:transition-none). Tokens are not extracted yet — this documents the live pattern."
    >
      <p className="text-small leading-small text-muted-foreground">
        Hover the sample. Underlay slides 4px; shadow goes rest → raised.
      </p>
      <div className="group relative isolate w-full max-w-[392px]">
        <div
          aria-hidden
          className="absolute top-0 right-0 bottom-1 left-1 z-0 rounded-md bg-brand-cyan transition-[translate,background-color] duration-200 ease-out motion-reduce:transition-none group-hover:-translate-x-1 group-hover:translate-y-1"
        />
        <div className="relative z-10 rounded-md bg-card p-6 text-card-foreground shadow-[var(--elevation-rest)] transition-shadow duration-200 ease-out motion-reduce:transition-none group-hover:shadow-[var(--elevation-raised)]">
          <p className="text-medium leading-medium font-bold">duration-200</p>
          <p className="mt-2 text-regular leading-regular text-muted-foreground">
            ease-out · 4px cyan underlay
          </p>
        </div>
      </div>
    </FoundationPage>
  )
}

const meta = {
  title: 'Foundations/Motion',
  component: Motion,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Motion>

export default meta
type Story = StoryObj<typeof meta>

export const CardUnderlay: Story = {}
