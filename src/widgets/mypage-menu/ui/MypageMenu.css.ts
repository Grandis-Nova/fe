import { style, styleVariants } from '@vanilla-extract/css';

import { color } from '@/shared/config/theme/tokens/color/semantic.css';
import { spacing } from '@/shared/config/theme/tokens/spacing';
import { fontWeight } from '@/shared/config/theme/tokens/typography/base';
import {
  body,
  title,
} from '@/shared/config/theme/tokens/typography/semantic.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[30],
  width: '202px',
  padding: spacing[20],
  borderRadius: '12px',
  background: color.background.surface,
});

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  alignItems: 'flex-start',
});

export const headingLabel = style([
  body.subMedium,
  { color: color.text.tertiary },
]);
export const userName = style([
  title.lgSemibold,
  { color: color.text.primary },
]);

export const sections = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[20],
  width: '100%',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  width: '100%',
});

export const sectionTitle = styleVariants({
  active: [body.subMedium, { color: color.primary.focus, textAlign: 'left' }],
  inactive: [
    body.subMedium,
    { color: color.text.tertiary, textAlign: 'left' },
  ],
});

export const linkList = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing[6],
});

export const link = style([
  body.sub,
  {
    padding: `${spacing[2]} 0`,
    color: color.text.secondary,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
]);

export const linkActive = style({
  fontWeight: fontWeight.semibold,
  color: color.primary.base,
  borderBottom: `1.5px solid ${color.primary.base}`,
});
