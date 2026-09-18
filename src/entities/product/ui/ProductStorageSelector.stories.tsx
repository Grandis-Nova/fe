import { ProductStorageSelector } from './ProductStorageSelector'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ProductStorageSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof ProductStorageSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [{ label: '256GB', selected: true }, { label: '512GB' }, { label: '1TB' }],
  },
}
