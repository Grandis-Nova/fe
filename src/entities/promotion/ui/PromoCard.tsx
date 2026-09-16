import * as styles from './PromoCard.css'

export type PromoCardProps = {
  imageSrc: string
  imageAlt?: string
  title: string
  period: string
  className?: string
}

export function PromoCard({ imageSrc, imageAlt = '', title, period, className }: PromoCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <img src={imageSrc} alt={imageAlt} className={styles.image} />
      <div className={styles.body_}>
        <p className={styles.title_}>{title}</p>
        <p className={styles.period}>{period}</p>
      </div>
    </div>
  )
}
