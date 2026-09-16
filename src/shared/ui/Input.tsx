import type { InputHTMLAttributes } from 'react'
import alertIcon from '../assets/icons/alert-circle.svg'
import * as styles from './Input.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  size?: 'medium' | 'small'
  error?: string
}

export function Input({ label, size = 'medium', error, className, placeholder, ...rest }: InputProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={[styles.box[size], error && styles.boxError].filter(Boolean).join(' ')}>
        <input className={styles.field} placeholder={placeholder ?? ' '} {...rest} />
        <label className={styles.label}>{label}</label>
      </div>
      {error && (
        <div className={styles.errorRow}>
          <img src={alertIcon} alt="" className={styles.errorIcon} />
          <span className={styles.errorText}>{error}</span>
        </div>
      )}
    </div>
  )
}
