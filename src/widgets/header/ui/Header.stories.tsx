import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import { Header } from './Header'

const meta = {
  component: Header,
  tags: ['ai-generated'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Guest: Story = {
  args: { isMember: false, onSearchClick: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: '검색' }))
    await expect(args.onSearchClick).toHaveBeenCalledOnce()
  },
}

export const Member: Story = {
  args: { isMember: true },
}
