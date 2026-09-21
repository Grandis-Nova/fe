import { style, styleVariants } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'

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
    `background ${motion.duration.fast} ${motion.easing.default}`,
    `border-color ${motion.duration.fast} ${motion.easing.default}`,
    `color ${motion.duration.fast} ${motion.easing.default}`,
  ].join(', '),
  selectors: {
    '&:hover:not(:disabled)': {
      background: color.primary.subtler,
      color: color.primary.focus,
    },
  },
})

export const size = styleVariants({
  medium: [
    base,
    typography.body.defaultRegular,
    { padding: `${spacing[4]} ${spacing[10]}`, borderRadius: '5px' },
  ],
  small: [
    base,
    typography.body.sub,
    { padding: `${spacing[4]} ${spacing[6]}`, borderRadius: '4px' },
  ],
})

// base 다음에 선언 — 동일 특이도(selector specificity)에서는 나중에 선언된 규칙이 이겨야
// hover 시에도 selected 쪽 배경/테두리/글자색이 유지된다(= selected일 땐 hover 스타일이 안 먹음).
// background/borderColor/color 세 개를 전부 '&, &:hover:not(:disabled)'에 넣어야
// base의 hover 규칙(동일 특이도)을 모든 속성에서 이길 수 있다 — 하나라도 빠지면 그 속성만
// hover 시 base 쪽 값으로 새어나간다.
export const selected = style({
  selectors: {
    '&, &:hover:not(:disabled)': {
      background: 'transparent',
      borderColor: color.primary.focus,
      color: color.primary.focus,
    },
  },
})
