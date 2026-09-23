import { style } from '@vanilla-extract/css'

import { spacing, typography, color } from '@/shared/config/theme'
import { breakpoint } from '@/shared/config/theme/tokens/breakpoint'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[40],
  '@media': {
    [breakpoint.desktop]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
})

export const content = style({
  flex: 1,
  minWidth: 0,
})

export const title = style([
  typography.title.xlSemibold,
  {
    marginBottom: spacing[40],
    padding: '12px 0px 12px 4px',
    borderBottom: `2px solid ${color.primary.focus}`,
  },
])
