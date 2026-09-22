import { expect } from 'storybook/test'

import { MypagePreorder } from './MypagePreorder'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: MypagePreorder,
  tags: ['ai-generated'],
} satisfies Meta<typeof MypagePreorder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: '결제하기' }),
    ).toBeInTheDocument()
  },
}
