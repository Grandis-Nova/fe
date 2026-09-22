import { PreorderModelSummary } from './PreorderModelSummary'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: PreorderModelSummary,
  tags: ['ai-generated'],
} satisfies Meta<typeof PreorderModelSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'IPhone 18 Pro',
    opensAtLabel: '오픈일 2026. 9. 25.',
    isOver: false,
    isAlert: false,
  },
}

export const Alerted: Story = {
  args: {
    ...Default.args,
    isAlert: true,
  },
}

export const Over: Story = {
  args: {
    ...Default.args,
    isOver: true,
  },
}
