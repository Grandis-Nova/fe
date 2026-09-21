import { expect, fn } from 'storybook/test'

import { Toggle } from './Toggle'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Toggle,
  tags: ['ai-generated'],
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {
  args: { checked: false, onChange: fn(), 'aria-label': '알림 받기' },
}

export const On: Story = {
  args: { checked: true, onChange: fn(), 'aria-label': '알림 받기' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('switch')).toBeChecked()
  },
}
