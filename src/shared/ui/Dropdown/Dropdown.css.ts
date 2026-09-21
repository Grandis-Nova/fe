import { style, styleVariants } from '@vanilla-extract/css'

import { color, spacing, typography } from '@/shared/config/theme'

export const root = style([
  typography.body.subMedium,
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: color.background.base,
    border: `1px solid ${color.border.default}`,
  },
])

export const rootOpen = style({
  borderColor: color.border.hover,
})

export const size = styleVariants({
  medium: { borderRadius: '8px' },
  small: { borderRadius: '6px' },
})

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: `${spacing[8]} ${spacing[10]} ${spacing[8]} ${spacing[16]}`,
  color: color.text.primary,
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  textAlign: 'left',
})

export const triggerIcon = style({
  width: '24px',
  height: '24px',
  flexShrink: 0,
  color: color.text.tertiary,
})

export const option = style([
  typography.body.sub,
  {
    display: 'flex',
    width: '100%',
    padding: `${spacing[8]} ${spacing[16]}`,
    color: color.text.secondary,
    background: color.background.subSurface,
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
  },
])

export const optionSelected = style({
  background: color.primary.surface,
  color: color.primary.base,
})
