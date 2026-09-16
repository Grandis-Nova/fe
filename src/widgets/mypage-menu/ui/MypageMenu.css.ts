import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { body, title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  width: '202px',
  padding: '20px 20px 30px',
  borderRadius: '12px',
  background: '#f9f9fc',
})

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
})

export const headingLabel = style([body.subMedium, { color: color.text.tertiary }])
export const userName = style([title.lgSemibold, { color: color.text.primary }])

export const sections = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
})

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
})

export const sectionTitle = style([
  body.subMedium,
  { color: color.primary.hover, textAlign: 'center' },
])

export const linkList = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
})

export const link = style([
  body.sub,
  {
    padding: '2px 0',
    color: color.text.secondary,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
])

export const linkActive = style({
  fontWeight: 600,
  color: color.primary.base,
})

export const linkActiveUnderlined = style({
  borderBottom: `1.5px solid ${color.primary.base}`,
})
