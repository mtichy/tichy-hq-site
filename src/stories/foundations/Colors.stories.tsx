import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FoundationPage } from '../FoundationPage'

type Swatch = {
  name: string
  className: string
}

const primitives: Swatch[] = [
  { name: 'neutral-black', className: 'bg-neutral-black' },
  { name: 'neutral-white', className: 'bg-neutral-white' },
  { name: 'neutral-gray', className: 'bg-neutral-gray' },
  { name: 'neutral-ink-muted', className: 'bg-neutral-ink-muted' },
  { name: 'brand-cyan', className: 'bg-brand-cyan' },
  { name: 'brand-cyan-strong', className: 'bg-brand-cyan-strong' },
  { name: 'brand-magenta', className: 'bg-brand-magenta' },
  { name: 'brand-magenta-strong', className: 'bg-brand-magenta-strong' },
  { name: 'brand-lime', className: 'bg-brand-lime' },
  { name: 'surface-page', className: 'bg-surface-page' },
  { name: 'surface-muted-light', className: 'bg-surface-muted-light' },
  { name: 'surface-border-light', className: 'bg-surface-border-light' },
  { name: 'surface-bg-dark', className: 'bg-surface-bg-dark' },
  { name: 'surface-muted-dark', className: 'bg-surface-muted-dark' },
  { name: 'surface-card-dark', className: 'bg-surface-card-dark' },
  { name: 'surface-fg-dark', className: 'bg-surface-fg-dark' },
  { name: 'surface-border-dark', className: 'bg-surface-border-dark' },
  {
    name: 'status-destructive-light',
    className: 'bg-status-destructive-light',
  },
  { name: 'status-destructive-dark', className: 'bg-status-destructive-dark' },
]

const semantic: Swatch[] = [
  { name: 'background', className: 'bg-background' },
  { name: 'foreground', className: 'bg-foreground' },
  { name: 'card', className: 'bg-card' },
  { name: 'card-foreground', className: 'bg-card-foreground' },
  { name: 'popover', className: 'bg-popover' },
  { name: 'muted', className: 'bg-muted' },
  { name: 'muted-foreground', className: 'bg-muted-foreground' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'primary', className: 'bg-primary' },
  { name: 'secondary', className: 'bg-secondary' },
  { name: 'destructive', className: 'bg-destructive' },
  { name: 'border', className: 'bg-border' },
  { name: 'input', className: 'bg-input' },
  { name: 'ring', className: 'bg-ring' },
  { name: 'link', className: 'bg-link' },
]

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.name} className="flex flex-col gap-2">
          <div
            className={`h-20 w-full rounded-lg border border-border ${item.className}`}
          />
          <p className="text-small leading-small font-medium text-foreground">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  )
}

function Colors() {
  return (
    <FoundationPage
      title="Colors"
      description="Primitive tokens from the theme, plus semantic colors that follow the light/dark toggle. Lime is a fill only — never text. Prefer semantic names in components."
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-medium leading-medium font-medium text-foreground">
          Primitives
        </h2>
        <SwatchGrid items={primitives} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-medium leading-medium font-medium text-foreground">
          Semantic
        </h2>
        <SwatchGrid items={semantic} />
      </section>
    </FoundationPage>
  )
}

const meta = {
  title: 'Foundations/Colors',
  component: Colors,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Colors>

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {}
