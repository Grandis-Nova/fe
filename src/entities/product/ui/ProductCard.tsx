import { SelectButton } from '@/shared/ui';

import * as styles from './ProductCard.css';
import { ProductColorSwatches } from './ProductColorSwatches';

import type { ProductColorSwatchItem } from './ProductColorSwatches';

export type ProductStorageOption = {
  label: string;
  selected?: boolean;
};

export type ProductCardData = {
  imageSrc: string;
  imageAlt?: string;
  name: string;
  modelNumber: string;
  colorName: string;
  colorSwatches: ProductColorSwatchItem[];
  storageOptions: ProductStorageOption[];
  priceAmount: string;
  priceUnit?: string;
};

export type ProductCardProps = {
  product: ProductCardData;
  onColorSelect?: (index: number) => void;
  onStorageSelect?: (index: number) => void;
  className?: string;
};

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
  } = product;
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.media}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.nameGroup}>
          <div className={styles.name}>{name}</div>
          <div className={styles.modelNumber}>{modelNumber}</div>
        </div>
        <ProductColorSwatches
          colorName={colorName}
          size='small'
          colors={colorSwatches}
          onSelect={onColorSelect}
        />
        <div className={styles.storageRow}>
          {storageOptions.map((option, index) => (
            <SelectButton
              key={option.label}
              size='small'
              selected={option.selected}
              onClick={() => onStorageSelect?.(index)}
            >
              {option.label}
            </SelectButton>
          ))}
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceAmount}>{priceAmount}</span>
          <span className={styles.priceUnit}>{priceUnit}</span>
        </div>
      </div>
    </div>
  );
}
