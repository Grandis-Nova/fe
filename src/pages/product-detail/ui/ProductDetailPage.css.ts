import { style } from '@vanilla-extract/css'

import { typography, spacing } from '@/shared/config/theme'

export const title = style([
  typography.title.xlSemibold,
  {
    marginBottom: spacing[30],
  },
])
