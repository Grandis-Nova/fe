import { useNavigate } from 'react-router'

import * as styles from './PreorderCard.css'

export type PreorderCardData = {
  id: string | number
  imageSrc: string
  imageAlt?: string
  title: string
  opens_at: string
  closes_at: string
}

export type PreorderCardProps = {
  data: PreorderCardData
  className?: string
}

export function PreorderCard({ data, className }: PreorderCardProps) {
  const { imageSrc, imageAlt = '', title, opens_at, closes_at } = data
  const navigate = useNavigate()

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      onClick={() => navigate(`/preorder/${data.id}`)}
    >
      <img src={imageSrc} alt={imageAlt} className={styles.image} />
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.period}>{`${opens_at} ~ ${closes_at}`}</div>
      </div>
    </div>
  )
}
