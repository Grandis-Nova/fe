import { style } from '@vanilla-extract/css'

import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { fontWeight } from '@/shared/config/theme/tokens/typography/base'
import { title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

export const tab = style([
  title.lgSemibold,
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
    fontWeight: fontWeight.regular,
    cursor: 'pointer',
  },
])

export const tabActive = style({
  borderBottomColor: color.primary.base,
  color: color.primary.base,
  fontWeight: fontWeight.semibold,
})
