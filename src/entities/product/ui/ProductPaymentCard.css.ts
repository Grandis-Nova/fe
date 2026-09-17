import { style } from '@vanilla-extract/css'

import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { spacing } from '@/shared/config/theme/tokens/spacing'
import { body, title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[20],
  width: '100%',
})

export const thumbnail = style({
  width: '120px',
  height: '120px',
  borderRadius: '8px',
  background: color.secondary.subtle,
  flexShrink: 0,
  objectFit: 'cover',
})

export const body_ = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[12],
  flex: '1 0 0',
  minWidth: 0,
  padding: `${spacing[4]} 0`,
})

export const infoGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
})

export const titleRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: spacing[12],
})

export const name = style([title.mdSemibold, { color: color.text.primary }])
export const modelNumber = style([body.subMedium, { color: color.text.tertiary }])
export const optionSummary = style([body.sub, { color: color.text.secondary }])

export const quantityPriceRow = style([
  title.mdSemibold,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: color.text.primary,
  },
])

export const price = title.lgSemibold

export const action = style([
  body.subMedium,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '39px',
    padding: `0 ${spacing[14]}`,
    borderRadius: '8px',
    border: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    cursor: 'pointer',
  },
])

export const actionCheckout = style({
  background: color.primary.base,
  color: color.text.inverse,
})

export const actionPending = style({
  background: color.background.disabled,
  color: color.text.disabled,
  cursor: 'not-allowed',
})
