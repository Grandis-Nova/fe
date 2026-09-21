import { style } from '@vanilla-extract/css'

import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { spacing } from '@/shared/config/theme/tokens/spacing'
import { fontWeight } from '@/shared/config/theme/tokens/typography/base'
import {
  body,
  title,
} from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[30],
  width: '202px',
  padding: `${spacing[20]} ${spacing[20]} ${spacing[30]}`,
  borderRadius: '12px',
  background: color.background.surface,
})

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  alignItems: 'center',
})

export const headingLabel = style([
  body.subMedium,
  { color: color.text.tertiary },
])
export const userName = style([title.lgSemibold, { color: color.text.primary }])

export const sections = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[20],
  width: '100%',
})

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  width: '100%',
})

export const sectionTitle = style([
  body.subMedium,
  { color: color.primary.focus, textAlign: 'center' },
])

export const linkList = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[6],
})

export const link = style([
  body.sub,
  {
    padding: `${spacing[2]} 0`,
    color: color.text.secondary,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
])

export const linkActive = style({
  fontWeight: fontWeight.semibold,
  color: color.primary.base,
})

export const linkActiveUnderlined = style({
  borderBottom: `1.5px solid ${color.primary.base}`,
})
