import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

import { breakpoint } from './tokens/breakpoint'
import { maxWidth } from './tokens/container'
import { spacing } from './tokens/spacing'
import { fontSize } from './tokens/typography/base'

const marginScale = { ...spacing, auto: 'auto' }

// admin을 제외한 pages/widgets의 반응형 레이아웃(모바일 ↔ 데스크톱)을 위한 유틸.
// 모바일 우선: 기본값이 모바일, desktop 조건에서만 덮어쓴다.
const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    desktop: { '@media': breakpoint.desktop },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'block', 'flex', 'inline-flex'],
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
