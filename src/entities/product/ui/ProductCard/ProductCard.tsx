import { useNavigate } from 'react-router'

import { typography } from '@/shared/config/theme'
import { Slider } from '@/shared/ui'

import { ProductColorSwatches } from '../ProductColorSwatches'
import { ProductOptionSelector } from '../ProductOptionSelector'

import * as styles from './ProductCard.css'

import type { ProductColorSwatchItem } from '../ProductColorSwatches'

export type ProductStorageOption = {
  label: string
  selected?: boolean
  // 이 용량을 고르면 기본가에 더해지는 추가요금. 없으면 0원 취급.
  extraPrice?: number
}

export type ProductCardData = {
  imageSrcs: string[]
  imageAlt?: string
  name: string
  modelNumber: string
  colorName: string
  colorSwatches: ProductColorSwatchItem[]
  storageOptions: ProductStorageOption[]
  basePrice: number
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
  const navigate = useNavigate()
  const {
    imageSrcs,
    imageAlt = '',
    name,
    modelNumber,
    colorName,
    colorSwatches,
    storageOptions,
    basePrice,
    priceUnit = '원',
  } = product
  const selectedStorage = storageOptions.find((option) => option.selected)
  const totalPrice = basePrice + (selectedStorage?.extraPrice ?? 0)
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.media}>
        <div className={styles.sliderFill}>
          {/* key를 imageSrcs에 묶어 Slider를 다시 마운트시킨다 — imageSrcs를 바꾸는 건
              색상 선택뿐이라(용량 선택은 안 건드림), 이렇게 하면 색상 바뀔 때만
              슬라이더가 첫 장으로 리셋된다. */}
          <Slider key={imageSrcs.join('|')}>
            {imageSrcs.map((src) => (
              <img
                key={src}
                src={src}
                alt={imageAlt}
                className={styles.image}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.nameGroup}>
          <div className={styles.name} onClick={() => navigate('/products/1')}>
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
        <ProductOptionSelector
          label="용량"
          size="small"
          options={storageOptions}
          onSelect={onStorageSelect}
        />
        <div
          className={[typography.body.subSemibold, styles.priceRow].join(' ')}
        >
          <span
            className={[typography.title.lgSemibold, styles.priceAmount].join(
              ' ',
            )}
          >
            {totalPrice.toLocaleString()}
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
