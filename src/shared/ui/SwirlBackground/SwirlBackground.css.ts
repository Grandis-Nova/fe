import { style } from '@vanilla-extract/css'

export const root = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  pointerEvents: 'none',
})
