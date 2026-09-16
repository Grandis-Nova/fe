import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../config/theme/tokens/color/semantic.css'
import { body } from '../config/theme/tokens/typography/semantic.css'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: color.background.base,
  border: '1px solid transparent',
  color: color.primary.hover,
  cursor: 'pointer',
  textAlign: 'center',
  selectors: {
    '&:hover:not(:disabled)': {
      background: color.primary.subtler,
      borderColor: color.primary.subtler,
    },
  },
})

const selectedBase = style({
  selectors: {
    '&, &:hover:not(:disabled)': {
      borderColor: color.primary.hover,
    },
  },
})

export const size = styleVariants({
  medium: [base, body.defaultRegular, { padding: '4px 10px', borderRadius: '5px' }],
  small: [base, body.sub, { padding: '4px 6px', borderRadius: '4px' }],
})

export const selected = selectedBase
