import { style } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[24],
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[16],
})

export const title = style([
  typography.title.xlSemibold,
  { color: color.text.primary },
])

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: spacing[12],
})

export const controls = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
})

export const searchBox = style({
  width: '240px',
})

export const rowLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing[4],
  border: 'none',
  borderRadius: '6px',
  background: 'transparent',
  color: color.text.tertiary,
  cursor: 'pointer',
  transition: [
    `background ${motion.duration.fast} ${motion.easing.default}`,
    `color ${motion.duration.fast} ${motion.easing.default}`,
  ].join(', '),
  selectors: {
    '&:hover': {
      background: color.background.subSurface,
      color: color.primary.base,
    },
  },
})

export const rowLinkIcon = style({
  width: '18px',
  height: '18px',
})

export const productName = style([
  typography.body.subMedium,
  { color: color.text.primary },
])
