import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ELEVATION } from '@/lib/elevation'

import { FoundationPage } from '../FoundationPage'

const levels = [
  {
    name: 'rest',
    shadow: 'shadow-[var(--elevation-rest)]',
    token: ELEVATION.rest,
  },
  {
    name: 'raised',
    shadow: 'shadow-[var(--elevation-raised)]',
    token: ELEVATION.raised,
  },
] as const

function Elevation() {
  return (
    <FoundationPage
      title="Elevation"
      description="Card shadows from Figma Component/Card. CSS variables stay in sync with lib/elevation.ts so the 3D labs use the same rest/raised steps."
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {levels.map((level) => (
          <div
            key={level.name}
            className={`rounded-md bg-card p-6 text-card-foreground ${level.shadow}`}
          >
            <p className="text-medium leading-medium font-bold">{level.name}</p>
            <p className="mt-2 text-small leading-small text-muted-foreground">
              {level.token.offsetY}px / {level.token.blur}px blur · light{' '}
              {level.token.opacityLight} / dark {level.token.opacityDark}
            </p>
          </div>
        ))}
      </div>
    </FoundationPage>
  )
}

const meta = {
  title: 'Foundations/Elevation',
  component: Elevation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Elevation>

export default meta
type Story = StoryObj<typeof meta>

export const RestAndRaised: Story = {}
