import { style } from '@vanilla-extract/css'

import { color, spacing } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
  width: '100%',
})

export const card = style({
  boxSizing: 'border-box',
  width: '100%',
  padding: spacing[20],
  borderRadius: '12px',
  border: `1px solid ${color.border.default}`,
  background: color.background.base,
})
