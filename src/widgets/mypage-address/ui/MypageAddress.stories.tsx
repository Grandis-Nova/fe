import { expect } from 'storybook/test'

import { MypageAddress } from './MypageAddress'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: MypageAddress,
  tags: ['ai-generated'],
} satisfies Meta<typeof MypageAddress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('기본 배송지')).toBeInTheDocument()
  },
}
