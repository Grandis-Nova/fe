import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

import { breakpoint } from './tokens/breakpoint'
import { color } from './tokens/color/semantic.css'
import { maxWidth } from './tokens/container'
import { spacing } from './tokens/spacing'
import { fontSize } from './tokens/typography/base'

const marginScale = { ...spacing, auto: 'auto' }

// typography 프리셋(title.xlSemibold 등)엔 색상이 없으므로, 텍스트 색만 sprinkles로 얹어
// typography 클래스 + sprinkles(color) 조합만으로 색 있는 텍스트를 완성할 수 있게 한다
// (그때그때 .css.ts를 새로 만들지 않아도 되도록).
const textColor = {
  primary: color.text.primary,
  secondary: color.text.secondary,
  tertiary: color.text.tertiary,
  disabled: color.text.disabled,
  inverse: color.text.inverse,
}

// admin을 제외한 pages/widgets의 반응형 레이아웃(모바일 ↔ 데스크톱)을 위한 유틸.
// 모바일 우선: 기본값이 모바일, desktop 조건에서만 덮어쓴다.
const responsiveProperties = defineProperties({
  conditions: {
    mobile: { '@media': breakpoint.mobile },
    desktop: { '@media': breakpoint.desktop },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'block', 'flex', 'inline-flex', 'grid'],
    flexDirection: ['row', 'column'],
    alignItems: ['flex-start', 'center', 'flex-end', 'stretch'],
    justifyContent: ['flex-start', 'center', 'flex-end', 'space-between'],
    flexWrap: ['nowrap', 'wrap'],
    gap: spacing,
    paddingTop: spacing,
    paddingRight: spacing,
    paddingBottom: spacing,
    paddingLeft: spacing,
    marginTop: marginScale,
    marginRight: marginScale,
    marginBottom: marginScale,
    marginLeft: marginScale,
    maxWidth,
    fontSize,
    color: textColor,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
})

export const sprinkles = createSprinkles(responsiveProperties)
export type Sprinkles = Parameters<typeof sprinkles>[0]
