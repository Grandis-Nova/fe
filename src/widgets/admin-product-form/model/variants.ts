import type { AdminProductFormValue, ProductOptionGroup } from './types'

export type ProductVariant = {
  /** quantities 맵의 키 */
  key: string
  colorName: string
  /** 옵션 그룹 순서대로의 선택값 라벨 */
  optionLabels: string[]
  price: number
}

const KEY_SEPARATOR = '|'

export function buildVariantKey(colorName: string, optionLabels: string[]) {
  // 색상도 옵션도 없는 경우 키가 빈 문자열이 되지 않게 한다.
  return [colorName, ...optionLabels].join(KEY_SEPARATOR) || 'default'
}

/** 옵션 그룹들의 값을 곱집합으로 펼친다 */
function combineOptionValues(groups: ProductOptionGroup[]) {
  return groups.reduce<{ labels: string[]; extraPrice: number }[]>(
    (acc, group) =>
      acc.flatMap((combo) =>
        group.values.map((value) => ({
          labels: [...combo.labels, value.label],
          extraPrice: combo.extraPrice + value.extraPrice,
        })),
      ),
    [{ labels: [], extraPrice: 0 }],
  )
}

/**
 * 색상 × 옵션값 조합을 매번 새로 계산한다.
 * 조합을 상태로 저장하지 않기 때문에 색상이나 옵션을 추가·삭제해도
 * quantities에 남아 있는 수량이 그대로 붙는다.
 */
export function getProductVariants(
  value: Pick<AdminProductFormValue, 'colors' | 'optionGroups' | 'basePrice'>,
): ProductVariant[] {
  const filledGroups = value.optionGroups.filter((group) =>
    group.values.some((optionValue) => optionValue.label.trim() !== ''),
  )
  const combos = combineOptionValues(
    filledGroups.map((group) => ({
      ...group,
      values: group.values.filter(
        (optionValue) => optionValue.label.trim() !== '',
      ),
    })),
  )

  // '색상 없음'을 체크하면 색상은 조합 축에서 빠지고 옵션만 남는다.
  if (value.colors.some((colorOption) => colorOption.noColor)) {
    return combos.map((combo) => ({
      key: buildVariantKey('', combo.labels),
      colorName: '',
      optionLabels: combo.labels,
      price: value.basePrice + combo.extraPrice,
    }))
  }

  const namedColors = value.colors.filter(
    (colorOption) => colorOption.name.trim() !== '',
  )
  if (namedColors.length === 0) return []

  return namedColors.flatMap((colorOption) =>
    combos.map((combo) => ({
      key: buildVariantKey(colorOption.name, combo.labels),
      colorName: colorOption.name,
      optionLabels: combo.labels,
      price: value.basePrice + combo.extraPrice,
    })),
  )
}
