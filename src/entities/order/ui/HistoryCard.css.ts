import { style, styleVariants } from '@vanilla-extract/css'

import { color } from '@/shared/config/theme/tokens/color/semantic.css'
import { spacing } from '@/shared/config/theme/tokens/spacing'
import { body } from '@/shared/config/theme/tokens/typography/semantic.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: '16px',
  border: `1px solid ${color.border.default}`,
  background: color.background.base,
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing[16],
  borderBottom: `1px solid ${color.border.default}`,
})

export const headerMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
})

export const orderDate = style([body.subMedium, { color: color.text.secondary }])
export const orderNumber = style([body.caption, { color: color.text.tertiary }])

const badgeBase = style([
  body.caption,
  {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 8px',
    borderRadius: '999px',
    fontSize: '10px',
  },
])

export const badge = styleVariants({
  delivered: [badgeBase, { background: color.background.subtleSuccess, color: color.status.success }],
  shipping: [badgeBase, { background: color.primary.base, color: color.primary.subtler }],
  preparing: [badgeBase, { background: color.background.subtleInfo, color: color.status.info }],
  cancelled: [badgeBase, { background: color.background.subtleDanger, color: color.status.danger }],
})

export const itemRow = style({
  padding: spacing[16],
})

export const actionRow = style({
  display: 'flex',
  padding: `0 ${spacing[16]} ${spacing[16]}`,
})

export const primaryAction = style([
  body.subMedium,
  {
    flex: '1 0 0',
    height: '39px',
    borderRadius: '8px',
    border: 'none',
    background: color.primary.base,
    color: color.text.inverse,
    cursor: 'pointer',
  },
])

export const secondaryAction = style([
  body.subMedium,
  {
    flex: '1 0 0',
    height: '39px',
    borderRadius: '8px',
    border: 'none',
    background: color.primary.subtler,
    color: color.primary.base,
    cursor: 'pointer',
  },
])

export const cancelAction = style([
  body.subMedium,
  {
    flex: '1 0 0',
    height: '37px',
    borderRadius: '10px',
    border: 'none',
    background: color.background.subSurface,
    color: color.text.secondary,
    cursor: 'pointer',
  },
])

export const divider = style({
  margin: `0 ${spacing[16]}`,
  height: '1px',
  background: color.border.default,
})

export const expandRow = style([
  body.sub,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[4],
    width: '100%',
    padding: spacing[16],
    color: color.text.tertiary,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
])

export const expandIcon = style({
  width: '18px',
  height: '18px',
})

export const expandIconOpen = style({
  transform: 'rotate(180deg)',
})
