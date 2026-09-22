import { expect, waitFor } from 'storybook/test'

import { Input } from './Input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: { label: '이름' },
}

export const Focused: Story = {
  args: { label: '이름' },
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByRole('textbox')
    await userEvent.click(field)
    await expect(field).toHaveFocus()

    const label = canvas.getByText('이름')
    await waitFor(() => expect(label).toHaveStyle({ fontSize: '12px' }))
    await expect(label).toHaveStyle({ color: 'rgb(143, 143, 148)' }) // text.tertiary
  },
}

export const Filled: Story = {
  args: { label: '이름', defaultValue: '주현' },
  play: async ({ canvas }) => {
    const field = canvas.getByRole('textbox')
    await expect(field).toHaveValue('주현')
    await expect(field).toHaveStyle({ color: 'rgb(27, 32, 84)' }) // primary.focus

    const label = canvas.getByText('이름')
    await expect(label).toHaveStyle({ fontSize: '12px' })
  },
}

export const Required: Story = {
  args: { label: '이름', required: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('이름 *')).toBeVisible()
    await expect(canvas.getByRole('textbox')).toBeRequired()
  },
}

export const WithError: Story = {
  args: { label: '휴대폰 번호', error: '숫자만 입력해주세요.' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('숫자만 입력해주세요.')).toBeVisible()

    const label = canvas.getByText('휴대폰 번호')
    await expect(label).toHaveStyle({ color: 'rgb(220, 38, 38)' }) // status.danger

    const field = canvas.getByRole('textbox')
    await expect(field).toHaveStyle({ color: 'rgb(220, 38, 38)' })
  },
}

export const RequiredWithError: Story = {
  args: {
    label: '휴대폰 번호',
    required: true,
    error: '숫자만 입력해주세요.',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByText('휴대폰 번호 *')
    await expect(label).toBeVisible()
    await expect(label).toHaveStyle({ color: 'rgb(220, 38, 38)' })
    await expect(canvas.getByRole('textbox')).toBeRequired()
  },
}

export const Small: Story = {
  args: { label: '검색어', size: 'small', defaultValue: '노바폰' },
  play: async ({ canvas }) => {
    const field = canvas.getByRole('textbox')
    await expect(field).toHaveStyle({ fontSize: '14px' })

    const label = canvas.getByText('검색어')
    await expect(label).toHaveStyle({ fontSize: '9px' })
  },
}

export const SmallWithError: Story = {
  args: {
    label: '검색어',
    size: 'small',
    required: true,
    error: '2자 이상 입력해주세요.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('검색어 *')).toBeVisible()

    const errorText = canvas.getByText('2자 이상 입력해주세요.')
    await expect(errorText).toBeVisible()
    await expect(errorText).toHaveStyle({ fontSize: '10px' })
  },
}
