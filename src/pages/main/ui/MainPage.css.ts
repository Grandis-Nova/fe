import { style } from '@vanilla-extract/css';

import { color } from '@/shared/config/theme/tokens/color/semantic.css';
import { spacing } from '@/shared/config/theme/tokens/spacing';
import { title as titleToken } from '@/shared/config/theme/tokens/typography/semantic.css';

export const hero = style({
  position: 'relative',
  width: '100%',
  height: '900px',
  overflow: 'hidden',
});

// apple-design 스킬 §15(타이포그래피) + §12(vibrancy): 배경 위에 얹히는 큰 텍스트는
// 살짝 더 타이트한 자간/행간을 쓰고, 반투명/움직이는 배경 위에서도 또렷이 읽히도록
// 흐린 회색이 아니라 고대비 색을 쓴다.
export const title = style([
  titleToken.xxlSemibold,
  {
    position: 'relative',
    zIndex: 1,
    color: color.text.inverse,
    padding: `${spacing[60]} ${spacing[20]} 0`,
    textAlign: 'center',
  },
]);
