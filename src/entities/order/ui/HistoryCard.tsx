import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ProductPaymentCard } from '@/entities/product'
import * as styles from './HistoryCard.css'

export type HistoryCardStatus =
  | 'delivered-before-review'
  | 'delivered-after-review'
  | 'shipping'
  | 'preparing'
  | 'cancelled'

export type HistoryCardItem = {
  imageSrc?: string
  name: string
  modelNumber: string
  optionSummary: string
  quantityLabel: string
  priceLabel: string
}

export type HistoryCardProps = {
  status: HistoryCardStatus
  orderDate: string
  orderNumber: string
  items: HistoryCardItem[]
  onWriteReview?: () => void
  onViewReview?: () => void
  onCancelOrder?: () => void
  className?: string
}

const badgeByStatus: Record<HistoryCardStatus, { label: string; variant: keyof typeof styles.badge }> = {
  'delivered-before-review': { label: '배송 완료', variant: 'delivered' },
  'delivered-after-review': { label: '배송 완료', variant: 'delivered' },
  shipping: { label: '배송중', variant: 'shipping' },
  preparing: { label: '상품 준비 중', variant: 'preparing' },
  cancelled: { label: '취소 완료', variant: 'cancelled' },
}

export function HistoryCard({
  status,
  orderDate,
  orderNumber,
  items,
  onWriteReview,
  onViewReview,
  onCancelOrder,
  className,
}: HistoryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const badge = badgeByStatus[status]
  const [firstItem, ...restItems] = items
  const visibleItems = expanded ? items : firstItem ? [firstItem] : []

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <p className={styles.orderDate}>{orderDate} 주문</p>
          <p className={styles.orderNumber}>{orderNumber}</p>
        </div>
        <span className={styles.badge[badge.variant]}>{badge.label}</span>
      </div>

      {visibleItems.map((item, index) => (
        <div key={`${item.name}-${index}`}>
          {index > 0 && <div className={styles.divider} />}
          <div className={styles.itemRow}>
            <ProductPaymentCard
              imageSrc={item.imageSrc}
              name={item.name}
              modelNumber={item.modelNumber}
              optionSummary={item.optionSummary}
              quantityLabel={item.quantityLabel}
              priceLabel={item.priceLabel}
            />
          </div>
        </div>
      ))}

      {status === 'delivered-before-review' && (
        <div className={styles.actionRow}>
          <button type="button" className={styles.primaryAction} onClick={onWriteReview}>
            리뷰 쓰기
          </button>
        </div>
      )}
      {status === 'delivered-after-review' && (
        <div className={styles.actionRow}>
          <button type="button" className={styles.secondaryAction} onClick={onViewReview}>
            내가 쓴 리뷰 보기
          </button>
        </div>
      )}
      {status === 'preparing' && (
        <div className={styles.actionRow}>
          <button type="button" className={styles.cancelAction} onClick={onCancelOrder}>
            주문 취소
          </button>
        </div>
      )}

      {restItems.length > 0 && (
        <>
          <div className={styles.divider} />
          <button type="button" className={styles.expandRow} onClick={() => setExpanded((value) => !value)}>
            {expanded ? '접기' : `${restItems.length}개 더 보기`}
            <ChevronDown
              aria-hidden="true"
              className={[styles.expandIcon, expanded && styles.expandIconOpen].filter(Boolean).join(' ')}
            />
          </button>
        </>
      )}
    </div>
  )
}
