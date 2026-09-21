import type { ButtonHTMLAttributes, ReactNode } from 'react'

import * as styles from './Button.css'

type ButtonColor = 'primary' | 'secondary' | 'cancel'
type ButtonVariant = 'solid' | 'outline'
type ButtonSize = 'large' | 'medium' | 'small'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  rounded?: boolean
  icon?: ReactNode
}

export function Button({
  color = 'primary',
  variant = 'solid',
  size = 'medium',
  rounded,
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const variantClassName =
    variant === 'outline' ? styles.outline[color] : styles.solid[color]

  return (
    <button
      type="button"
      className={[
        styles.size[size],
        variantClassName,
        rounded && styles.rounded,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {children}
    </button>
  )
}
