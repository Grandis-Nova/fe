import { globalStyle, style } from '@vanilla-extract/css'

import { color, spacing } from '@/shared/config/theme'

export const root = style({
  width: '100%',
  height: '100%',
})

globalStyle(`${root} .swiper-pagination`, {
  bottom: spacing[12],
})

globalStyle(`${root} .swiper-pagination-bullet`, {
  width: '6px',
  height: '6px',
  background: color.border.default,
  opacity: 1,
})

globalStyle(`${root} .swiper-pagination-bullet-active`, {
  background: color.border.hover,
})
