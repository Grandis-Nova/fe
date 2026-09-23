import { style } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'
import { breakpoint } from '@/shared/config/theme/tokens/breakpoint'

export const title = style([
  typography.title.xlSemibold,
  { marginBottom: spacing[40] },
])

// 데스크톱에선 주문 폼(왼쪽)과 결제 요약(오른쪽)이 나란히 선다.
export const layout = style({
  display: 'grid',
  rowGap: spacing[40],
  '@media': {
    [breakpoint.desktop]: {
      gridTemplateColumns: 'minmax(0, 1fr) 351px',
      columnGap: spacing[40],
      alignItems: 'start',
    },
  },
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[32],
  minWidth: 0,
})

// 섹션 사이 구분선 — 위 gap(32px)과 같은 값을 패딩으로 줘서 선이 두 섹션 한가운데 놓인다.
export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
  selectors: {
    '&:not(:first-child)': {
      paddingTop: spacing[32],
      borderTop: `1px solid ${color.border.default}`,
    },
  },
})

// 배송지 섹션만 제목 오른쪽에 버튼이 붙는다 — 줄 높이는 버튼(37px)이 정하고 제목이 가운데 선다.
export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[12],
})

export const sectionTitle = typography.title.lgSemibold

// 제목과 안내 문구는 입력 칸(16px)보다 붙어 있어야 한 덩어리로 읽힌다.
export const sectionIntro = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
})

export const note = style([
  typography.body.caption,
  { color: color.text.secondary },
])

// 이름/휴대폰처럼 한 줄에 둘씩 놓이는 입력 — 모바일에선 한 칸씩 쌓인다.
export const fieldRow = style({
  display: 'flex',
  gap: spacing[12],
  '@media': {
    [breakpoint.mobile]: { flexDirection: 'column' },
  },
})

// 에러 문구가 입력 아래에 붙어도 버튼은 입력 상자 옆에 남아야 해서 위쪽 정렬이다.
export const postcodeRow = style([fieldRow, { alignItems: 'flex-start' }])

export const postcodeAction = style({
  flexShrink: 0,
  // Button medium은 46px인데 Input medium 상자는 56px이라 높이를 맞춰 준다.
  height: '56px',
  '@media': {
    [breakpoint.mobile]: { width: '100%' },
  },
})

/* ── 약관 동의 (OrderSummary의 children 자리) ── */

// 좌우 패딩은 OrderSummary의 금액 줄(16px)과 같은 값이라 세로선이 맞는다.
export const terms = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[20],
  padding: `${spacing[24]} ${spacing[16]}`,
})

export const termsTitle = typography.title.lgSemibold

export const agreeAll = style([
  typography.body.defaultMedium,
  {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[12],
    paddingBottom: spacing[20],
    borderBottom: `1px solid ${color.border.subtle}`,
    color: color.text.primary,
    cursor: 'pointer',
    userSelect: 'none',
  },
])

export const termList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
})

export const termRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing[12],
})

// 약관보기 버튼은 label 바깥에 둔다 — 안에 있으면 펼치기 클릭이 체크까지 토글한다.
export const termMain = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing[12],
  flex: 1,
  minWidth: 0,
  cursor: 'pointer',
})

// 체크박스가 긴 라벨에 눌려 납작해지지 않게 고정 — flex 기본값은 shrink 1이다.
export const checkbox = style({ flexShrink: 0 })

export const termLabel = style([
  typography.body.sub,
  { color: color.text.primary, wordBreak: 'keep-all' },
])

export const detailToggle = style([
  typography.body.caption,
  {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
    flexShrink: 0,
    padding: 0,
    border: 'none',
    background: 'none',
    color: color.text.tertiary,
    cursor: 'pointer',
    transition: `color ${motion.duration.fast} ${motion.easing.default}`,
    selectors: {
      '&:hover': { color: color.text.secondary },
    },
  },
])

export const detailIcon = style({
  width: '14px',
  height: '14px',
  transition: `transform ${motion.duration.fast} ${motion.easing.default}`,
})

export const detailIconOpen = style({ transform: 'rotate(180deg)' })

export const detailPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[12],
  marginTop: spacing[12],
  padding: spacing[16],
  borderRadius: '8px',
  background: color.background.surface,
})

export const detailGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
})

export const detailHeading = style([
  typography.body.captionMedium,
  { color: color.text.primary },
])

export const detailBody = style([
  typography.body.caption,
  { color: color.text.secondary, wordBreak: 'keep-all' },
])
