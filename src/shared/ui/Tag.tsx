import type { HTMLAttributes } from 'react'
import * as styles from './Tag.css'

type TagColor = 'primary' | 'secondary' | 'blue' | 'green' | 'yellow' | 'red' | 'gray'
type TagVariant = 'solid' | 'subtle' | 'outline'
type TagShape = 'pill' | 'rounded'

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  color?: TagColor
  variant?: TagVariant
  shape?: TagShape
}

export function Tag({
  color = 'primary',
  variant = 'solid',
  shape = 'pill',
  className,
  children,
  ...rest
}: TagProps) {
  const variantClassName = styles[variant][color]

  return (
    <span className={[styles.shape[shape], variantClassName, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  )
}
