import { SelectButton } from '@/shared/ui'

import * as styles from './ProductCard.css'

export type ProductColorSwatch = {
  hex: string
  label: string
}

export type ProductStorageOption = {
  label: string
  selected?: boolean
}

export type ProductCardProps = {
  imageSrc: string
  imageAlt?: string
  name: string
  modelNumber: string
  colorName: string
  colorSwatches: ProductColorSwatch[]
  storageOptions: ProductStorageOption[]
  onStorageSelect?: (index: number) => void
  priceAmount: string
  priceUnit?: string
  className?: string
}

export function ProductCard({
  imageSrc,
  imageAlt = '',
  name,
  modelNumber,
  colorName,
  colorSwatches,
  storageOptions,
  onStorageSelect,
  priceAmount,
  priceUnit = '원',
  className,
}: ProductCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.media}>
        <div className={styles.mediaSurface} />
        <div className={styles.dots}>
          {[0, 1, 2].map((index) => (
            <span key={index} className={[styles.dot, index === 0 && styles.dotActive].filter(Boolean).join(' ')} />
          ))}
        </div>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.modelNumber}>{modelNumber}</p>
        </div>
        <div className={styles.colorRow}>
          <p className={styles.colorName}>{colorName}</p>
          <div className={styles.swatchRow}>
            {colorSwatches.map((swatch, index) => (
              <span
                key={swatch.label}
                title={swatch.label}
                className={styles.swatch}
                style={{ background: swatch.hex, borderWidth: index === 0 ? '2px' : undefined }}
              />
            ))}
          </div>
        </div>
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
        <p className={styles.priceRow}>
          <span className={styles.priceAmount}>{priceAmount}</span>
          <span className={styles.priceUnit}>{priceUnit}</span>
        </p>
      </div>
    </div>
  )
}
