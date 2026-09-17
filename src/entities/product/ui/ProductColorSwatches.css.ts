import { style, styleVariants } from '@vanilla-extract/css';

import { color } from '@/shared/config/theme/tokens/color/semantic.css';
import { spacing } from '@/shared/config/theme/tokens/spacing';
import { body } from '@/shared/config/theme/tokens/typography/semantic.css';

export const root = styleVariants({
  small: { display: 'flex', flexDirection: 'column', gap: spacing[4], width: '100%' },
  medium: { display: 'flex', flexDirection: 'column', gap: spacing[6], width: '100%' },
});

export const colorName = styleVariants({
  small: [body.caption, { color: color.text.tertiary }],
  medium: [body.subMedium, { color: color.text.tertiary }],
});

export const swatchRow = styleVariants({
  small: { display: 'flex', alignItems: 'center', gap: spacing[6] },
  medium: { display: 'flex', alignItems: 'center', gap: spacing[12] },
});

export const swatch = styleVariants({
  small: {
    width: '12px',
    height: '12px',
    borderRadius: '9999px',
    border: `0.75px solid ${color.primary.hover}`,
    padding: 0,
  },
  medium: {
    width: '22px',
    height: '22px',
    borderRadius: '9999px',
    border: `0.75px solid ${color.primary.hover}`,
    padding: 0,
  },
});

export const swatchSelected = style({ borderWidth: '2px' });

export const swatchInteractive = style({ cursor: 'pointer', background: 'none' });
