import { Button } from '../Button'

import * as BottomSheet from './index'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: BottomSheet.Root,
  tags: ['ai-generated'],
} satisfies Meta<typeof BottomSheet.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <BottomSheet.Root>
      <BottomSheet.Trigger asChild>
        <Button>바텀시트 열기</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <BottomSheet.Title>바텀시트 제목</BottomSheet.Title>
        <BottomSheet.Description>바텀시트 설명 텍스트</BottomSheet.Description>
      </BottomSheet.Content>
    </BottomSheet.Root>
  ),
}
