import { expect, fn } from 'storybook/test';

import { MypageMenu } from './MypageMenu';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  component: MypageMenu,
  tags: ['ai-generated'],
} satisfies Meta<typeof MypageMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShoppingSectionActive: Story = {
  args: { userName: '기매진', activeLink: 'preorder-check', onLinkClick: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: '사전 예약 확인' }),
    );
    await expect(args.onLinkClick).toHaveBeenCalledOnce();
    await expect(args.onLinkClick).toHaveBeenCalledWith('preorder-check');
  },
};

export const AccountSectionActive: Story = {
  args: { userName: '기매진', activeLink: 'address-manage' },
};
