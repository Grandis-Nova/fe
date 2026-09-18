import * as styles from './ProductColorSwatches.css';

export type ProductColorSwatchItem = {
  hex: string;
  label?: string;
  selected?: boolean;
};

export type ProductColorSwatchesProps = {
  colorName: string;
  colors: ProductColorSwatchItem[];
  size?: 'small' | 'medium';
  onSelect?: (index: number) => void;
  className?: string;
};

export function ProductColorSwatches({
  colorName,
  colors,
  size = 'small',
  onSelect,
  className,
}: ProductColorSwatchesProps) {
  const selectedLabel = colors.find((item) => item.selected)?.label ?? colorName;

  return (
    <div className={[styles.root[size], className].filter(Boolean).join(' ')}>
      <div className={styles.colorName[size]}>{selectedLabel}</div>
      <div className={styles.swatchRow[size]}>
        {colors.map((item, index) =>
          onSelect ? (
            <button
              key={`${item.hex}-${index}`}
              aria-pressed={item.selected}
              className={[
                styles.swatch[size],
                item.selected && styles.swatchSelected,
                styles.swatchInteractive,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                background: item.hex,
                ...(item.selected
                  ? { outline: `1.5px solid ${item.hex}` }
                  : {}),
              }}
              onClick={() => onSelect(index)}
            />
          ) : (
            <span
              key={`${item.hex}-${index}`}
              title={item.label}
              className={[
                styles.swatch[size],
                item.selected && styles.swatchSelected,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ background: item.hex }}
            />
          ),
        )}
      </div>
    </div>
  );
}
