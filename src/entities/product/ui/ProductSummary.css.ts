import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { body, button, title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 20px',
  background: color.background.base,
  borderBottom: `1px solid ${color.primary.hover}`,
})

export const info = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const name = style([title.lgSemibold, { color: color.text.primary }])
export const options = style([body.sub, { color: color.text.tertiary }])

export const cta = style([
  button.mdBold,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '47px',
    padding: '0 16px',
    borderRadius: '12px',
    border: 'none',
    background: color.primary.hover,
    color: color.text.inverse,
    cursor: 'pointer',
  },
])
