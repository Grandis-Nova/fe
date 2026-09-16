import type { Meta, StoryObj } from '@storybook/react-vite'
import { MypageMenu } from './MypageMenu'

const meta = {
  component: MypageMenu,
  tags: ['ai-generated'],
} satisfies Meta<typeof MypageMenu>

export default meta
type Story = StoryObj<typeof meta>

export const ShoppingSectionActive: Story = {
  args: { userName: '주현', activeLink: 'history' },
}

export const AccountSectionActive: Story = {
  args: { userName: '주현', activeLink: 'alert-setting' },
}
