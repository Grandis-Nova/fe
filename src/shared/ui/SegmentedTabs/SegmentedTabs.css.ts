import { style, styleVariants } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'

export const root = style({
  display: 'inline-flex',
  gap: spacing[4],
  padding: spacing[4],
  borderRadius: '10px',
  background: color.background.subSurface,
})

const tabBase = style([
  typography.body.subMedium,
  {
    padding: `${spacing[8]} ${spacing[14]}`,
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    color: color.text.tertiary,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: [
      `background ${motion.duration.fast} ${motion.easing.default}`,
      `color ${motion.duration.fast} ${motion.easing.default}`,
    ].join(', '),
    selectors: {
      '&:hover': { color: color.text.secondary },
    },
  },
])

export const tab = styleVariants({
  active: [
    tabBase,
    {
      background: color.background.base,
      color: color.primary.base,
      boxShadow: '0 1px 2px rgba(26, 26, 29, 0.08)',
      selectors: {
        '&:hover': { color: color.primary.base },
      },
    },
  ],
  inactive: [tabBase],
})
