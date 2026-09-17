import { SelectButton } from '@/shared/ui';

import * as styles from './ProductCard.css';
import { ProductColorSwatches } from './ProductColorSwatches';

export type ProductColorSwatch = {
  hex: string;
  label: string;
};

export type ProductStorageOption = {
  label: string;
  selected?: boolean;
};

export type ProductCardProps = {
  imageSrc: string;
  imageAlt?: string;
  name: string;
  modelNumber: string;
  colorName: string;
  colorSwatches: ProductColorSwatch[];
  storageOptions: ProductStorageOption[];
  onStorageSelect?: (index: number) => void;
  priceAmount: string;
  priceUnit?: string;
  className?: string;
};

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
        {/* 
        인디케이터
        <div className={styles.dots}>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={[styles.dot, index === 0 && styles.dotActive]
                .filter(Boolean)
                .join(' ')}
            />
          ))}
        </div> */}
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
          colors={colorSwatches.map((swatch, index) => ({
            hex: swatch.hex,
            label: swatch.label,
            selected: index === 0,
          }))}
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
