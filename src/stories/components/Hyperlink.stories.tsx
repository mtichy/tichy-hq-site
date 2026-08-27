import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Hyperlink, controlButtonClassName } from '@/components/hyperlink'

const meta = {
  title: 'Components/Hyperlink',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Brand interaction: lime fill, 4px magenta underline reserved so hover never shifts layout. Lime is fill only — never text color.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  render: () => (
    <p className="max-w-prose font-sans text-regular leading-regular text-foreground">
      Inline links keep layout stable: the magenta underline sits in reserved
      space, then a lime fill covers the text on hover.{' '}
      <Hyperlink href="/resume">See the résumé</Hyperlink>
      {' — never lime as text color.'}
    </p>
  ),
}

export const ControlButton: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" className={controlButtonClassName}>
          Control
        </button>
        <button type="button" className={controlButtonClassName} disabled>
          Disabled
        </button>
      </div>
      <p className="max-w-prose font-sans text-small leading-small text-muted-foreground">
        Same hover contract as Hyperlink via{' '}
        <code className="font-mono text-small text-foreground">
          controlButtonClassName
        </code>
        : lime fill, 4px magenta underline, no layout shift. Used for in-page
        controls (Fetch role toggle, card CTAs).
      </p>
    </div>
  ),
}
