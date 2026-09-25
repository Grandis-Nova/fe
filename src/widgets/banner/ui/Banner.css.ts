import { style } from '@vanilla-extract/css'

// banner1.png의 가장자리 색과 같은 값(이미지에서 추출). 토큰이 아니라 이 이미지에
// 묶인 색이라 여기 둔다 — 값이 다르면 여백과 이미지 사이에 경계선이 보인다.
const imageEdgeColor = '#080A11'

export const root = style({
  position: 'relative',
  // margin-top이 아니라 padding-top을 쓴다 — 첫 자식(image)의 margin-top은 root의
  // margin과 겹쳐(margin collapsing) root 자체를 밀어버려서, 이 70px 구간에
  // root의 backgroundColor가 아니라 그 바깥 배경이 드러난다.
  paddingTop: '60px',
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
// root가 height:auto라 퍼센트 높이는 0으로 풀린다 — 고정 px로 준다.
// padding(단색)과 이미지가 만나는 지점(root의 paddingTop과 같은 값)에서 불투명도가
// 낮으면 이미지 쪽의 밝은 무늬가 그대로 비쳐 단색-이미지 경계가 선으로 보인다.
// 그 경계를 지나 이미지 안쪽으로 한참 더 들어간 지점까지 거의 불투명하게 유지한
// 뒤에야 서서히 걷어내, 단색 구간과 이미지가 이어 붙은 자리가 안 보이게 한다.
export const scrim = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100px',
  background:
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.88) 0, rgba(0, 0, 0, 0.88) 70px, rgba(0, 0, 0, 0) 100%)',
  pointerEvents: 'none',
})
