import { expect, fn } from 'storybook/test'

import { CartItemCard } from './CartItemCard'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: CartItemCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof CartItemCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    item: {
      id: '1',
      name: '아이폰 18 Pro',
      optionSummary: '실버 · 512GB',
      quantity: 1,
      priceLabel: '2,278,100원',
    },
    onRemove: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: '삭제' }))
    await expect(args.onRemove).toHaveBeenCalledWith('1')
  },
}
