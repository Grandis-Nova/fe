import { style } from '@vanilla-extract/css'

import { typography, color, spacing, motion } from '@/shared/config/theme'
import { breakpoint } from '@/shared/config/theme/tokens/breakpoint'
import { maxWidth } from '@/shared/config/theme/tokens/container'

export const contentPadding = style({
  padding: `0 ${spacing[20]}`,
})

export const title = style([
  typography.title.xlSemibold,
  {
    marginBottom: spacing[30],
    marginLeft: spacing[8],
  },
])

export const productName = style([typography.title.lgSemibold])
export const productOption = style([
  typography.body.sub,
  { color: color.text.tertiary },
])

export const layout = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: spacing[20],
  marginBottom: spacing[100],
  '@media': {
    [breakpoint.desktop]: {
      gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
    },
  },
})

export const optionPanel = style({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const optionColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[24],
  paddingTop: spacing[16],
})

// 평소엔 뷰포트 위로 숨겨뒀다가, 이미지/옵션 패널(layout)이 화면에서 사라지면
// isLayoutVisible이 false가 되면서 transform만 바뀌어 위에서 아래로 슬라이드된다.
// ProductPageTab(tabBarWrapper)과는 분리 — 탭은 항상 떠 있어야 하고, 이 바만 나타났다 사라진다.
export const orderBar = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  background: `color-mix(in srgb, ${color.background.base} 80%, transparent)`,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transform: 'translateY(-100%)',
  transition: `transform ${motion.duration.fast} ${motion.easing.default}`,
})

export const orderBarVisible = style({
  transform: 'translateY(0)',
})

// top은 orderBar 노출 여부에 따라 인라인으로 바뀐다(0 또는 orderBar 높이) —
// orderBar가 나타나면 그만큼 아래로 밀려서 겹치지 않는다.
export const tabBarWrapper = style({
  position: 'sticky',
  width: '100%',
  maxWidth: maxWidth.content,
  zIndex: 1,
  transition: `top ${motion.duration.fast} ${motion.easing.default}`,
})

export const orderBarContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  borderBottom: `1px solid ${color.primary.focus}`,
})

export const orderBarInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
})

export const orderBarButtons = style({
  display: 'flex',
  gap: spacing[8],
})

export const orderBarIconButton = style({
  width: '46px',
})

export const orderBarCheckoutButton = style({
  padding: `0 ${spacing[24]}`,
})

export const quantityPriceRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[8],
})

export const fixedQuantity = style([
  typography.body.defaultMedium,
  { color: color.text.primary },
])

export const price = style([typography.title.lgSemibold])

export const actions = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: spacing[8],
})

export const actionsSingle = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing[8],
})

export const shipmentNotice = style([
  typography.body.sub,
  {
    color: color.text.tertiary,
    marginBottom: spacing[8],
    textAlign: 'right',
  },
])

export const imageFrame = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '8 / 5',
  borderRadius: '16px',
  background: color.background.surface,
  overflow: 'hidden',
})

// height:100%를 Slider(Swiper)까지 퍼센트로 내려보내면 aspect-ratio(imageFrame) + flex(swiper-wrapper)
// 조합에서 순환 계산이 발생해 크롬이 LayoutUnit 상한값(약 33554432px)으로 튀는 버그가 있었다 —
// absolute + inset:0으로 imageFrame의 padding box에 기하학적으로 고정시켜 퍼센트 순환 자체를 피한다.
export const sliderFill = style({
  position: 'absolute',
  inset: 0,
})

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

export const reviewList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[20],
  padding: `${spacing[40]} 0`,
})

export const tabPanel = style({
  width: '100%',
  height: '1000px',
  // stickyHeader(주문 요약 바 + ProductPageTab, 총 135px)가 top에 고정돼있어
  // scrollIntoView로 top 0에 붙이면 그 밑에 가려지므로, 그만큼 여유를 둔다.
  scrollMarginTop: '135px',
})
