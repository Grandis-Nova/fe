import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../config/theme/tokens/color/semantic.css'
import { body } from '../config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
})

const boxBase = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  background: color.background.base,
  border: `1px solid ${color.primary.surface}`,
  transition: 'border-color 150ms',
  selectors: {
    '&:focus-within': {
      borderColor: color.primary.base,
    },
  },
})

export const box = styleVariants({
  medium: [boxBase, { height: '56px', borderRadius: '12px', padding: '0 16px' }],
  small: [boxBase, { height: '46px', borderRadius: '8px', padding: '0 12px' }],
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
    paddingTop: '14px',
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
    transition: 'all 150ms',
    selectors: {
      [`${field}:focus ~ &, ${field}:not(:placeholder-shown) ~ &`]: {
        top: '8px',
        transform: 'translateY(0)',
        fontSize: '12px',
        color: color.primary.base,
      },
    },
  },
])

export const errorRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: color.status.danger,
})

export const errorIcon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
})

export const errorText = body.caption
