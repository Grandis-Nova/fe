import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../config/theme/tokens/color/semantic.css'
import { body, button as buttonTypography } from '../config/theme/tokens/typography/semantic.css'

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid transparent',
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      background: color.background.surface,
      borderColor: color.background.surface,
      color: color.text.disabled,
    },
  },
})

export const size = styleVariants({
  medium: [
    base,
    body.defaultMedium,
    {
      height: '47px',
      gap: '10px',
      padding: '0 16px',
      borderRadius: '12px',
    },
  ],
  small: [
    base,
    buttonTypography.smMedium,
    {
      height: '37px',
      gap: '6px',
      padding: '0 12px',
      borderRadius: '10px',
    },
  ],
})

export const solid = styleVariants({
  primary: {
    background: color.primary.base,
    borderColor: color.primary.base,
    color: color.text.inverse,
    selectors: {
      '&:hover:not(:disabled)': {
        background: color.primary.hover,
        borderColor: color.primary.hover,
      },
    },
  },
  secondary: {
    background: color.secondary.base,
    borderColor: color.secondary.base,
    color: color.text.inverse,
    selectors: {
      '&:hover:not(:disabled)': {
        background: color.secondary.hover,
        borderColor: color.secondary.hover,
      },
    },
  },
  cancel: {
    background: color.background.subSurface,
    borderColor: color.background.subSurface,
    color: color.text.secondary,
    selectors: {
      '&:hover:not(:disabled)': {
        opacity: 0.85,
      },
    },
  },
})

export const outline = styleVariants({
  primary: {
    background: color.background.base,
    borderColor: color.primary.base,
    borderWidth: '1.5px',
    color: color.primary.base,
    selectors: {
      '&:hover:not(:disabled)': {
        background: color.primary.surface,
      },
    },
  },
  secondary: {
    background: color.background.base,
    borderColor: color.secondary.base,
    borderWidth: '1.5px',
    color: color.secondary.base,
    selectors: {
      '&:hover:not(:disabled)': {
        background: color.secondary.surface,
      },
    },
  },
  cancel: {
    background: color.background.base,
    borderColor: color.border.hover,
    borderWidth: '1.5px',
    color: color.text.secondary,
    selectors: {
      '&:hover:not(:disabled)': {
        background: color.background.subSurface,
      },
    },
  },
})

export const icon = style({
  display: 'inline-flex',
  flexShrink: 0,
})
