import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { body, title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  padding: '12px 0',
  background: color.background.base,
})

export const label = style([title.smMedium, { color: color.text.primary }])

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

export const colorName = style([body.subMedium, { color: color.text.tertiary }])

export const swatchRow = style({
  display: 'flex',
  gap: '12px',
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
