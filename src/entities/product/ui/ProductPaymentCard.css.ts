import { style } from '@vanilla-extract/css'
import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { body, title } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
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
  gap: '12px',
  flex: '1 0 0',
  minWidth: 0,
  padding: '4px 0',
})

export const infoGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

export const titleRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
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
    padding: '0 14px',
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
