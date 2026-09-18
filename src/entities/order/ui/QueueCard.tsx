import { Rocket } from 'lucide-react'

import { color } from '@/shared/config/theme'

import * as styles from './QueueCard.css'

export type QueueCardProps = {
  headline: string
  headlineAccent: string
  productName: string
  myOrderLabel?: string
  myOrderNumber: string
  progressPercent: number
  noticeText?: string
  totalWaitingLabel?: string
  totalWaitingCount: string
  className?: string
}

export function QueueCard({
  headline,
  headlineAccent,
  productName,
  myOrderLabel = '나의 대기 순서',
  myOrderNumber,
  progressPercent,
  noticeText = '・모달창을 닫으면 순번이 뒤로 미뤄집니다.',
  totalWaitingLabel = '전체 대기인원',
  totalWaitingCount,
  className,
}: QueueCardProps) {
  const clampedPercent = Math.max(0, Math.min(100, progressPercent))

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.headline}>
        <div className={styles.headlineText}>
          {headline}
          <br />
          <span className={styles.headlineAccent}>{headlineAccent}</span>
        </div>
        <Rocket className={styles.icon} color={color.text.tertiary} aria-hidden="true" />
      </div>
      <div className={styles.productName}>{productName}</div>
      <div className={styles.panel}>
        <div className={styles.orderGroup}>
          <div className={styles.orderLabel}>{myOrderLabel}</div>
          <div className={styles.orderNumber}>{myOrderNumber}</div>
        </div>
        <div className={styles.progressGroup}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${clampedPercent}%` }} />
            <Rocket
              color={color.text.inverse}
              className={styles.progressMark}
              style={{ left: `${clampedPercent}%` }}
              aria-hidden="true"
            />
          </div>
          <div className={styles.noticeText}>{noticeText}</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.totalRow}>
          <div className={styles.totalLabel}>{totalWaitingLabel}</div>
          <div className={styles.totalValue}>{totalWaitingCount}</div>
        </div>
      </div>
    </div>
  )
}
