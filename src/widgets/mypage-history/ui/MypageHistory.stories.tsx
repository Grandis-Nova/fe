import { expect } from 'storybook/test'

import { MypageHistory } from './MypageHistory'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: MypageHistory,
  tags: ['ai-generated'],
} satisfies Meta<typeof MypageHistory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('배송중')).toBeInTheDocument()
    await expect(canvas.getByText('상품 준비 중')).toBeInTheDocument()
    await expect(canvas.getByText('취소 완료')).toBeInTheDocument()
    await expect(canvas.getAllByText('배송 완료')).toHaveLength(2)
  },
}
