import { typography } from '@/shared/config/theme'

import * as styles from './AddressCard.css'

export type AddressCardData = {
  id: string
  label: string
  recipientName: string
  phone: string
  fullAddress: string
  isDefault?: boolean
}

export type AddressCardProps = {
  address: AddressCardData
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  className,
}: AddressCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <div className={[typography.body.defaultMedium, styles.label].join(' ')}>
          {address.label}
        </div>
        {address.isDefault && (
          <span className={[typography.body.caption, styles.badge].join(' ')}>
            기본 배송지
          </span>
        )}
      </div>
      <div className={[typography.body.sub, styles.recipient].join(' ')}>
        {address.recipientName} · {address.phone}
      </div>
      <div className={[typography.body.sub, styles.fullAddress].join(' ')}>
        {address.fullAddress}
      </div>
      <div className={styles.actionRow}>
        <button
          type="button"
          className={styles.action}
          onClick={() => onEdit?.(address.id)}
        >
          수정
        </button>
        <button
          type="button"
          className={styles.action}
          onClick={() => onDelete?.(address.id)}
        >
          삭제
        </button>
      </div>
    </div>
  )
}
