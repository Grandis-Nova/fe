import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductOptionSelector } from './ProductOptionSelector'

const meta = {
  component: ProductOptionSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof ProductOptionSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '용량',
    options: [{ label: '128GB', selected: true }, { label: '256GB' }, { label: '512GB' }],
  },
}
