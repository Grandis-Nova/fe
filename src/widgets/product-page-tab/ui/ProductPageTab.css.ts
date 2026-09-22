import { style } from '@vanilla-extract/css'

import { color, motion, typography } from '@/shared/config/theme'
import { fontWeight } from '@/shared/config/theme/tokens/typography/base'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  background: `color-mix(in srgb, ${color.background.base} 80%, transparent)`,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
})

export const tab = style([
  typography.title.lgSemibold,
  {
    flex: '1 0 0',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: color.text.tertiary,
    fontWeight: fontWeight.regular,
    cursor: 'pointer',
    // font-weight는 폭이 흔들리니 transition에서 제외 — color/border만 스르륵 바뀌게 한다.
    transition: [
      `color ${motion.duration.fast} ${motion.easing.default}`,
      `border-bottom-color ${motion.duration.fast} ${motion.easing.default}`,
    ].join(', '),
  },
])

export const tabActive = style({
  borderBottomColor: color.primary.base,
  color: color.primary.base,
  fontWeight: fontWeight.semibold,
})
