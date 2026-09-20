import { style } from '@vanilla-extract/css'

import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { spacing } from '@/shared/config/theme/tokens/spacing'
import { title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[10],
  width: '100%',
  padding: `${spacing[12]} 0`,
  background: color.background.base,
})

export const label = style([title.smMedium, { color: color.text.primary }])

export const optionRow = style({
  display: 'flex',
  gap: spacing[8],
  alignItems: 'center',
})
