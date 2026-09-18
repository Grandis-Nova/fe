import * as styles from './PreorderCard.css'

export type PreorderCardProps = {
  imageSrc: string
  imageAlt?: string
  title: string
  period: string
  className?: string
}

export function PreorderCard({ imageSrc, imageAlt = '', title, period, className }: PreorderCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <img src={imageSrc} alt={imageAlt} className={styles.image} />
      <div className={styles.body_}>
        <div className={styles.title_}>{title}</div>
        <div className={styles.period}>{period}</div>
      </div>
    </div>
  )
}
