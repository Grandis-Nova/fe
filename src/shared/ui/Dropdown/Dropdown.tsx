import { ChevronDown, ChevronUp } from 'lucide-react'

import * as styles from './Dropdown.css'

export type DropdownProps = {
  label: string
  options: string[]
  open?: boolean
  size?: 'medium' | 'small'
  selectedOption?: string
  width?: string
  onToggle?: () => void
  onSelect?: (option: string, index: number) => void
  className?: string
}

export function Dropdown({
  label,
  options,
  open = false,
  size = 'medium',
  selectedOption,
  width,
  onToggle,
  onSelect,
  className,
}: DropdownProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={width ? { width } : undefined}
    >
      <div
        className={[styles.box, styles.size[size], open && styles.boxOpen]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          type="button"
          className={styles.trigger[size]}
          onClick={onToggle}
          aria-expanded={open}
        >
          <span className={styles.triggerLabel}>{selectedOption ?? label}</span>
          {open ? (
            <ChevronUp className={styles.triggerIcon[size]} aria-hidden="true" />
          ) : (
            <ChevronDown
              className={styles.triggerIcon[size]}
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {open && (
        <div className={[styles.menu, styles.menuSize[size]].join(' ')}>
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              className={[
                styles.option[size],
                option === selectedOption && styles.optionSelected,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelect?.(option, index)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
