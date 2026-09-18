import { style, styleVariants } from '@vanilla-extract/css';

import { color } from '@/shared/config/theme/tokens/color/semantic.css';
import { spacing } from '@/shared/config/theme/tokens/spacing';
import { body } from '@/shared/config/theme/tokens/typography/semantic.css';

const rootBase = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const root = styleVariants({
  small: [rootBase, { gap: spacing[6] }],
  medium: [rootBase, { gap: spacing[6] }],
});

const colorNameBase = style({ color: color.text.secondary });

export const colorName = styleVariants({
  small: [body.caption, colorNameBase],
  medium: [body.subMedium, colorNameBase],
});

const swatchRowBase = style({ display: 'flex', alignItems: 'center' });

export const swatchRow = styleVariants({
  small: [swatchRowBase, { gap: spacing[8] }],
  medium: [swatchRowBase, { gap: spacing[12] }],
});

const swatchBase = style({
  borderRadius: '9999px',
  border: `0.75px solid ${color.border.default}`,
  padding: 0,
});

export const swatch = styleVariants({
  small: [swatchBase, { width: '18px', height: '18px' }],
  medium: [swatchBase, { width: '22px', height: '22px' }],
});

export const swatchSelected = style({
  outline: `1.5px solid ${color.primary.hover}`,
  outlineOffset: '2px',
  border: 'none',
});

export const swatchInteractive = style({
  cursor: 'pointer',
  background: 'none',
});
