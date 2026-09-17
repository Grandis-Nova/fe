import { CategoryNav } from './CategoryNav'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: CategoryNav,
  tags: ['ai-generated'],
} satisfies Meta<typeof CategoryNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const ActiveLink: Story = {
  args: { activeLink: '구매후기' },
}

export const NoBorder: Story = {
  args: { showBorder: false },
}
