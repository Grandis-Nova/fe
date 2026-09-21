import { style, styleVariants } from '@vanilla-extract/css'

import { color, spacing, typography } from '@/shared/config/theme'

const base = style([
  typography.body.captionMedium,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    // Pretendard's Hangul metrics push the body line-height(1.3) box's ink upward
    // when flex-centered; a tight line-height keeps the pill text optically centered.
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
])

export const shape = styleVariants({
  pill: [base, { padding: `5px ${spacing[10]}`, borderRadius: '9999px' }],
  rounded: [base, { padding: `5px ${spacing[8]}`, borderRadius: '6px' }],
})

const solidText = { color: color.text.inverse }

export const solid = styleVariants({
  primary: {
    background: color.primary.base,
    borderColor: color.primary.base,
    ...solidText,
  },
  secondary: {
    background: color.secondary.base,
    borderColor: color.secondary.base,
    ...solidText,
  },
  blue: {
    background: color.status.info,
    borderColor: color.status.info,
    ...solidText,
  },
  green: {
    background: color.status.success,
    borderColor: color.status.success,
    ...solidText,
  },
  yellow: {
    background: color.status.warning,
    borderColor: color.status.warning,
    ...solidText,
  },
  red: {
    background: color.status.danger,
    borderColor: color.status.danger,
    ...solidText,
  },
  gray: {
    background: color.text.tertiary,
    borderColor: color.text.tertiary,
    ...solidText,
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
