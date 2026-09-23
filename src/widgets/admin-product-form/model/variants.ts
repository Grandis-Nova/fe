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
  return [colorName, ...optionLabels].join(KEY_SEPARATOR)
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
  const namedColors = value.colors.filter(
    (colorOption) => colorOption.noColor || colorOption.name.trim() !== '',
  )
  if (namedColors.length === 0) return []

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

  return namedColors.flatMap((colorOption) => {
    const colorName = colorOption.noColor ? '색상 없음' : colorOption.name
    return combos.map((combo) => ({
      key: buildVariantKey(colorName, combo.labels),
      colorName,
      optionLabels: combo.labels,
      price: value.basePrice + combo.extraPrice,
    }))
  })
}
