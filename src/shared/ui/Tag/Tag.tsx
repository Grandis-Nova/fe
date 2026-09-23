import type { HTMLAttributes } from 'react'

import { outline, shape as shapeStyles, solid, subtle } from './Tag.css'

type TagColor =
  'primary' | 'secondary' | 'blue' | 'green' | 'yellow' | 'red' | 'gray'
type TagVariant = 'solid' | 'subtle' | 'outline'

const variantStyles = { solid, subtle, outline }

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  color?: TagColor
  variant?: TagVariant
  rounded?: boolean
}

export function Tag({
  color = 'primary',
  variant = 'solid',
  rounded = true,
  className,
  children,
  ...rest
}: TagProps) {
  const variantClassName = variantStyles[variant][color]

  return (
    <span
      className={[
        shapeStyles[rounded ? 'full' : 'rect'],
        variantClassName,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </span>
  )
}
