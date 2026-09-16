import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { body, title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '267.5px',
  borderRadius: '8px',
  background: color.background.base,
  overflow: 'hidden',
})

export const image = style({
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '8px',
  objectFit: 'cover',
})

export const body_ = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  padding: '12px 8px',
})

export const title_ = style([title.mdMedium, { color: color.text.primary }])
export const period = style([body.caption, { color: color.text.tertiary }])
