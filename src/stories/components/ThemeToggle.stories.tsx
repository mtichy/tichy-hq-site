import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ThemeToggle } from '@/components/theme-toggle'

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Preview wraps stories in next-themes ThemeProvider (class on html). Click to switch light/dark; also works with the Storybook dark-mode toolbar.',
      },
    },
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose font-sans text-small leading-small text-muted-foreground">
        Icon renders after mount to avoid hydration mismatch. Use the button or
        the toolbar sun/moon to check both schemes.
      </p>
      <div className="flex h-[var(--site-nav-height)] items-center border-t-2 border-t-[var(--color-brand-cyan)] bg-background px-6">
        <ThemeToggle />
      </div>
    </div>
  ),
}
