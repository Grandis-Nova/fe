import type { ButtonHTMLAttributes } from 'react'

import * as styles from './ProductSummary.css'

export type ProductSummaryProps = {
  name: string
  optionSummary: string
  ctaLabel: string
  onCtaClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  className?: string
}

export function ProductSummary({ name, optionSummary, ctaLabel, onCtaClick, className }: ProductSummaryProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.options}>{optionSummary}</p>
      </div>
      <button type="button" className={styles.cta} onClick={onCtaClick}>
        {ctaLabel}
      </button>
    </div>
  )
}
