import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import placeholderImage from '@/shared/assets/react.svg'
import { HistoryCard } from './HistoryCard'

const meta = {
  component: HistoryCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof HistoryCard>

export default meta
type Story = StoryObj<typeof meta>

const item = {
  imageSrc: placeholderImage,
  name: 'NOVA Phone',
  modelNumber: '256GB · 미드나이트',
  optionSummary: 'AppleCare+ 포함',
  quantityLabel: '수량 1개',
  priceLabel: '1,290,000원',
}

const base = { orderDate: '2026.09.01', orderNumber: '20260901-000123', items: [item] }

export const DeliveredBeforeReview: Story = {
  args: { ...base, status: 'delivered-before-review' },
}

export const DeliveredAfterReview: Story = {
  args: { ...base, status: 'delivered-after-review' },
}

export const Shipping: Story = {
  args: { ...base, status: 'shipping' },
}

export const Preparing: Story = {
  args: { ...base, status: 'preparing' },
}

export const Cancelled: Story = {
  args: { ...base, status: 'cancelled' },
}

export const ExpandableItems: Story = {
  args: { ...base, status: 'shipping', items: [item, { ...item, name: 'NOVA Watch' }] },
  play: async ({ canvas }) => {
    const expandButton = canvas.getByRole('button', { name: /더 보기/ })
    await expandButton.click()
    await expect(canvas.getByText('NOVA Watch')).toBeVisible()
  },
}
