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
      'McKinsey Reach & Engagement along with just under 150 technical and engineering colleagues from Tech Ecosystem',
  },
  {
    label: 'Skills',
    value:
      'Product design, design systems, front-end, analytics, program delivery',
  },
] as const

const thankAThonHighlights = [
  'Publicly cited by McKinsey as one of five practices behind its 2025 Best Employers Award for well-being',
  '75,000+ thank-you notes in the 2025 run from a firm of 45,000 people, record-high engagement with record-low support tickets',
  '64,000 messages and 200,000+ pageviews in 2024',
  'An annual Firm tradition since 2018',
] as const

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
          'Static project highlights: raised card face with an At a glance header, facts on the left, and optional highlight copy on the right, split by a 1px divider (vertical from md, horizontal when stacked). Use the toolbar for light/dark.',
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

export const ThankAThon: Story = {
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
}

export const FactsOnly: Story = {
  args: {
    highlights: undefined,
  },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
}

export const LongCopy: Story = {
  args: {
    items: [
      {
        label: 'Role',
        value:
          'Designer and product owner; also led the technical team across research, platform modernization, and the annual firmwide relaunch.',
      },
      {
        label: 'Team',
        value:
          'McKinsey Reach & Engagement along with just under 150 technical and engineering colleagues from Tech Ecosystem, assembled each cycle to run the Wall of Gratitude and supporting notification loop.',
      },
      {
        label: 'Skills',
        value:
          'Product design, design systems, front-end, analytics, program delivery, and stakeholder facilitation with senior firm leadership.',
      },
    ],
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
          'Simulates a phone-width column so the two-column layout stacks.',
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
