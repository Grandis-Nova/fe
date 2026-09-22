import { style } from '@vanilla-extract/css'

import { typography, color, spacing } from '@/shared/config/theme'

export const Container = style({
  position: 'relative',
})

export const title = style([
  typography.title.lgSemibold,
  {
    padding: `${spacing[20]} ${spacing[16]}`,
    borderBottom: `2px solid ${color.primary.focus}`,
  },
])

export const countdownWrapper = style({
  position: 'fixed',
  bottom: 0,
  // width:'100%'는 fixed 기준 부모인 뷰포트 폭이 되어버려 Container(max-width 1200px)보다
  // 넓게 튀어나온다 — left/right:0 + maxWidth + margin:auto로 Container 폭에 맞춰 중앙 정렬한다.
  left: 0,
  right: 0,
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing[12],
  padding: spacing[16],
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
})

export const countdown = style([
  typography.display.time,
  {
    textAlign: 'center',
    color: 'white',
  },
])

export const bottomSheetTitle = style([
  typography.title.mdMedium,
  { color: color.text.primary },
])

export const bottomSheetDescription = style([
  typography.body.sub,
  { color: color.text.tertiary, marginTop: spacing[4] },
])

export const modelSummary = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[12],
  margin: `${spacing[20]} 0`,
})
