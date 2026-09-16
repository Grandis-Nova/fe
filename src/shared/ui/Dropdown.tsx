import chevronDown from '../assets/icons/chevron-down.svg'
import chevronUp from '../assets/icons/chevron-up.svg'
import * as styles from './Dropdown.css'

export type DropdownProps = {
  label: string
  options: string[]
  open?: boolean
  size?: 'medium' | 'small'
  selectedOption?: string
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
  onToggle,
  onSelect,
  className,
}: DropdownProps) {
  return (
    <div className={[styles.root, styles.size[size], open && styles.rootOpen, className].filter(Boolean).join(' ')}>
      <button type="button" className={styles.trigger} onClick={onToggle} aria-expanded={open}>
        {label}
        <img src={open ? chevronUp : chevronDown} alt="" className={styles.triggerIcon} />
      </button>
      {open &&
        options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={[styles.option, option === selectedOption && styles.optionSelected]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSelect?.(option, index)}
          >
            {option}
          </button>
        ))}
    </div>
  )
}
