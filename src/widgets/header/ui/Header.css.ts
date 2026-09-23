import { style, styleVariants } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'
import { breakpoint } from '@/shared/config/theme/tokens/breakpoint'
import { maxWidth } from '@/shared/config/theme/tokens/container'

export const HEADER_HEIGHT = 70

export const root = style({
  width: '100%',
  boxSizing: 'border-box',
  // CategoryNav의 메가 메뉴가 화면 가로 전체를 잡을 수 있게 헤더를 기준 박스로 만든다.
  // 아래 overlay/sticky가 position을 덮어쓰지만(둘 다 뒤에 선언), 그 둘이 안 붙는
  // 상품 상세 페이지에서도 메뉴가 헤더를 기준으로 잡히도록 여기서 보장한다.
  position: 'relative',
  transition: `background-color ${motion.duration.fast} ${motion.easing.default}`,
})

// 메인 최상단에선 배너가 헤더 뒤로 비쳐야 하므로 배경을 완전히 없앤다.
// 스크롤해서 흰 콘텐츠가 올라오면 solid(프로스트)로 돌아와 글자가 계속 읽히게 한다.
// 모바일에선 배너 높이가 100px 남짓이라 70px 헤더가 덮으면 배너가 거의 가려진다.
// 그래서 겹치기는 데스크톱에서만 적용하고, 모바일은 기존처럼 배너 위에 쌓는다.
export const surface = styleVariants({
  solid: {
    background: `color-mix(in srgb, ${color.background.base} 80%, transparent)`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  transparent: {
    ...{
      background: `color-mix(in srgb, ${color.background.base} 80%, transparent)`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    },
    '@media': {
      [breakpoint.desktop]: {
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      },
    },
  },
})

export const overlay = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  '@media': {
    [breakpoint.desktop]: { position: 'fixed', left: 0 },
  },
})

// 어두운 배너 위에 얹힌 상태. 자식 요소들이 이 클래스를 보고 밝은 색으로 바뀐다.
export const onDark = style({})

// 바(root)는 뷰포트 전체 너비, 실제 콘텐츠(로고/nav/액션)만 1200px로 가운데 정렬한다.
export const content = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: maxWidth.content,
  height: `${HEADER_HEIGHT}px`,
  margin: '0 auto',
  padding: `0 ${spacing[20]}`,
})

// 보더 표시 여부를 토글해도 레이아웃이 흔들리지 않도록 두께는 유지하고 색만 바꾼다.
export const border = styleVariants({
  visible: { borderBottom: `1px solid ${color.border.default}` },
  hidden: { borderBottom: '1px solid transparent' },
})

// /products/:id와 /mypage를 제외한 모든 페이지에서 헤더를 sticky로 띄운다 — 상품 상세엔
// 자체 sticky 주문바/탭바가 있어 겹치면 안 되고, 마이페이지는 스크롤에 안 따라오게 한다.
export const sticky = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
})

export const leftGroup = style({
  display: 'flex',
  alignItems: 'center',
  // CategoryNav의 메가 메뉴가 헤더 바닥 기준으로 열릴 수 있도록 헤더 높이를 그대로 넘겨준다.
  alignSelf: 'stretch',
  gap: spacing[30],
  minWidth: 0,
})

export const logo = style([
  typography.logo.wordmark,
  {
    height: 'fit-content',
    color: color.primary.base,
    textDecoration: 'none',
    cursor: 'pointer',
    // 흰 헤더 위에서 로고가 브랜드 톤으로 반전되도록 — 어두운 배너 위에선 이 반전이
    // 오히려 색을 어둡게 만들어 안 보이므로 onDark에서 끈다.
    mixBlendMode: 'difference',
    '@media': {
      [breakpoint.desktop]: {
        selectors: {
          [`${onDark} &`]: {
            color: color.text.inverse,
            mixBlendMode: 'normal',
          },
        },
      },
    },
  },
])

export const logoMember = style({
  backgroundImage: `linear-gradient(90deg, ${color.primary.focus}, #55428c, ${color.secondary.subtle})`,
  backgroundClip: 'text',
  color: 'transparent',
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[20],
})

export const iconButton = style({
  display: 'inline-flex',
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  color: color.primary.base,
  transition: `color ${motion.duration.fast} ${motion.easing.default}`,
  selectors: {
    '&:hover': {
      color: color.primary.focus,
    },
  },
  '@media': {
    [breakpoint.desktop]: {
      selectors: {
        [`${onDark} &`]: { color: color.text.inverse },
        [`${onDark} &:hover`]: { color: color.primary.subtle },
      },
    },
  },
})

export const icon = style({
  width: '24px',
  height: '24px',
  mixBlendMode: 'difference',
  '@media': {
    [breakpoint.desktop]: {
      selectors: {
        [`${onDark} &`]: { mixBlendMode: 'normal' },
      },
    },
  },
})
