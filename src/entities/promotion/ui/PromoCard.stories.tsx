import type { Meta, StoryObj } from '@storybook/react-vite'
import placeholderImage from '@/shared/assets/react.svg'
import { PromoCard } from './PromoCard'

const meta = {
  component: PromoCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof PromoCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    imageSrc: placeholderImage,
    title: 'NOVA Phone 사전예약 혜택',
    period: '2026.09.01 - 2026.09.30',
  },
}
