import { Box } from './Box'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Box,
  tags: ['ai-generated'],
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sx: { display: 'flex', gap: 8, padding: 16 },
    children: 'Box content',
  },
}
