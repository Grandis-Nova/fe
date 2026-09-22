import { style } from '@vanilla-extract/css'

import { color, spacing, typography } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
  padding: spacing[16],
  borderRadius: '16px',
  border: `1px solid ${color.border.default}`,
  background: color.background.base,
})

export const image = style({
  width: '64px',
  height: '64px',
  borderRadius: '12px',
  objectFit: 'cover',
  flexShrink: 0,
  background: color.background.surface,
})

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  flex: 1,
})

export const name = style({ color: color.text.primary })
export const option = style({ color: color.text.tertiary })
export const price = style({ color: color.text.primary })

export const remove = style([
  typography.body.caption,
  {
    flexShrink: 0,
    border: 'none',
    background: 'transparent',
    color: color.text.tertiary,
    cursor: 'pointer',
  },
])
