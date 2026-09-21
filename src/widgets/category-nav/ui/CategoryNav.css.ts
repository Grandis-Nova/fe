import { style, styleVariants } from '@vanilla-extract/css'

import { motion, typography } from '@/shared/config/theme'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { maxWidth } from '@/shared/config/theme/tokens/container'
import { spacing } from '@/shared/config/theme/tokens/spacing'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: maxWidth.content,
  margin: '0 auto',
  padding: `${spacing[8]} ${spacing[20]} ${spacing[16]}`,
  background: color.background.base,
})

// 보더 표시 여부를 토글해도 레이아웃이 흔들리지 않도록 두께는 유지하고 색만 바꾼다.
export const border = styleVariants({
  visible: { borderBottom: `1px solid ${color.primary.focus}` },
  hidden: { borderBottom: '1px solid transparent' },
})

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[30],
})

export const links = style([
  typography.body.defaultRegular,
  {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[30],
    color: color.text.secondary,
  },
])

export const divider = style({
  fontSize: '10px',
  color: color.border.default,
})

export const link = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  // font-weight를 바꾸면 글자 폭이 늘어나 레이아웃이 흔들리므로, 실제 두께는 유지하고
  // 글자 윤곽선 전체에 얇은 stroke를 둘러 가로/세로 모두 고르게 두꺼워 보이게 한다.
  WebkitTextStrokeWidth: '0.6px',
  WebkitTextStrokeColor: 'transparent',
  transition: [
    `color ${motion.duration.fast} ${motion.easing.default}`,
    `-webkit-text-stroke-color ${motion.duration.fast} ${motion.easing.default}`,
  ].join(', '),
  selectors: {
    '&:hover': {
      color: color.primary.base,
      WebkitTextStrokeColor: 'currentColor',
    },
  },
})

export const linkActive = style([
  typography.body.defaultMedium,
  { color: color.primary.base },
])
