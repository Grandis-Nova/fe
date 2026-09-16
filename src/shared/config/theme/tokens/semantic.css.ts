import { createGlobalTheme } from '@vanilla-extract/css'
import { baseColor } from './base'

export const color = createGlobalTheme(':root', {
  primary: {
    base: baseColor.primary.base,
    hover: baseColor.primary.focus,
    subtle: baseColor.primary.light,
    subtler: baseColor.primary.lighter,
    surface: baseColor.primary.surface,
  },
  secondary: {
    base: baseColor.secondary.base,
    hover: baseColor.secondary.focus,
    subtle: baseColor.secondary.light,
    subtler: baseColor.secondary.lighter,
    surface: baseColor.secondary.surface,
  },
  border: {
    default: baseColor.border.default,
    hover: baseColor.border.strongHover,
    subtle: baseColor.border.subtleDivider,
    focus: baseColor.border.focus,
  },
  text: {
    primary: baseColor.text.primary,
    secondary: baseColor.text.secondary,
    tertiary: baseColor.text.tertiary,
    disabled: baseColor.text.disabled,
    inverse: baseColor.text.inverse,
  },
  status: {
    success: baseColor.status.success,
    info: baseColor.status.info,
    warning: baseColor.status.warning,
    danger: baseColor.status.danger,
  },
  background: {
    base: baseColor.background.base,
    surface: baseColor.background.surface,
    subSurface: baseColor.background.subSurface,
    disabled: baseColor.background.disabled,
    subtleSuccess: baseColor.background.subtleSuccess,
    subtleInfo: baseColor.background.subtleInfo,
    subtleWarning: baseColor.background.subtleWarning,
    subtleDanger: baseColor.background.subtleDanger,
  },
})
