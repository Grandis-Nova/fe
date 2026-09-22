import { style } from '@vanilla-extract/css'

import { color, spacing } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
  width: '100%',
  borderRadius: spacing[16],
  backgroundColor: color.background.surface,
  padding: spacing[24],
})
