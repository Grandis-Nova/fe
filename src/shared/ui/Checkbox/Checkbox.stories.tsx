import { expect, fn } from 'storybook/test'

import { Checkbox } from './Checkbox'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Checkbox,
  tags: ['ai-generated'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: { checked: false, onChange: fn(), 'aria-label': '전체 선택' },
}

export const Checked: Story = {
  args: { checked: true, onChange: fn(), 'aria-label': '전체 선택' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toBeChecked()
  },
}
