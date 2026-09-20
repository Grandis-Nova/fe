import { style, styleVariants } from '@vanilla-extract/css'

import { color } from '../config/theme/tokens/color/semantic.css'
import { duration, easing } from '../config/theme/tokens/motion'
import { spacing } from '../config/theme/tokens/spacing'
import { body } from '../config/theme/tokens/typography/semantic.css'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: '1px solid transparent',
  color: color.text.primary,
  cursor: 'pointer',
  textAlign: 'center',
  transition: [
    `background ${duration.fast} ${easing.default}`,
    `border-color ${duration.fast} ${easing.default}`,
  ].join(', '),
  selectors: {
    '&:hover:not(:disabled)': {
      background: color.primary.subtler,
      borderColor: color.primary.subtler,
    },
  },
})

export const size = styleVariants({
  medium: [
    base,
    body.defaultRegular,
    { padding: `${spacing[4]} ${spacing[10]}`, borderRadius: '5px' },
  ],
  small: [
    base,
    body.sub,
    { padding: `${spacing[4]} ${spacing[6]}`, borderRadius: '4px' },
  ],
})

// base 다음에 선언 — 동일 특이도(selector specificity)에서는 나중에 선언된 규칙이 이겨야
// hover 시에도 selected 쪽 배경/테두리가 유지된다(= selected일 땐 hover 스타일이 안 먹음).
export const selected = style({
  color: color.primary.hover,
  selectors: {
    '&, &:hover:not(:disabled)': {
      background: 'transparent',
      borderColor: color.primary.hover,
    },
  },
})
