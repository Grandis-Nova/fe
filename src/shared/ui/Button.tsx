import type { ButtonHTMLAttributes, ReactNode } from 'react'
import * as styles from './Button.css'

type ButtonColor = 'primary' | 'secondary' | 'cancel'
type ButtonVariant = 'solid' | 'outline'
type ButtonSize = 'medium' | 'small'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

export function Button({
  color = 'primary',
  variant = 'solid',
  size = 'medium',
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const variantClassName = variant === 'outline' ? styles.outline[color] : styles.solid[color]

  return (
    <button
      type="button"
      className={[styles.size[size], variantClassName, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}
