import type { InputHTMLAttributes } from 'react'

import { AlertCircle } from 'lucide-react'

import * as styles from './Input.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  size?: 'medium' | 'small'
  required?: boolean
  error?: string
}

export function Input({
  label,
  size = 'medium',
  required,
  error,
  className,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div
        className={[styles.box[size], error && styles.boxError]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          className={[styles.field[size], error && styles.fieldError]
            .filter(Boolean)
            .join(' ')}
          placeholder={placeholder ?? ' '}
          required={required}
          {...rest}
        />
        <label
          className={[styles.label[size], error && styles.labelError]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
          {required && ' *'}
        </label>
      </div>
      {error && (
        <div className={styles.errorRow}>
          <AlertCircle className={styles.errorIcon[size]} aria-hidden="true" />
          <span className={styles.errorText[size]}>{error}</span>
        </div>
      )}
    </div>
  )
}
