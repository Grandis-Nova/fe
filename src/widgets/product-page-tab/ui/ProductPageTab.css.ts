import { style } from '@vanilla-extract/css'

import { color, typography } from '@/shared/config/theme'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

export const tab = style([
  typography.navigation.tab,
  {
    flex: '1 0 0',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: color.background.base,
    border: 'none',
    borderBottom: '2px solid transparent',
    color: color.text.tertiary,
    cursor: 'pointer',
  },
])

export const tabActive = style([
  typography.button.lgSemibold,
  {
    borderBottomColor: color.primary.base,
    color: color.primary.base,
  },
])
