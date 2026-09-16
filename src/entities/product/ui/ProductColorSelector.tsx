import * as styles from './ProductColorSelector.css'

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
      <p className={styles.label}>{label}</p>
      <div className={styles.group}>
        <p className={styles.colorName}>{colorName}</p>
        <div className={styles.swatchRow}>
          {options.map((option, index) => (
            <button
              key={option.hex}
              type="button"
              aria-pressed={option.selected}
              className={[styles.swatch, option.selected && styles.swatchSelected].filter(Boolean).join(' ')}
              style={{ background: option.hex }}
              onClick={() => onSelect?.(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
