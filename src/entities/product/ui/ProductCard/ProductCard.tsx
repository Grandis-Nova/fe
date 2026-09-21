import { typography } from '@/shared/config/theme'
import { SelectButton } from '@/shared/ui'

import { ProductColorSwatches } from '../ProductColorSwatches'

import * as styles from './ProductCard.css'

import type { ProductColorSwatchItem } from '../ProductColorSwatches'

export type ProductStorageOption = {
  label: string
  selected?: boolean
}

export type ProductCardData = {
  imageSrc: string
  imageAlt?: string
  name: string
  modelNumber: string
  colorName: string
  colorSwatches: ProductColorSwatchItem[]
  storageOptions: ProductStorageOption[]
  priceAmount: string
  priceUnit?: string
}

export type ProductCardProps = {
  product: ProductCardData
  onColorSelect?: (index: number) => void
  onStorageSelect?: (index: number) => void
  className?: string
}

export function ProductCard({
  product,
  onColorSelect,
  onStorageSelect,
  className,
}: ProductCardProps) {
  const {
    imageSrc,
    imageAlt = '',
    name,
    modelNumber,
    colorName,
    colorSwatches,
    storageOptions,
    priceAmount,
    priceUnit = '원',
  } = product
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.media}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.nameGroup}>
          <div className={[typography.title.mdMedium, styles.name].join(' ')}>
            {name}
          </div>
          <div className={[typography.body.sub, styles.modelNumber].join(' ')}>
            {modelNumber}
          </div>
        </div>
        <ProductColorSwatches
          colorName={colorName}
          size="small"
          colors={colorSwatches}
          onSelect={onColorSelect}
        />
        <div className={styles.storageRow}>
          {storageOptions.map((option, index) => (
            <SelectButton
              key={option.label}
              size="small"
              selected={option.selected}
              onClick={() => onStorageSelect?.(index)}
            >
              {option.label}
            </SelectButton>
          ))}
        </div>
        <div
          className={[typography.body.subSemibold, styles.priceRow].join(' ')}
        >
          <span
            className={[typography.title.lgSemibold, styles.priceAmount].join(
              ' ',
            )}
          >
            {priceAmount}
          </span>
          <span
            className={[typography.title.mdSemibold, styles.priceUnit].join(
              ' ',
            )}
          >
            {priceUnit}
          </span>
        </div>
      </div>
    </div>
  )
}
