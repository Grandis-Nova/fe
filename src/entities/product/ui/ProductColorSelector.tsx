import * as styles from './ProductColorSelector.css'
import { ProductColorSwatches } from './ProductColorSwatches'

export type ProductColorOption = {
  hex: string
  selected?: boolean
}

export type ProductColorSelectorProps = {
  label?: string
  colorName: string
  options: ProductColorOption[]
  onSelect?: (index: number) => void
  className?: string
}

export function ProductColorSelector({
  label = '색상',
  colorName,
  options,
  onSelect,
  className,
}: ProductColorSelectorProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.label}>{label}</div>
      <ProductColorSwatches colorName={colorName} size="medium" colors={options} onSelect={onSelect} />
    </div>
  )
}
