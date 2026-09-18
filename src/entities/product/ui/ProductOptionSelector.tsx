import { SelectButton } from '@/shared/ui'

import * as styles from './ProductOptionSelector.css'

export type ProductOption = {
  label: string
  selected?: boolean
}

export type ProductOptionSelectorProps = {
  label: string
  options: ProductOption[]
  onSelect?: (index: number) => void
  className?: string
}

export function ProductOptionSelector({ label, options, onSelect, className }: ProductOptionSelectorProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.label}>{label}</div>
      <div className={styles.optionRow}>
        {options.map((option, index) => (
          <SelectButton
            key={option.label}
            size="medium"
            selected={option.selected}
            onClick={() => onSelect?.(index)}
          >
            {option.label}
          </SelectButton>
        ))}
      </div>
    </div>
  )
}
