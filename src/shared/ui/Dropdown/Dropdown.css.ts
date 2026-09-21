import { keyframes, style, styleVariants } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'

const optionEnter = keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const root = style([
  typography.body.subMedium,
  {
    display: 'flex',
    flexDirection: 'column',
    background: color.background.base,
    border: `1px solid ${color.border.default}`,
    overflow: 'hidden',
    transition: `border-color ${motion.duration.fast} ${motion.easing.default}`,
  },
])

export const rootOpen = style({
  borderColor: color.border.hover,
})

export const size = styleVariants({
  medium: { width: '100%', borderRadius: '12px' },
  small: { width: 'fit-content', borderRadius: '6px' },
})

export const trigger = styleVariants({
  medium: [
    typography.body.subMedium,
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: `${spacing[8]} ${spacing[10]} ${spacing[8]} ${spacing[16]}`,
      color: color.primary.focus,
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      textAlign: 'left',
    },
  ],
  small: [
    typography.body.subMedium,
    {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      gap: '5px',
      padding: '5px 5px 5px 10px',
      color: color.primary.focus,
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      textAlign: 'left',
    },
  ],
})

export const triggerIcon = styleVariants({
  medium: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    color: color.text.tertiary,
  },
  small: {
    width: '18px',
    height: '18px',
    flexShrink: 0,
    color: color.text.tertiary,
  },
})

export const option = styleVariants({
  medium: [
    typography.body.sub,
    {
      display: 'flex',
      width: '100%',
      padding: `${spacing[8]} ${spacing[16]}`,
      color: color.text.secondary,
      background: color.background.base,
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      animation: `${optionEnter} ${motion.duration.fast} ${motion.easing.default}`,
      selectors: {
        '&:hover': {
          background: color.background.subSurface,
        },
      },
    },
  ],
  small: [
    typography.body.sub,
    {
      display: 'flex',
      width: '100%',
      padding: '5px 5px 5px 10px',
      color: color.text.secondary,
      background: color.background.base,
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      animation: `${optionEnter} ${motion.duration.fast} ${motion.easing.default}`,
      selectors: {
        '&:hover': {
          background: color.background.subSurface,
        },
      },
    },
  ],
})

export const optionSelected = style({
  background: color.primary.surface,
  color: color.primary.base,
  selectors: {
    '&:hover': {
      background: color.primary.surface,
    },
  },
})
