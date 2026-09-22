import { expect } from 'storybook/test'

import { MypageCart } from './MypageCart'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: MypageCart,
  tags: ['ai-generated'],
} satisfies Meta<typeof MypageCart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('아이폰 18 Pro')).toBeInTheDocument()
  },
}
