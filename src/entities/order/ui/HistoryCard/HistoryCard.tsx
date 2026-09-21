import { useState, type ReactNode } from 'react'

import { ChevronDown } from 'lucide-react'

import { typography } from '@/shared/config/theme'

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
  renderItem: (item: HistoryCardItem, index: number) => ReactNode
  onWriteReview?: () => void
  onViewReview?: () => void
  onCancelOrder?: () => void
  className?: string
}

const badgeByStatus: Record<
  HistoryCardStatus,
  { label: string; variant: keyof typeof styles.badge }
> = {
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
  renderItem,
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
          <div
            className={[typography.body.subMedium, styles.orderDate].join(' ')}
          >
            {orderDate} 주문
          </div>
          <div
            className={[typography.body.caption, styles.orderNumber].join(' ')}
          >
            {orderNumber}
          </div>
        </div>
        <span
          className={[
            typography.body.caption,
            styles.badge[badge.variant],
          ].join(' ')}
        >
          {badge.label}
        </span>
      </div>

      {visibleItems.map((item, index) => (
        <div key={`${item.name}-${index}`}>
          {index > 0 && <div className={styles.divider} />}
          <div className={styles.itemRow}>{renderItem(item, index)}</div>
        </div>
      ))}

      {status === 'delivered-before-review' && (
        <div className={styles.actionRow}>
          <button
            type="button"
            className={[typography.body.subMedium, styles.primaryAction].join(
              ' ',
            )}
            onClick={onWriteReview}
          >
            리뷰 쓰기
          </button>
        </div>
      )}
      {status === 'delivered-after-review' && (
        <div className={styles.actionRow}>
          <button
            type="button"
            className={[typography.body.subMedium, styles.secondaryAction].join(
              ' ',
            )}
            onClick={onViewReview}
          >
            내가 쓴 리뷰 보기
          </button>
        </div>
      )}
      {status === 'preparing' && (
        <div className={styles.actionRow}>
          <button
            type="button"
            className={[typography.body.subMedium, styles.cancelAction].join(
              ' ',
            )}
            onClick={onCancelOrder}
          >
            주문 취소
          </button>
        </div>
      )}

      {restItems.length > 0 && (
        <>
          <div className={styles.divider} />
          <button
            type="button"
            className={[typography.body.sub, styles.expandRow].join(' ')}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? '접기' : `${restItems.length}개 더 보기`}
            <ChevronDown
              aria-hidden="true"
              className={[styles.expandIcon, expanded && styles.expandIconOpen]
                .filter(Boolean)
                .join(' ')}
            />
          </button>
        </>
      )}
    </div>
  )
}
