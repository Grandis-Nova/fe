import type { InputHTMLAttributes } from 'react'

import * as styles from './Toggle.css'

export type ToggleProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> & {
  checked?: boolean
}

export function Toggle({ checked = false, className, ...rest }: ToggleProps) {
  return (
    <span className={[styles.root, className].filter(Boolean).join(' ')}>
      <input
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={checked}
        {...rest}
      />
      <span className={styles.track} />
      <span className={styles.thumb} />
    </span>
  )
}
