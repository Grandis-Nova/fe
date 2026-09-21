import { Banner } from './Banner'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Banner,
  tags: ['ai-generated'],
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
