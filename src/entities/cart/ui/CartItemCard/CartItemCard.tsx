import { typography } from '@/shared/config/theme'

import * as styles from './CartItemCard.css'

export type CartItemCardData = {
  id: string
  imageSrc?: string
  name: string
  optionSummary: string
  quantity: number
  priceLabel: string
}

export type CartItemCardProps = {
  item: CartItemCardData
  onRemove?: (id: string) => void
  className?: string
}

export function CartItemCard({ item, onRemove, className }: CartItemCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {item.imageSrc && (
        <img src={item.imageSrc} alt={item.name} className={styles.image} />
      )}
      <div className={styles.info}>
        <div className={[typography.body.defaultMedium, styles.name].join(' ')}>
          {item.name}
        </div>
        <div className={[typography.body.sub, styles.option].join(' ')}>
          {item.optionSummary} · {item.quantity}개
        </div>
        <div className={[typography.body.defaultMedium, styles.price].join(' ')}>
          {item.priceLabel}
        </div>
      </div>
      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove?.(item.id)}
      >
        삭제
      </button>
    </div>
  )
}
