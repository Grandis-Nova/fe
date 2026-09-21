import { style } from '@vanilla-extract/css'

import { typography, color, spacing, lineClamp } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  minWidth: '230px',
  borderRadius: '8px',
  background: color.background.base,
  overflow: 'hidden',
  cursor: 'pointer',
})

export const image = style({
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '8px',
  objectFit: 'cover',
  background: color.background.surface,
})

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[10],
  width: '100%',
  padding: `${spacing[12]} ${spacing[8]}`,
})

export const title = style([
  typography.title.mdMedium,
  {
    color: color.text.primary,
    ...lineClamp(2),
  },
])

export const period = style([
  typography.body.sub,
  { color: color.text.tertiary },
])
