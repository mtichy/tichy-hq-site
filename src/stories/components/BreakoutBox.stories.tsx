import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { ReactNode } from 'react'
import { BreakoutBox } from '@/components/breakout-box'

const thankAThonItems = [
  {
    label: 'Role',
    value: 'Designer and product owner; also led the technical team',
  },
  {
    label: 'Team',
    value:
      'Global Internal Comms along with just under 150 technical and engineering colleagues from Tech Ecosystem',
  },
  {
    label: 'Skills',
    value:
      'Product design, design systems, front-end, analytics, program delivery',
  },
] as const

const thankAThonHighlights = [
  {
    label: 'Participation',
    value: (
      <>
        <strong className="font-bold">75,000+ thank-you notes</strong> in the
        2025 run from a firm of{' '}
        <strong className="font-bold">45,000 people</strong>
      </>
    ),
  },
  {
    label: 'Reliability',
    value: 'Record-high engagement with record-low support tickets',
  },
  {
    label: 'Recognition',
    value: (
      <>
        Publicly cited by McKinsey as one of five practices behind its{' '}
        <strong className="font-bold">2025 Best Employers Award</strong> for
        well-being
      </>
    ),
  },
  {
    label: 'Longevity',
    value: 'An annual firm tradition since 2018',
  },
]

const fetchItems = [
  {
    label: 'Role',
    value:
      'Conceived, designed and built it independently with AI-powered workflow',
  },
  {
    label: 'Team',
    value: 'Solo build; later adopted by an internal AI hackathon team',
  },
  {
    label: 'Skills',
    value: 'AI product design, data visualization, prototyping, front-end',
  },
] as const

const publishingAdminItems = [
  {
    label: 'Role',
    value: 'Lead designer for the publishing and configuration surfaces',
  },
  {
    label: 'Team',
    value:
      'Global Internal Comms editors, designers and producers who worked in the platforms, Tech Ecosystem for execution',
  },
  {
    label: 'Skills',
    value:
      'Information architecture, design systems, permissions modelling, Drupal, governance',
  },
] as const

const publishingAdminHighlights = [
  {
    label: 'Adoption',
    value: (
      <>
        <strong className="font-bold">
          100+ editors, designers and producers
        </strong>{' '}
        working in the platforms, across combined products in 60 countries
      </>
    ),
  },
  {
    label: 'Governance',
    value:
      "A core team of about 10–20 contributing components and reviewing each other's work, from the beginning",
  },
  {
    label: 'Consolidation',
    value: (
      <>
        <strong className="font-bold">Sprawl and redundancy reversed</strong> by
        a design system, a dynamic library and regular checkpoints, without
        adding another approval gate
      </>
    ),
  },
]

function Frame({
  children,
  className = 'max-w-[808px]',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

const meta = {
  title: 'Components/BreakoutBox',
  component: BreakoutBox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Static At a glance callout. Pass `highlights` for two columns at full article width (808px). Omit `highlights` for a single column capped at 65ch. Divider is vertical from md and horizontal when stacked. Use the toolbar for light/dark.',
      },
    },
  },
  args: {
    items: thankAThonItems,
    highlights: thankAThonHighlights,
  },
} satisfies Meta<typeof BreakoutBox>

export default meta
type Story = StoryObj<typeof meta>

export const TwoColumn: Story = {
  name: 'Two column (Thank-a-thon)',
  parameters: {
    docs: {
      description: {
        story:
          'Role/Team/Skills plus highlights. Full width of the 808px article shell.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
}

export const SingleColumn: Story = {
  name: 'Single column (Fetch)',
  args: {
    items: fetchItems,
    highlights: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'No `highlights`: one facts column, max-width 65ch (body measure), even inside the 808px article shell.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
}

export const PublishingAdmin: Story = {
  name: 'Two column (Publishing admin)',
  args: {
    items: publishingAdminItems,
    highlights: publishingAdminHighlights,
  },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
}

export const Narrow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Phone-width column: two-column layout stacks and the divider turns horizontal.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Frame className="max-w-[24rem]">
        <Story />
      </Frame>
    ),
  ],
}

export const Light: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Forced light tokens on this canvas (toolbar may still be dark). Elevation uses the light rest opacity.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="light min-h-[28rem] bg-background p-6">
        <Frame>
          <Story />
        </Frame>
      </div>
    ),
  ],
}

export const Dark: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Forced dark tokens on this canvas. Elevation uses the darker rest opacity from globals.css.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark min-h-[28rem] bg-background p-6">
        <Frame>
          <Story />
        </Frame>
      </div>
    ),
  ],
}
