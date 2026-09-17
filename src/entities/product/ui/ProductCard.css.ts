import { style } from '@vanilla-extract/css';

import { color } from '@/shared/config/theme/tokens/color/semantic.css';
import { spacing } from '@/shared/config/theme/tokens/spacing';
import {
  body,
  title,
} from '@/shared/config/theme/tokens/typography/semantic.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  overflow: 'hidden',
  width: '267.5px',
  borderRadius: '16px',
  background: color.background.base,
});

export const media = style({
  position: 'relative',
  width: '267.5px',
  height: '267.5px',
  background: color.secondary.surface,
  borderRadius: '16px',
});

export const mediaSurface = style({
  position: 'absolute',
  inset: 0,
  background: color.background.surface,
  borderRadius: '16px',
});

export const image = style({
  position: 'absolute',
  left: '34px',
  top: '34px',
  width: '200px',
  height: '200px',
  objectFit: 'cover',
});

export const dots = style({
  position: 'absolute',
  left: '117px',
  top: '251px',
  display: 'flex',
  gap: spacing[8],
});

export const dot = style({
  width: '6px',
  height: '6px',
  borderRadius: '9999px',
  background: color.border.default,
});

export const dotActive = style({
  background: color.border.focus,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[12],
  width: '100%',
  padding: `${spacing[16]} ${spacing[12]}`,
});

export const nameGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
});

export const name = style([title.mdMedium, { color: color.text.primary }]);
export const modelNumber = style([body.sub, { color: color.text.tertiary }]);

export const storageRow = style({
  display: 'flex',
  gap: spacing[6],
  alignItems: 'center',
});

export const priceRow = style([
  body.subSemibold,
  {
    height: '26px',
    display: 'flex',
    alignItems: 'baseline',
    color: color.text.primary,
  },
]);

export const priceAmount = style([title.lgSemibold, { color: 'inherit' }]);
export const priceUnit = style([
  title.mdSemibold,
  { color: 'inherit', marginLeft: spacing[2] },
]);
