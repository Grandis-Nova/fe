import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Navigator } from './Navigator'

const meta = {
  component: Navigator,
  tags: ['ai-generated'],
} satisfies Meta<typeof Navigator>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  args: { totalPages: 8, currentPage: 1 },
}

export const MiddlePage: Story = {
  args: { totalPages: 8, currentPage: 4 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '4' })).toHaveAttribute('aria-current', 'page')
  },
}

export const LastPage: Story = {
  args: { totalPages: 8, currentPage: 8 },
}
