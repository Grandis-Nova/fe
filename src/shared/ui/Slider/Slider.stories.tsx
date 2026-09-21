import { Slider } from './Slider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Slider,
  tags: ['ai-generated'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const slideStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '240px',
  background: '#E8E9F5',
  fontSize: '24px',
} as const

export const Default: Story = {
  args: {
    children: [1, 2, 3].map((n) => (
      <div key={n} style={slideStyle}>
        Slide {n}
      </div>
    )),
  },
}
