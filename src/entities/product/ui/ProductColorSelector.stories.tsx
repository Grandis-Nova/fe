import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductColorSelector } from './ProductColorSelector'

const meta = {
  component: ProductColorSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof ProductColorSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    colorName: '미드나이트',
    options: [
      { hex: '#1A1A1D', selected: true },
      { hex: '#F5F5F0' },
      { hex: '#3F4891' },
    ],
  },
}

export const NoSelection: Story = {
  args: {
    colorName: '색상을 선택해주세요',
    options: [{ hex: '#1A1A1D' }, { hex: '#F5F5F0' }, { hex: '#3F4891' }],
  },
}
