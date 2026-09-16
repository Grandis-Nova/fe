import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta = {
  component: Tag,
  tags: ['ai-generated'],
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {
  args: { children: 'NEW', color: 'primary', variant: 'solid', shape: 'pill' },
}

export const Subtle: Story = {
  args: { children: '사전예약', color: 'primary', variant: 'subtle', shape: 'pill' },
}

export const Outline: Story = {
  args: { children: '한정수량', color: 'secondary', variant: 'outline', shape: 'pill' },
}

export const Rounded: Story = {
  args: { children: 'BEST', color: 'blue', variant: 'solid', shape: 'rounded' },
}

export const Success: Story = {
  args: { children: '배송완료', color: 'green', variant: 'subtle', shape: 'pill' },
}

export const Warning: Story = {
  args: { children: '품절임박', color: 'yellow', variant: 'subtle', shape: 'pill' },
}

export const Danger: Story = {
  args: { children: '품절', color: 'red', variant: 'subtle', shape: 'pill' },
}
