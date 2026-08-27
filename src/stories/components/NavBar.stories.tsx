import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NavBar } from '@/components/nav-bar'

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Composition of NavLink + ThemeToggle. `activePath` highlights Home / Résumé / Builds; omit it on lab routes so nothing is selected.',
      },
    },
  },
  argTypes: {
    activePath: {
      control: 'select',
      options: [undefined, '/', '/resume', '/builds'],
    },
  },
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {
  args: {
    activePath: '/',
  },
}

export const Resume: Story = {
  args: {
    activePath: '/resume',
  },
}

export const Builds: Story = {
  args: {
    activePath: '/builds',
  },
}

export const NoneSelected: Story = {
  args: {
    activePath: undefined,
  },
}
