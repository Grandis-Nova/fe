import { Checkbox } from '@/shared/ui'

import * as styles from './ProductPaymentCard.css'

export type ProductPaymentCardVariant = 'default' | 'preorder-pending' | 'checkout' | 'cart'

export type ProductPaymentCardProps = {
  variant?: ProductPaymentCardVariant
  imageSrc?: string
  name: string
  modelNumber: string
  optionSummary: string
  quantityLabel: string
  priceLabel: string
  actionLabel?: string
  onActionClick?: () => void
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

export function ProductPaymentCard({
  variant = 'default',
  imageSrc,
  name,
  modelNumber,
  optionSummary,
  quantityLabel,
  priceLabel,
  actionLabel,
  onActionClick,
  checked = false,
  onCheckedChange,
  className,
}: ProductPaymentCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {variant === 'cart' && (
        <Checkbox checked={checked} onChange={(event) => onCheckedChange?.(event.target.checked)} />
      )}
      {imageSrc ? (
        <img src={imageSrc} alt="" className={styles.thumbnail} />
      ) : (
        <div className={styles.thumbnail} />
      )}
      <div className={styles.body_}>
        <div className={styles.infoGroup}>
          <div className={styles.titleRow}>
            <div>
              <div className={styles.name}>{name}</div>
              <div className={styles.modelNumber}>{modelNumber}</div>
            </div>
            {(variant === 'preorder-pending' || variant === 'checkout') && (
              <button
                type="button"
                className={[
                  styles.action,
                  variant === 'checkout' ? styles.actionCheckout : styles.actionPending,
                ].join(' ')}
                disabled={variant === 'preorder-pending'}
                onClick={onActionClick}
              >
                {actionLabel}
              </button>
            )}
          </div>
          <div className={styles.optionSummary}>{optionSummary}</div>
        </div>
        <div className={styles.quantityPriceRow}>
          <span>{quantityLabel}</span>
          <span className={styles.price}>{priceLabel}</span>
        </div>
      </div>
    </div>
  )
}
