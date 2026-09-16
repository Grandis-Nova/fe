import { ProductOptionSelector, type ProductOption } from './ProductOptionSelector'

export type { ProductOption }

export type ProductServiceSelectorProps = {
  options: ProductOption[]
  onSelect?: (index: number) => void
  className?: string
}

export function ProductServiceSelector({ options, onSelect, className }: ProductServiceSelectorProps) {
  return <ProductOptionSelector label="AppleCare+" options={options} onSelect={onSelect} className={className} />
}
