import { ProductOptionSelector, type ProductOption } from './ProductOptionSelector'

export type { ProductOption }

export type ProductStorageSelectorProps = {
  options: ProductOption[]
  onSelect?: (index: number) => void
  className?: string
}

export function ProductStorageSelector({ options, onSelect, className }: ProductStorageSelectorProps) {
  return <ProductOptionSelector label="용량" options={options} onSelect={onSelect} className={className} />
}
