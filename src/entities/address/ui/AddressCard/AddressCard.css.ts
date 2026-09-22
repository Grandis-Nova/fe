import { style } from '@vanilla-extract/css'

import { color, spacing, typography } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
  padding: spacing[16],
  borderRadius: '16px',
  border: `1px solid ${color.border.default}`,
  background: color.background.base,
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
})

export const label = style({ color: color.text.primary })

export const badge = style([
  typography.body.caption,
  {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `2px ${spacing[8]}`,
    borderRadius: '999px',
    background: color.primary.subtler,
    color: color.primary.base,
  },
])

export const recipient = style({ color: color.text.secondary })
export const fullAddress = style({ color: color.text.tertiary })

export const actionRow = style({
  display: 'flex',
  gap: spacing[12],
  marginTop: spacing[4],
})

export const action = style([
  typography.body.caption,
  {
    border: 'none',
    background: 'transparent',
    color: color.text.tertiary,
    cursor: 'pointer',
    padding: 0,
  },
])
