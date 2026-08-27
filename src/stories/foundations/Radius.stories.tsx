import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FoundationPage } from '../FoundationPage'

const radii = [
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'xl', className: 'rounded-xl' },
  { name: '2xl', className: 'rounded-2xl' },
  { name: '3xl', className: 'rounded-3xl' },
  { name: '4xl', className: 'rounded-4xl' },
] as const

function Radius() {
  return (
    <FoundationPage
      title="Radius"
      description="Derived from --radius (0.625rem). Cards and nav use rounded-md; keep new chrome on this scale."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {radii.map((radius) => (
          <div key={radius.name} className="flex flex-col gap-2">
            <div
              className={`h-24 w-full border border-border bg-card ${radius.className}`}
            />
            <p className="text-small leading-small font-medium text-foreground">
              {radius.name}
            </p>
          </div>
        ))}
      </div>
    </FoundationPage>
  )
}

const meta = {
  title: 'Foundations/Radius',
  component: Radius,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Radius>

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}
