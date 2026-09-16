import type { Meta, StoryObj } from '@storybook/react-vite'
import { CategoryNav } from './CategoryNav'

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
