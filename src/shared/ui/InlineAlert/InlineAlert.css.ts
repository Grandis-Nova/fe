import { style, styleVariants } from '@vanilla-extract/css'

import { color, spacing } from '@/shared/config/theme'

export const root = style({
  display: 'grid',
  alignItems: 'center',
  gap: spacing[10],
  border: '1px solid lightgray',
  padding: '20px 24px',
  borderRadius: '12px',
  gridTemplateColumns: 'auto 1fr auto',
})

export const background = styleVariants({
  error: { background: color.background.subtleDanger },
  warning: { background: color.background.subtleWarning },
  info: { background: color.background.subtleInfo },
  success: { background: color.background.subtleSuccess },
})
