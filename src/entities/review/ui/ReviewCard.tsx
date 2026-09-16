import * as styles from './ReviewCard.css'

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
        <p className={styles.rating}>{'★'.repeat(Math.max(0, Math.min(5, rating)))}</p>
        <div className={styles.textGroup}>
          <p className={styles.reviewText}>{reviewText}</p>
          <p className={styles.productName}>{productName}</p>
        </div>
      </div>
      <div className={styles.meta}>
        <span>{maskedAuthorName}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}
