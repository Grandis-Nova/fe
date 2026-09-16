import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { body } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  width: '100%',
  padding: '0 20px',
  background: color.background.base,
})

export const thumbnail = style({
  width: '120px',
  height: '120px',
  borderRadius: '8px',
  background: color.background.surface,
  flexShrink: 0,
  objectFit: 'cover',
})

export const main = style({
  display: 'flex',
  flex: '1 0 0',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-end',
  padding: '12px 0',
})

export const rating = style({
  fontSize: '20px',
  color: color.primary.base,
})

export const textGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
})

export const reviewText = style({ color: color.text.primary, margin: 0 })
export const productName = style([body.subMedium, { color: color.text.tertiary }])

export const meta = style([
  body.subMedium,
  {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    color: color.text.tertiary,
    flexShrink: 0,
  },
])
