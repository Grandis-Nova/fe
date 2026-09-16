import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Dropdown } from './Dropdown'

const meta = {
  component: Dropdown,
  tags: ['ai-generated'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const options = ['서울특별시', '경기도', '부산광역시']

export const Closed: Story = {
  args: { label: '지역 선택', options, open: false },
}

export const Open: Story = {
  args: { label: '지역 선택', options, open: true, selectedOption: '경기도' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '지역 선택' })).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByText('부산광역시')).toBeVisible()
  },
}

export const Small: Story = {
  args: { label: '정렬', options, open: false, size: 'small' },
}
