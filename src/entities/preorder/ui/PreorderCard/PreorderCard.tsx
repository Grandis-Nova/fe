import { typography } from '@/shared/config/theme'

import * as styles from './PreorderCard.css'

export type PreorderCardData = {
  imageSrc: string
  imageAlt?: string
  title: string
  period: string
}

export type PreorderCardProps = {
  data: PreorderCardData
  className?: string
}

export function PreorderCard({ data, className }: PreorderCardProps) {
  const { imageSrc, imageAlt = '', title, period } = data

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <img src={imageSrc} alt={imageAlt} className={styles.image} />
      <div className={styles.body_}>
        <div className={[typography.title.mdMedium, styles.title_].join(' ')}>
          {title}
        </div>
        <div className={[typography.body.caption, styles.period].join(' ')}>
          {period}
        </div>
      </div>
    </div>
  )
}
