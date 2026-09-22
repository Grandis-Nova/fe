import { style } from '@vanilla-extract/css'

import { color, spacing } from '@/shared/config/theme'

// Header(70px) 아래 남는 뷰포트 높이만큼 사이드바가 꽉 차게.
export const root = style({
  display: 'flex',
  alignItems: 'stretch',
  minHeight: 'calc(100vh - 70px)',
  background: color.background.surface,
})

export const content = style({
  flex: '1 1 0%',
  minWidth: 0,
  padding: spacing[30],
})
