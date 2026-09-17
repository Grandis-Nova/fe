import placeholderImage from '@/shared/assets/react.svg'

import { ReviewCard } from './ReviewCard'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ReviewCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof ReviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    thumbnailSrc: placeholderImage,
    rating: 5,
    reviewText: '배송도 빠르고 만족스러운 구매였습니다.',
    productName: 'NOVA Phone 256GB',
    maskedAuthorName: 'juhy****',
    date: '2026.09.10',
  },
}

export const NoThumbnail: Story = {
  args: {
    rating: 3,
    reviewText: '가격 대비 무난합니다.',
    productName: 'NOVA Phone 512GB',
    maskedAuthorName: 'nova****',
    date: '2026.08.02',
  },
}
