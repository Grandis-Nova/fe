import { SelectButton } from './SelectButton'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: SelectButton,
  tags: ['ai-generated'],
} satisfies Meta<typeof SelectButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: '256GB', size: 'small', selected: false },
}

export const Selected: Story = {
  args: { children: '512GB', size: 'small', selected: true },
}

export const Medium: Story = {
  args: { children: 'AppleCare+ 포함', size: 'medium', selected: false },
}
