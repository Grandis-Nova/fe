import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  padding: '16px 20px',
  background: color.background.base,
  borderBottom: `1px solid ${color.primary.hover}`,
})

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
})

export const brands = style({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  fontSize: '18px',
  color: color.text.secondary,
})

export const divider = style({
  fontSize: '10px',
  color: color.border.default,
})

export const links = style({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  fontSize: '18px',
  color: color.text.secondary,
})

export const link = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
})

export const linkActive = style({
  fontWeight: 500,
  color: color.primary.base,
})
