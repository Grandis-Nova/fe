import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'
import { breakpoint } from '@/shared/config/theme/tokens/breakpoint'
import { maxWidth } from '@/shared/config/theme/tokens/container'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  // 브랜드 항목이 헤더 높이를 채워야 링크와 메뉴 사이에 커서가 빠지는 틈이 없다.
  // position은 일부러 주지 않는다 — 메뉴가 헤더(Header.css의 root)를 기준으로 잡혀야
  // 가로 전체를 차지할 수 있기 때문이다.
  alignSelf: 'stretch',
  gap: spacing[30],
  minWidth: 0,
})

// 헤더 겹치기가 데스크톱 전용이라 밝은 색 처리도 같은 조건에서만 건다.
export const linksTone = styleVariants({
  default: { color: color.text.secondary },
  onDark: {
    color: color.text.secondary,
    '@media': {
      [breakpoint.desktop]: {
        color: color.text.inverse,
        mixBlendMode: 'normal',
      },
    },
  },
})

export const links = style([
  typography.body.defaultRegular,
  {
    display: 'flex',
    alignItems: 'center',
    // brand가 헤더 높이를 채우려면 그 부모인 이 그룹도 같이 늘어나야 한다.
    alignSelf: 'stretch',
    gap: spacing[30],
  },
])

export const divider = style({
  fontSize: '10px',
  color: color.border.default,
  mixBlendMode: 'difference',
})

export const link = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  // mixBlendMode는 자식까지 한 그룹으로 묶어 blend하므로 links가 아니라 링크 텍스트에만 건다
  // — links에 걸면 그 안의 메가 메뉴(흰 배경)까지 반전된다.
  mixBlendMode: 'difference',
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
  '@media': {
    [breakpoint.desktop]: {
      selectors: {
        [`${linksTone.onDark} &`]: { mixBlendMode: 'normal' },
        // 남색 hover는 어두운 배너에서 묻히므로 흰색을 유지하고 굵기로만 반응한다.
        [`${linksTone.onDark} &:hover`]: {
          color: color.text.inverse,
          WebkitTextStrokeColor: 'currentColor',
        },
      },
    },
  },
})

export const linkActive = style([
  typography.body.defaultMedium,
  { color: color.primary.base },
])

// 브랜드 링크 + 메가 메뉴 묶음. 헤더 높이만큼 늘려 링크와 메뉴 사이에 빈 틈이 없게 한다
// (메뉴가 이 요소의 자식이므로 메뉴 위에 있는 동안에도 :hover가 유지된다).
export const brand = style({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
})

const menuOpen = {
  opacity: 1,
  visibility: 'visible',
  transform: 'translateY(0)',
} as const

// 여는 데 JS 상태를 쓰지 않는다 — :hover와 :focus-within만으로 열린다.
export const menu = style({
  // 기준 박스는 헤더(Header.css의 root) — left/right 0으로 화면 가로 전체를 덮는다.
  // 100vw를 쓰면 세로 스크롤바 폭만큼 넘쳐서 가로 스크롤이 생기므로 쓰지 않는다.
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  // 헤더가 sticky가 아닌 페이지(상품 상세)의 sticky 바(z-index 2)보다 위에 오도록.
  zIndex: 20,
  padding: `${spacing[30]} 0`,
  background: color.background.base,
  borderBottom: `1px solid ${color.border.default}`,
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-4px)',
  transition: [
    `opacity ${motion.duration.fast} ${motion.easing.default}`,
    `transform ${motion.duration.fast} ${motion.easing.default}`,
    `visibility ${motion.duration.fast} ${motion.easing.default}`,
  ].join(', '),
  // 키보드 포커스는 기기와 무관하게 연다.
  selectors: {
    [`${brand}:focus-within &`]: menuOpen,
  },
  // hover는 hover가 되는 기기에서만 — 터치 기기는 hover가 걸려도 닫을 방법이 없다.
  '@media': {
    '(hover: hover)': {
      selectors: {
        [`${brand}:hover &`]: menuOpen,
      },
    },
  },
})

// 메뉴가 열리면 헤더 아래 페이지를 어둡게 덮는 딤.
// 딤 요소를 헤더 안에 두면 헤더 자신의 배경까지 같이 덮여서 헤더가 회색이 된다.
// 그래서 body에 깔고 :has()로 여닫는다 — z-index 5는 페이지 콘텐츠(최대 2) 위,
// 헤더(10) 아래라서 메뉴와 헤더만 밝게 남는다.
globalStyle('body::after', {
  content: '""',
  position: 'fixed',
  inset: 0,
  zIndex: 5,
  background: `color-mix(in srgb, ${color.backgroundDark.base} 55%, transparent)`,
  // 딤이 보이는 동안에도 아래 콘텐츠를 계속 클릭할 수 있게 한다.
  pointerEvents: 'none',
  opacity: 0,
  visibility: 'hidden',
  transition: [
    `opacity ${motion.duration.fast} ${motion.easing.default}`,
    `visibility ${motion.duration.fast} ${motion.easing.default}`,
  ].join(', '),
})

globalStyle(`body:has(${brand}:focus-within)::after`, {
  opacity: 1,
  visibility: 'visible',
})

globalStyle(`body:has(${brand}:hover)::after`, {
  '@media': {
    '(hover: hover)': {
      opacity: 1,
      visibility: 'visible',
    },
  },
})

// 패널은 가로 전체를 덮지만 내용은 헤더 콘텐츠와 같은 1200px 박스 안에 맞춘다.
export const menuInner = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: spacing[40],
  boxSizing: 'border-box',
  maxWidth: maxWidth.content,
  margin: '0 auto',
  padding: `0 ${spacing[20]}`,
})

export const menuCategories = style({
  display: 'flex',
  gap: spacing[16],
})

export const menuTile = style([
  typography.body.subMedium,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '96px',
    padding: `${spacing[20]} ${spacing[16]}`,
    background: color.background.surface,
    color: color.text.secondary,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: [
      `background ${motion.duration.fast} ${motion.easing.default}`,
      `color ${motion.duration.fast} ${motion.easing.default}`,
    ].join(', '),
    selectors: {
      '&:hover': {
        background: color.primary.subtler,
        color: color.primary.base,
      },
    },
  },
])

export const menuAside = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[12],
  paddingLeft: spacing[30],
  borderLeft: `1px solid ${color.border.subtle}`,
})

export const menuAsideTitle = style([
  typography.body.subMedium,
  { color: color.text.tertiary },
])

export const menuAsideLink = style([
  typography.body.sub,
  {
    color: color.text.secondary,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: `color ${motion.duration.fast} ${motion.easing.default}`,
    selectors: {
      '&:hover': { color: color.primary.base },
    },
  },
])
