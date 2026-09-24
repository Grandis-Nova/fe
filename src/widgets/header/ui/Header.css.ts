import { style, styleVariants } from '@vanilla-extract/css'

import { color, motion, spacing, typography } from '@/shared/config/theme'
import { breakpoint } from '@/shared/config/theme/tokens/breakpoint'
import { maxWidth } from '@/shared/config/theme/tokens/container'
import { MEGA_MENU_OPEN, NAV_LINK_PADDING_X } from '@/widgets/category-nav'

export const HEADER_HEIGHT = 63

export const root = style({
  width: '100%',
  boxSizing: 'border-box',
  // CategoryNav의 메가 메뉴가 화면 가로 전체를 잡을 수 있게 헤더를 기준 박스로 만든다.
  // 아래 overlay/sticky가 position을 덮어쓰지만(둘 다 뒤에 선언), 그 둘이 안 붙는
  // 상품 상세 페이지에서도 메뉴가 헤더를 기준으로 잡히도록 여기서 보장한다.
  position: 'relative',
  transition: `background-color ${motion.duration.fast} ${motion.easing.default}`,
  // 메뉴가 닫힐 때 패널·딤과 같은 지연으로 움직여야 한다(CategoryNav.css) — 헤더만
  // 먼저 투명해지면 아직 떠 있는 흰 패널이 헤더에서 떨어져 나온 것처럼 보인다.
  transitionDelay: motion.duration.fast,
  selectors: {
    // 메뉴가 열리면 흰 패널이 헤더 바로 밑에 붙는다 — 헤더가 반투명하거나 배너가
    // 비쳐 보이면 둘이 따로 놀아서, 이때만 배경을 완전히 불투명하게 만든다.
    // :has() 안쪽 선택자의 명시도가 더해져 surface 변형(클래스 하나)을 이긴다.
    [`&:has(${MEGA_MENU_OPEN})`]: {
      // 상품 상세/마이페이지는 overlay·sticky 둘 다 안 걸려 z-index가 없다 —
      // 메뉴의 딤(body::after, z-index 5)이 그 위에 얹혀 헤더가 회색으로 비친다.
      zIndex: 10,
      background: color.background.base,
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      transitionDelay: '0s',
    },
  },
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
  // nav 링크가 자체 좌우 padding 15px를 갖고 있어, 여기에 15를 더해야 로고~첫 링크가
  // 링크 사이 간격(30px)과 같아진다.
  gap: NAV_LINK_PADDING_X,
  minWidth: 0,
})

export const logo = style([
  typography.logo.wordmark,
  {
    height: 'fit-content',
    color: color.primary.base,
    textDecoration: 'none',
    cursor: 'pointer',
    // blend는 배너/히어로 이미지 위에 떠 있는 onDark에서만 쓴다 — 흰 헤더에 걸면
    // |흰색 - 남색|이 계산돼 로고가 탁한 카키색으로 나온다.
    selectors: {
      // 메뉴가 열려 헤더가 불투명해지면 이미지 위가 아니므로 평소 색으로 돌아간다.
      [`${root}:has(${MEGA_MENU_OPEN}) &`]: {
        color: color.primary.base,
        mixBlendMode: 'normal',
      },
    },
    '@media': {
      [breakpoint.desktop]: {
        selectors: {
          [`${onDark} &`]: {
            color: color.text.inverse,
            // 이미지의 밝은 부분에선 글자가 어두워지며 알아서 대비를 잡는다.
            mixBlendMode: 'difference',
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
  // 버튼이 height:100%로 헤더 높이를 채우려면 이 묶음부터 늘어나야 한다
  // (content가 alignItems:center라 기본은 내용 높이만큼만 잡힌다).
  alignSelf: 'stretch',
  gap: spacing[20],
})

export const iconButton = style({
  display: 'inline-flex',
  // 버튼이 헤더 높이를 꽉 채우고, 아이콘은 그 안에서 가운데 정렬된다.
  height: '100%',
  alignItems: 'center',
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
    [`${root}:has(${MEGA_MENU_OPEN}) &`]: { color: color.primary.base },
    [`${root}:has(${MEGA_MENU_OPEN}) &:hover`]: { color: color.primary.focus },
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
  selectors: {
    [`${root}:has(${MEGA_MENU_OPEN}) &`]: { mixBlendMode: 'normal' },
  },
  '@media': {
    [breakpoint.desktop]: {
      selectors: {
        [`${onDark} &`]: { mixBlendMode: 'difference' },
      },
    },
  },
})
