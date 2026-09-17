import { ProductSummary } from './ProductSummary'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ProductSummary,
  tags: ['ai-generated'],
} satisfies Meta<typeof ProductSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'NOVA Phone 256GB 미드나이트',
    optionSummary: 'AppleCare+ 포함 · 수량 1개',
    ctaLabel: '구매하기',
  },
}
