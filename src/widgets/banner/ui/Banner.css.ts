import { style } from '@vanilla-extract/css'

import { breakpoint } from '@/shared/config/theme/tokens/breakpoint'
import { HEADER_HEIGHT } from '@/widgets/header'

// banner1.png의 가장자리 색과 같은 값(이미지에서 추출). 토큰이 아니라 이 이미지에
// 묶인 색이라 여기 둔다 — 값이 다르면 여백과 이미지 사이에 경계선이 보인다.
const imageEdgeColor = '#080A11'

export const root = style({
  backgroundColor: imageEdgeColor,
})

// 헤더가 배너 위에 겹치는 데스크톱에서만, 헤더 높이만큼 이미지를 아래로 내려
// 배너 내용이 헤더에 바싹 붙지 않게 한다. 모바일은 헤더가 겹치지 않으므로 불필요.
export const headerSpacer = style({
  height: 0,
  '@media': {
    [breakpoint.desktop]: { height: `${HEADER_HEIGHT}px` },
  },
})

export const image = style({
  display: 'block',
  width: '100%',
  aspectRatio: '1920 / 500',
  objectFit: 'cover',
})
