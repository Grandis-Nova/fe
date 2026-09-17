import { ProductServiceSelector } from './ProductServiceSelector'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ProductServiceSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof ProductServiceSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [{ label: '가입', selected: true }, { label: '가입 안 함' }],
  },
}
