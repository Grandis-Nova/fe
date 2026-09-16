import type { ButtonHTMLAttributes } from 'react'
import * as styles from './SelectButton.css'

export type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'medium' | 'small'
  selected?: boolean
}

export function SelectButton({
  size = 'small',
  selected = false,
  className,
  children,
  ...rest
}: SelectButtonProps) {
  return (
    <button
      type="button"
      className={[styles.size[size], selected && styles.selected, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
