import { style } from '@vanilla-extract/css'

import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { spacing } from '@/shared/config/theme/tokens/spacing'
import { body, title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[10],
  width: '100%',
  padding: `${spacing[12]} 0`,
  background: color.background.base,
})

export const label = style([title.smMedium, { color: color.text.primary }])

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
})

export const colorName = style([body.subMedium, { color: color.text.tertiary }])

export const swatchRow = style({
  display: 'flex',
  gap: spacing[12],
  alignItems: 'center',
})

export const swatch = style({
  width: '22px',
  height: '22px',
  borderRadius: '9999px',
  border: `0.75px solid ${color.primary.hover}`,
  cursor: 'pointer',
})

export const swatchSelected = style({
  borderWidth: '2px',
})
