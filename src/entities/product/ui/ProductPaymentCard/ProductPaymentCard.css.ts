import { style } from '@vanilla-extract/css'

import { color, motion, spacing } from '@/shared/config/theme'

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
  background: color.background.surface,
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

export const name = style({ color: color.text.primary })
export const modelNumber = style({ color: color.text.tertiary })
export const optionSummary = style({ color: color.text.secondary })

export const quantityPriceRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: color.text.primary,
})

export const action = style({
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
  transition: `transform 160ms ${motion.easing.default}`,
  selectors: {
    '&:active:not(:disabled)': {
      transform: 'scale(0.97)',
    },
  },
})

export const actionCheckout = style({
  background: color.primary.base,
  color: color.text.inverse,
})

export const actionPending = style({
  background: color.background.disabled,
  color: color.text.disabled,
  cursor: 'not-allowed',
})
