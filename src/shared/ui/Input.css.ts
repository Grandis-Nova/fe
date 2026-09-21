import { style, styleVariants } from '@vanilla-extract/css'

import { color } from '../config/theme/tokens/color/semantic.css'
import { duration, easing } from '../config/theme/tokens/motion'
import { spacing } from '../config/theme/tokens/spacing'
import { fontSize } from '../config/theme/tokens/typography/base'
import { body } from '../config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  width: '100%',
})

const boxBase = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  background: color.background.base,
  border: `1px solid ${color.primary.surface}`,
  transition: `border-color ${duration.fast} ${easing.default}`,
  selectors: {
    '&:focus-within': {
      borderColor: color.primary.base,
    },
  },
})

export const box = styleVariants({
  medium: [
    boxBase,
    { height: '56px', borderRadius: '12px', padding: `0 ${spacing[16]}` },
  ],
  small: [
    boxBase,
    { height: '46px', borderRadius: '8px', padding: `0 ${spacing[12]}` },
  ],
})

export const boxError = style({
  borderColor: color.status.danger,
  background: color.background.subtleDanger,
  selectors: {
    '&:focus-within': {
      borderColor: color.status.danger,
    },
  },
})

export const field = style([
  body.defaultRegular,
  {
    width: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: color.text.primary,
    paddingTop: spacing[14],
  },
])

export const label = style([
  body.sub,
  {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: color.text.tertiary,
    pointerEvents: 'none',
    transition: `all ${duration.fast} ${easing.default}`,
    selectors: {
      [`${field}:focus ~ &, ${field}:not(:placeholder-shown) ~ &`]: {
        top: spacing[8],
        transform: 'translateY(0)',
        fontSize: fontSize[12],
        color: color.primary.base,
      },
    },
  },
])

export const errorRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[4],
  color: color.status.danger,
})

export const errorIcon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
})

export const errorText = body.caption
