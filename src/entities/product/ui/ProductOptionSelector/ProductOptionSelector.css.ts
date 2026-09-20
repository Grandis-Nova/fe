import { style } from '@vanilla-extract/css'

import { color, spacing } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[10],
  width: '100%',
  padding: `${spacing[12]} 0`,
  background: 'transparent',
})

export const label = style({ color: color.text.primary })

export const optionRow = style({
  display: 'flex',
  gap: spacing[8],
  alignItems: 'center',
})
