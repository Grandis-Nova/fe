import type { HTMLAttributes } from 'react'

import { outline, shape as shapeStyles, solid, subtle } from './Tag.css'

type TagColor =
  'primary' | 'secondary' | 'blue' | 'green' | 'yellow' | 'red' | 'gray'
type TagVariant = 'solid' | 'subtle' | 'outline'
type TagShape = 'pill' | 'rounded'

const variantStyles = { solid, subtle, outline }

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
  const variantClassName = variantStyles[variant][color]

  return (
    <span
      className={[shapeStyles[shape], variantClassName, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </span>
  )
}
