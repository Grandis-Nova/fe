import type { InputHTMLAttributes } from 'react'

import { AlertCircle } from 'lucide-react'

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
          <AlertCircle className={styles.errorIcon} aria-hidden="true" />
          <span className={styles.errorText}>{error}</span>
        </div>
      )}
    </div>
  )
}
