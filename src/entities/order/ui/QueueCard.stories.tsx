import type { Meta, StoryObj } from '@storybook/react-vite'
import { QueueCard } from './QueueCard'

const meta = {
  component: QueueCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof QueueCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    headline: '조금만 기다려주세요,',
    headlineAccent: '곧 결제 페이지로 이동합니다.',
    productName: 'NOVA Phone 256GB · 미드나이트',
    myOrderNumber: '128',
    progressPercent: 45,
    totalWaitingCount: '284',
  },
}

export const Complete: Story = {
  args: { ...Default.args, progressPercent: 100, myOrderNumber: '1' },
}
