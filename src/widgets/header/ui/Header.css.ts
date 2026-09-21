import { style } from '@vanilla-extract/css'

import { motion, typography } from '@/shared/config/theme'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { maxWidth } from '@/shared/config/theme/tokens/container'
import { spacing } from '@/shared/config/theme/tokens/spacing'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: maxWidth.content,
  height: '70px',
  margin: '0 auto',
  padding: `${spacing[20]} ${spacing[20]} ${spacing[8]}`,
  background: color.background.base,
})

export const logo = style([
  typography.logo.wordmark,
  {
    height: 'fit-content',
    color: color.primary.base,
    textDecoration: 'none',
  },
])

export const logoMember = style({
  backgroundImage: `linear-gradient(90deg, ${color.primary.focus}, #55428c, ${color.secondary.subtle})`,
  backgroundClip: 'text',
  color: 'transparent',
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[20],
})

export const iconButton = style({
  display: 'inline-flex',
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  color: color.primary.base,
  transition: `color ${motion.duration.fast} ${motion.easing.default}`,
  selectors: {
    '&:hover': {
      color: color.primary.focus,
    },
  },
})

export const icon = style({
  width: '24px',
  height: '24px',
})
