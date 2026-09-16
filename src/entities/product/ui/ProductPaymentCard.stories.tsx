import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import placeholderImage from '@/shared/assets/react.svg'
import { ProductPaymentCard } from './ProductPaymentCard'

const meta = {
  component: ProductPaymentCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof ProductPaymentCard>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  imageSrc: placeholderImage,
  name: 'NOVA Phone',
  modelNumber: '256GB · 미드나이트',
  optionSummary: 'AppleCare+ 포함',
  quantityLabel: '수량 1개',
  priceLabel: '1,290,000원',
}

export const Default: Story = {
  args: { ...base, variant: 'default' },
}

export const PreorderPending: Story = {
  args: { ...base, variant: 'preorder-pending', actionLabel: '예약 대기중' },
}

export const Checkout: Story = {
  args: { ...base, variant: 'checkout', actionLabel: '결제하기', onActionClick: fn() },
  play: async ({ canvas, args }) => {
    await canvas.getByRole('button', { name: '결제하기' }).click()
    await expect(args.onActionClick).toHaveBeenCalledOnce()
  },
}

export const Cart: Story = {
  args: { ...base, variant: 'cart', checked: false, onCheckedChange: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('checkbox'))
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
  },
}
