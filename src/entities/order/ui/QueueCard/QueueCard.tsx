import { Rocket } from 'lucide-react'

import { typography } from '@/shared/config/theme'

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
        <div
          className={[typography.title.lgSemibold, styles.headlineText].join(
            ' ',
          )}
        >
          {headline}
          <br />
          <span className={styles.headlineAccent}>{headlineAccent}</span>
        </div>
        <Rocket className={styles.icon} aria-hidden="true" />
      </div>
      <div
        className={[typography.body.defaultMedium, styles.productName].join(
          ' ',
        )}
      >
        {productName}
      </div>
      <div className={styles.panel}>
        <div className={styles.orderGroup}>
          <div
            className={[typography.body.caption, styles.orderLabel].join(' ')}
          >
            {myOrderLabel}
          </div>
          <div
            className={[typography.title.xlSemibold, styles.orderNumber].join(
              ' ',
            )}
          >
            {myOrderNumber}
          </div>
        </div>
        <div className={styles.progressGroup}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${clampedPercent}%` }}
            />
            <Rocket
              className={styles.progressMark}
              style={{ left: `${clampedPercent}%` }}
              aria-hidden="true"
            />
          </div>
          <div
            className={[typography.body.caption, styles.noticeText].join(' ')}
          >
            {noticeText}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.totalRow}>
          <div
            className={[typography.body.caption, styles.totalLabel].join(' ')}
          >
            {totalWaitingLabel}
          </div>
          <div
            className={[typography.body.subSemibold, styles.totalValue].join(
              ' ',
            )}
          >
            {totalWaitingCount}
          </div>
        </div>
      </div>
    </div>
  )
}
