import { style } from '@vanilla-extract/css'

export const card = style({
  padding: '2em',
  textAlign: 'center',
})

export const logo = style({
  height: '6em',
  padding: '1.5em',
  transition: 'filter 300ms',
  ':hover': {
    filter: 'drop-shadow(0 0 2em #646cffaa)',
  },
})
