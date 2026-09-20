import placeholderImage from '@/shared/assets/react.svg'

import { ProductCard } from './ProductCard'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ProductCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

const colorSwatches = [
  { hex: '#1A1A1D', label: '미드나이트' },
  { hex: '#F5F5F0', label: '스타라이트' },
]

export const Default: Story = {
  args: {
    product: {
      imageSrc: placeholderImage,
      name: 'NOVA Phone',
      modelNumber: 'NV-2026',
      colorName: '미드나이트',
      colorSwatches,
      storageOptions: [{ label: '256GB', selected: true }, { label: '512GB' }],
      priceAmount: '1,290,000',
    },
  },
}

export const NoStorageSelected: Story = {
  args: {
    product: {
      ...Default.args.product,
      storageOptions: [{ label: '256GB' }, { label: '512GB' }],
    },
  },
}
