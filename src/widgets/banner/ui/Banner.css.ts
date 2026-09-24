import { style } from '@vanilla-extract/css'

// banner1.png의 가장자리 색과 같은 값(이미지에서 추출). 토큰이 아니라 이 이미지에
// 묶인 색이라 여기 둔다 — 값이 다르면 여백과 이미지 사이에 경계선이 보인다.
const imageEdgeColor = '#080A11'

export const root = style({
  backgroundColor: imageEdgeColor,
})

// 헤더를 이미지 위에 띄운다 — 헤더 높이만큼 비워두면 그 자리가 단색으로 남아
// 이미지가 헤더 밑에서 잘린 것처럼 보인다.
export const image = style({
  display: 'block',
  width: '100%',
  aspectRatio: '1920 / 500',
  objectFit: 'cover',
})
