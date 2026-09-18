import { style } from '@vanilla-extract/css'

import { color } from '../config/theme/tokens/color/semantic.css'
import { spacing } from '../config/theme/tokens/spacing'
import { body } from '../config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[16],
})

export const arrowButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '38px',
  height: '38px',
  borderRadius: '9999px',
  border: 'none',
  background: color.background.base,
  cursor: 'pointer',
})

export const arrowIcon = style({
  width: '16px',
  height: '16px',
})

export const arrowIconFlipped = style({
  transform: 'rotate(180deg)',
})

export const pageButton = style([
  body.subMedium,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38px',
    height: '38px',
    borderRadius: '9999px',
    border: 'none',
    background: color.background.base,
    color: color.text.tertiary,
    cursor: 'pointer',
  },
])

export const pageButtonActive = style({
  background: color.primary.subtler,
  color: color.primary.base,
})
