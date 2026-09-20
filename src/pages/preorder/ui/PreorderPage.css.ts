import { style } from '@vanilla-extract/css'

import { typography, spacing } from '@/shared/config/theme'

export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: spacing[24],
})

export const title = style([
  typography.title.xlSemibold,
  {
    marginBottom: spacing[30],
    padding: `0 ${spacing[16]}`,
  },
])
