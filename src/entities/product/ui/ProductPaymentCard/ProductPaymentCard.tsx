import { typography } from '@/shared/config/theme'
import { Checkbox } from '@/shared/ui'

import * as styles from './ProductPaymentCard.css'

export type ProductPaymentCardVariant =
  'default' | 'preorder-pending' | 'checkout' | 'cart'

export type ProductPaymentCardItem = {
  imageSrc?: string
  name: string
  modelNumber: string
  optionSummary: string
  quantityLabel: string
  priceLabel: string
}

export type ProductPaymentCardProps = {
  variant?: ProductPaymentCardVariant
  product: ProductPaymentCardItem
  actionLabel?: string
  onActionClick?: () => void
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

export function ProductPaymentCard({
  variant = 'default',
  product: { imageSrc, name, modelNumber, optionSummary, quantityLabel, priceLabel },
  actionLabel,
  onActionClick,
  checked = false,
  onCheckedChange,
  className,
}: ProductPaymentCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {variant === 'cart' && (
        <Checkbox
          checked={checked}
          onChange={(event) => onCheckedChange?.(event.target.checked)}
        />
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
              <div
                className={[typography.title.mdSemibold, styles.name].join(' ')}
              >
                {name}
              </div>
              <div
                className={[typography.body.subMedium, styles.modelNumber].join(
                  ' ',
                )}
              >
                {modelNumber}
              </div>
            </div>
            {(variant === 'preorder-pending' || variant === 'checkout') && (
              <button
                type="button"
                className={[
                  typography.body.subMedium,
                  styles.action,
                  variant === 'checkout'
                    ? styles.actionCheckout
                    : styles.actionPending,
                ].join(' ')}
                disabled={variant === 'preorder-pending'}
                onClick={onActionClick}
              >
                {actionLabel}
              </button>
            )}
          </div>
          <div
            className={[typography.body.sub, styles.optionSummary].join(' ')}
          >
            {optionSummary}
          </div>
        </div>
        <div
          className={[
            typography.title.mdSemibold,
            styles.quantityPriceRow,
          ].join(' ')}
        >
          <span>{quantityLabel}</span>
          <span className={typography.title.lgSemibold}>{priceLabel}</span>
        </div>
      </div>
    </div>
  )
}
