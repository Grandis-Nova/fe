import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductServiceSelector } from './ProductServiceSelector'

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
