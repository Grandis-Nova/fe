import { style } from '@vanilla-extract/css'

// banner1.png의 가장자리 색과 같은 값(이미지에서 추출). 토큰이 아니라 이 이미지에
// 묶인 색이라 여기 둔다 — 값이 다르면 여백과 이미지 사이에 경계선이 보인다.
const imageEdgeColor = '#080A11'

export const root = style({
  position: 'relative',
  // margin-top이 아니라 padding-top을 쓴다 — 첫 자식(image)의 margin-top은 root의
  // margin과 겹쳐(margin collapsing) root 자체를 밀어버려서, 이 70px 구간에
  // root의 backgroundColor가 아니라 그 바깥 배경이 드러난다.
  paddingTop: '70px',
  backgroundColor: imageEdgeColor,
})

export const image = style({
  display: 'block',
  width: '100%',
  aspectRatio: '1920 / 500',
  objectFit: 'cover',
})

// 이미지 가장자리에 헤더가 바로 얹히면 배경이 옹졸해 보인다 — 위쪽을 검은 스크림으로
// 깔아 헤더가 배경 위에 안정적으로 놓인 것처럼 보이게 한다. imageEdgeColor와 같은
// 이유로 토큰이 아니라 이 이미지 톤에 맞춘 값을 그대로 쓴다.
// root가 height:auto라 퍼센트 높이는 0으로 풀린다 — 고정 px로 준다. 70px(헤더
// 높이만큼)까지는 검은색을 유지하고 그 지점부터 투명으로 빠진다.
export const scrim = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '220px',
  background:
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.55) 0, rgba(0, 0, 0, 0.55) 80px, rgba(0, 0, 0, 0) 100%)',
  pointerEvents: 'none',
})
