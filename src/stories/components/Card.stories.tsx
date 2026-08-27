import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { ReactNode } from 'react'
import { Card } from '@/components/card'

const fetchImage = {
  src: '/images/builds-fetch.png',
  width: 760,
  height: 428,
} as const

const siteImage = {
  src: '/images/builds-how-i-built-this-site.png',
  width: 576,
  height: 576,
  unoptimized: true,
} as const

const thankImage = {
  src: '/images/builds-thank-a-thon.png',
  width: 760,
  height: 428,
} as const

function Frame({
  children,
  className = 'max-w-[400px]',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Flagship card: cyan underlay slides 4px on hover/focus, elevation rest → raised, magenta ring on focus-visible. Use the toolbar for light/dark.',
      },
    },
  },
  args: {
    href: '/builds',
    image: fetchImage,
    title: 'Fetch',
    description:
      'Role-aware GitHub analytics. Toggle IC vs manager without a layout jump.',
    tags: ['Product', 'AI'],
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const WithTags: Story = {
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
}

export const NoTags: Story = {
  args: {
    href: '/resume',
    image: siteImage,
    title: 'How I built this site',
    description:
      'A real design system as the foundation, AI on execution, and a person reviewing every step.',
    tags: undefined,
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
    href: '/resume',
    image: thankImage,
    title:
      'Employee recognition platform I designed that became a McKinsey tradition',
    description:
      'How to improve morale? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe.',
    tags: ['Design systems', 'Storybook', 'Tokens'],
  },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
}

export const Hover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Hover the card: cyan underlay translates 4px, shadow goes raised, CTA gets the magenta underline.',
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

export const Focus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tab onto the stretched link. Focus ring is magenta/cyan token (`ring`), offset against the page background.',
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

export const ReducedMotion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Simulates prefers-reduced-motion: transitions are forced off. Hover still changes underlay position, without the 200ms ease-out.',
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .sb-reduced-motion *,
          .sb-reduced-motion *::before,
          .sb-reduced-motion *::after {
            transition-duration: 0ms !important;
            animation-duration: 0ms !important;
            animation-iteration-count: 1 !important;
          }
        `}</style>
        <Frame>
          <div className="sb-reduced-motion">
            <Story />
          </div>
        </Frame>
      </>
    ),
  ],
}

export const Light: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wraps the card in `.light`, which redeclares semantic tokens (same block as `:root`). That resets surfaces and elevation even when `html` is `.dark` from the toolbar.',
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
          'Forced dark tokens on this canvas. Elevation uses the darker rest/raised opacities from globals.css.',
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

export const Mosaic: Story = {
  render: () => (
    <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
      <Card
        className="mb-8 max-w-none break-inside-avoid"
        title="How I built this site"
        description="The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step."
        image={{
          src: '/images/avatar-dark.png',
          width: 576,
          height: 576,
          unoptimized: true,
        }}
        href="/builds"
      />
      <Card
        className="mb-8 max-w-none break-inside-avoid"
        title="Employee recognition platform I designed that became a McKinsey tradition"
        description="How to improve morale? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe."
        image={{
          src: '/images/og.png',
          width: 1200,
          height: 630,
        }}
        href="/resume"
      />
      <Card
        className="mb-8 max-w-none break-inside-avoid"
        title="Fetch: An Editorial Intelligence Dashboard"
        description="An analytics tool centered on the content users are familiar with instead of just tons of charts."
        image={{
          src: '/images/avatar-333333.png',
          width: 576,
          height: 576,
          unoptimized: true,
        }}
        href="/"
      />
      <Card
        className="mb-8 max-w-none break-inside-avoid"
        title="Dream log"
        description="The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step."
        image={{
          src: '/images/avatar-dark.png',
          width: 576,
          height: 576,
          unoptimized: true,
        }}
        tags={['Personal', 'Writing']}
        href="/builds"
      />
      <Card
        className="mb-8 max-w-none break-inside-avoid"
        title="Chess Scoresheet Digitizer friend"
        description="How to improve morale? Make gratitude contagious with an annual week-long Thank-a-thon that generates tens of thousands of thank you messages and hundreds of thousands of page views across the globe."
        image={{
          src: '/images/og.png',
          width: 1200,
          height: 630,
        }}
        href="/resume"
      />
      <Card
        className="mb-8 max-w-none break-inside-avoid"
        title="Digital Commonplace Book"
        description="The short version: a real design system as the foundation, AI tools doing what they do well on execution, and a carbon-based life form reviewing and directing every step."
        image={{
          src: '/images/avatar-333333.png',
          width: 576,
          height: 576,
          unoptimized: true,
        }}
        tags={['Design Systems', 'React', 'Figma', 'Next.js']}
        href="/"
      />
    </div>
  ),
}
