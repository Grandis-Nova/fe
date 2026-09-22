import { Container } from './Container'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Container,
  tags: ['ai-generated'],
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Container content',
  },
}
