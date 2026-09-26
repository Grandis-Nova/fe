import { typography } from '@/shared/config/theme'

import * as styles from './ReviewCard.css'

const MAX_RATING = 5

export type ReviewCardProps = {
  thumbnailSrc?: string
  rating: number
  reviewText: string
  productName: string
  maskedAuthorName: string
  date: string
  className?: string
}

export function ReviewCard({
  thumbnailSrc,
  rating,
  reviewText,
  productName,
  maskedAuthorName,
  date,
  className,
}: ReviewCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {thumbnailSrc ? (
        <img src={thumbnailSrc} alt="" className={styles.thumbnail} />
      ) : (
        <div className={styles.thumbnail} />
      )}
      <div className={styles.main}>
        <div className={styles.top}>
          <div
            className={styles.rating}
            role="img"
            aria-label={`별점 ${rating}점`}
          >
            {Array.from({ length: MAX_RATING }, (_, index) => (
              <span
                key={index}
                className={styles.star[index < rating ? 'filled' : 'empty']}
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </div>
          <div
            className={[typography.body.defaultRegular, styles.reviewText].join(
              ' ',
            )}
          >
            {reviewText}
          </div>
        </div>
        <div className={[typography.body.sub, styles.productName].join(' ')}>
          {productName}
        </div>
      </div>
      <div className={[typography.body.sub, styles.meta].join(' ')}>
        <span>{maskedAuthorName}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}
