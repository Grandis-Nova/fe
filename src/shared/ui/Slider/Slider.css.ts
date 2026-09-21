import { style } from '@vanilla-extract/css'

import { color, spacing } from '@/shared/config/theme'

export const root = style({
  position: 'relative',
})

export const viewport = style({
  overflow: 'hidden',
})

export const container = style({
  display: 'flex',
})

export const slide = style({
  flex: '0 0 100%',
  minWidth: 0,
})

export const indicators = style({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  gap: spacing[8],
  bottom: spacing[12],
})

export const indicator = style({
  width: '6px',
  height: '6px',
  padding: 0,
  border: 'none',
  borderRadius: '9999px',
  background: color.border.default,
  cursor: 'pointer',
  selectors: {
    '&[data-active="true"]': {
      background: color.border.hover,
    },
  },
})
