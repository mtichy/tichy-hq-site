import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FoundationPage } from '../FoundationPage'

const sizes = [
  { name: 'small', className: 'text-small leading-small' },
  { name: 'regular', className: 'text-regular leading-regular' },
  { name: 'medium', className: 'text-medium leading-medium' },
  { name: 'large', className: 'text-large leading-large' },
  { name: 'xlarge', className: 'text-xlarge leading-xlarge' },
  { name: 'mega', className: 'text-mega leading-mega' },
] as const

const weights = [
  { name: 'light (300)', className: 'font-light' },
  { name: 'normal (400)', className: 'font-normal' },
  { name: 'medium (500)', className: 'font-medium' },
  { name: 'bold (700)', className: 'font-bold' },
] as const

function Typography() {
  return (
    <FoundationPage
      title="Typography"
      description="Quicksand, 1.333 modular scale. These line-heights are for splash pages — not long-form articles. Body copy on the site uses regular + leading-regular."
    >
      <section className="flex flex-col gap-6">
        <h2 className="text-medium leading-medium font-medium text-foreground">
          Scale
        </h2>
        <ul className="flex list-none flex-col gap-6 p-0">
          {sizes.map((size) => (
            <li key={size.name} className="border-b border-border pb-4">
              <p className="mb-1 text-small leading-small text-muted-foreground">
                {size.name}
              </p>
              <p className={`${size.className} font-bold text-foreground`}>
                The quick brown fox
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-medium leading-medium font-medium text-foreground">
          Weights
        </h2>
        <ul className="flex list-none flex-col gap-3 p-0">
          {weights.map((weight) => (
            <li key={weight.name}>
              <p
                className={`text-regular leading-regular text-foreground ${weight.className}`}
              >
                {weight.name} — Design digital products and the systems that
                power them.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </FoundationPage>
  )
}

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}
