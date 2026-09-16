import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: '이름' },
}

export const Small: Story = {
  args: { label: '검색어', size: 'small' },
}

export const WithError: Story = {
  args: { label: '휴대폰 번호', error: '숫자만 입력해주세요.' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('숫자만 입력해주세요.')).toBeVisible()
  },
}
