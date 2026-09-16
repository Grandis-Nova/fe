import type { InputHTMLAttributes } from 'react'
import checkIcon from '../assets/icons/check.svg'
import * as styles from './Checkbox.css'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  checked?: boolean
}

export function Checkbox({ checked = false, className, ...rest }: CheckboxProps) {
  return (
    <span className={[styles.root, className].filter(Boolean).join(' ')}>
      <input type="checkbox" className={styles.input} checked={checked} {...rest} />
      <span className={styles.box}>{checked && <img src={checkIcon} alt="" className={styles.icon} />}</span>
    </span>
  )
}
