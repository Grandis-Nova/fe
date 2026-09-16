import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { typography } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '70px',
  padding: '20px',
  background: color.background.base,
})

export const logo = style([
  typography.logo.wordmark,
  {
    color: color.primary.base,
    textDecoration: 'none',
  },
])

export const logoMember = style({
  backgroundImage: `linear-gradient(90deg, ${color.primary.hover}, #55428c, ${color.secondary.subtle})`,
  backgroundClip: 'text',
  color: 'transparent',
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
})

export const iconButton = style({
  display: 'inline-flex',
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
})

export const icon = style({
  width: '24px',
  height: '24px',
})
