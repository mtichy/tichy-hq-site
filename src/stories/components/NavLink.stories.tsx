import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NavLink } from '@/components/nav-link'

const meta = {
  title: 'Components/NavLink',
  component: NavLink,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Global variant: 1px blur with a reserved 6px transparent bar. Hover/focus: crisp + cyan bar. Selected: crisp + magenta bar (wins over hover). Filter variant: regular type, no default blur, same bars — used to filter the /builds mosaic.',
      },
    },
  },
  args: {
    href: '/resume',
    children: 'Résumé',
  },
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    selected: false,
  },
}

export const Hover: Story = {
  args: {
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover the link: blur clears and the reserved bar turns cyan.',
      },
    },
  },
}

export const Selected: Story = {
  args: {
    selected: true,
  },
}

export const Focus: Story = {
  args: {
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tab to the link for focus-visible: crisp type and cyan bar, no extra outline.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="font-sans text-small leading-small text-muted-foreground">
        Hover and keyboard-focus the links. Selected stays magenta and does not
        blur.
      </p>
      <nav className="flex flex-wrap items-center gap-8 bg-background">
        <NavLink href="/resume">Default</NavLink>
        <NavLink href="/builds" selected>
          Selected
        </NavLink>
        <NavLink href="/">Home</NavLink>
      </nav>
    </div>
  ),
}

export const Filter: Story = {
  args: {
    selected: false,
    variant: 'filter',
    children: 'Projects',
    href: '/builds',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regular size, no default blur. Hover still turns the reserved bar cyan.',
      },
    },
  },
}

export const FilterSelected: Story = {
  args: {
    selected: true,
    variant: 'filter',
    children: 'All',
    href: '/builds',
  },
}

export const FilterStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="font-sans text-small leading-small text-muted-foreground">
        Filter variant for the /builds mosaic. Regular type, no blur at rest.
      </p>
      <div className="flex flex-wrap items-center gap-8 bg-background">
        <NavLink href="/builds" variant="filter" selected>
          All
        </NavLink>
        <NavLink href="/builds" variant="filter">
          Projects
        </NavLink>
        <NavLink href="/builds" variant="filter">
          Labs
        </NavLink>
      </div>
    </div>
  ),
}
