import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  padding: '12px 0',
  background: color.background.base,
})

export const label = style([title.smMedium, { color: color.text.primary }])

export const optionRow = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
})
