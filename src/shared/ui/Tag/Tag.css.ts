import { style, styleVariants } from '@vanilla-extract/css'

import { color, spacing, typography } from '@/shared/config/theme'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid transparent',
  whiteSpace: 'nowrap',
})

const size = styleVariants({
  small: [
    base,
    typography.body.captionMedium,
    { minWidth: '36px', fontSize: '10px' },
  ],
  medium: [base, typography.body.subMedium, { minWidth: '48px' }],
})

export const shape = {
  small: styleVariants({
    full: [
      size.small,
      { padding: `5px ${spacing[10]}`, borderRadius: '9999px' },
    ],
    rect: [size.small, { padding: `5px ${spacing[8]}`, borderRadius: '6px' }],
  }),
  medium: styleVariants({
    full: [
      size.medium,
      { padding: `8px ${spacing[12]}`, borderRadius: '9999px' },
    ],
    rect: [size.medium, { padding: `8px ${spacing[10]}`, borderRadius: '6px' }],
  }),
}

export const solid = styleVariants({
  primary: {
    background: color.primary.base,
    borderColor: color.primary.base,
    color: color.primary.subtler,
  },
  secondary: {
    background: color.secondary.base,
    borderColor: color.secondary.base,
    color: color.secondary.subtler,
  },
  blue: {
    background: color.status.info,
    borderColor: color.status.info,
    color: color.background.subtleInfo,
  },
  green: {
    background: color.status.success,
    borderColor: color.status.success,
    color: color.background.subtleSuccess,
  },
  yellow: {
    background: color.status.warning,
    borderColor: color.status.warning,
    color: color.background.subtleWarning,
  },
  red: {
    background: color.status.danger,
    borderColor: color.status.danger,
    color: color.background.subtleDanger,
  },
  gray: {
    background: color.text.tertiary,
    borderColor: color.text.tertiary,
    color: color.background.surface,
  },
})

export const subtle = styleVariants({
  primary: {
    background: color.primary.subtler,
    borderColor: color.primary.subtler,
    color: color.primary.base,
  },
  secondary: {
    background: color.secondary.subtler,
    borderColor: color.secondary.subtler,
    color: color.secondary.base,
  },
  blue: {
    background: color.background.subtleInfo,
    borderColor: color.background.subtleInfo,
    color: color.status.info,
  },
  green: {
    background: color.background.subtleSuccess,
    borderColor: color.background.subtleSuccess,
    color: color.status.success,
  },
  yellow: {
    background: color.background.subtleWarning,
    borderColor: color.background.subtleWarning,
    color: color.status.warning,
  },
  red: {
    background: color.background.subtleDanger,
    borderColor: color.background.subtleDanger,
    color: color.status.danger,
  },
  gray: {
    background: color.background.surface,
    borderColor: color.background.surface,
    color: color.text.tertiary,
  },
})

export const outline = styleVariants({
  primary: {
    background: color.background.base,
    borderColor: color.primary.base,
    color: color.primary.base,
  },
  secondary: {
    background: color.background.base,
    borderColor: color.secondary.base,
    color: color.secondary.base,
  },
  blue: {
    background: color.background.base,
    borderColor: color.status.info,
    color: color.status.info,
  },
  green: {
    background: color.background.base,
    borderColor: color.status.success,
    color: color.status.success,
  },
  yellow: {
    background: color.background.base,
    borderColor: color.status.warning,
    color: color.status.warning,
  },
  red: {
    background: color.background.base,
    borderColor: color.status.danger,
    color: color.status.danger,
  },
  gray: {
    background: color.background.base,
    borderColor: color.text.tertiary,
    color: color.text.tertiary,
  },
})
