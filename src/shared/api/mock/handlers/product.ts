import { http } from 'msw'

import { categories, dispatchWindows, products } from '../fixtures/product'
import { fail, ok } from '../response'
import { url } from '../url'

import type {
  Category,
  Paged,
  ProductDetail,
  ProductSort,
  ProductSummary,
  SaleStatus,
} from '../../types'
import type { RequestHandler } from 'msw'

const SORTS: ProductSort[] = [
  'RECOMMENDED',
  'OPEN_AT_ASC',
  'PRICE_ASC',
  'PRICE_DESC',
  'RATING_DESC',
  'REVIEW_COUNT_DESC',
  'NEWEST',
]

const SALE_STATUSES: SaleStatus[] = ['BEFORE_OPEN', 'OPEN', 'CLOSED']

function toSummary(product: ProductDetail): ProductSummary {
  const {
    productId,
    name,
    brand,
    thumbnailUrl,
    priceRange,
    openAt,
    saleStatus,
    stockPolicy,
    ratingSummary,
    badges,
  } = product
  return {
    productId,
    name,
    brand,
    thumbnailUrl,
    priceRange,
    openAt,
    saleStatus,
    stockPolicy,
    ratingSummary,
    badges,
  }
}

// categoryId 필터는 하위 카테고리를 포함하므로 서브트리를 펼쳐 둔다.
function collectCategoryIds(rootId: string): string[] {
  const found: string[] = []
  const walk = (nodes: Category[], inside: boolean) => {
    for (const node of nodes) {
      const hit = inside || node.categoryId === rootId
      if (hit) found.push(node.categoryId)
      walk(node.children, hit)
    }
  }
  walk(categories, false)
  return found
}

const byRating = (a: ProductSummary, b: ProductSummary) =>
  (b.ratingSummary.averageRating ?? -1) - (a.ratingSummary.averageRating ?? -1)

const comparators: Record<
  ProductSort,
  ((a: ProductSummary, b: ProductSummary) => number) | null
> = {
  RECOMMENDED: null,
  OPEN_AT_ASC: (a, b) => a.openAt.localeCompare(b.openAt),
  NEWEST: (a, b) => b.openAt.localeCompare(a.openAt),
  PRICE_ASC: (a, b) => a.priceRange.min - b.priceRange.min,
  PRICE_DESC: (a, b) => b.priceRange.max - a.priceRange.max,
  RATING_DESC: byRating,
  REVIEW_COUNT_DESC: (a, b) =>
    b.ratingSummary.reviewCount - a.ratingSummary.reviewCount,
}

export const productHandlers: RequestHandler[] = [
  http.get(url('/categories'), () => ok({ items: categories })),

  http.get(url('/products'), ({ request }) => {
    const params = new URL(request.url).searchParams
    const page = Number(params.get('page') ?? 0)
    const size = Number(params.get('size') ?? 20)
    const sort = (params.get('sort') ?? 'RECOMMENDED') as ProductSort
    const saleStatus = params.get('saleStatus')
    const minPrice = params.get('minPrice')
    const maxPrice = params.get('maxPrice')

    const violations = [
      !Number.isInteger(page) || page < 0
        ? { field: 'page', message: '0 이상이어야 합니다.' }
        : null,
      !Number.isInteger(size) || size < 1 || size > 100
        ? { field: 'size', message: '1 이상 100 이하여야 합니다.' }
        : null,
      !SORTS.includes(sort)
        ? { field: 'sort', message: '지원하지 않는 정렬입니다.' }
        : null,
      saleStatus && !SALE_STATUSES.includes(saleStatus as SaleStatus)
        ? { field: 'saleStatus', message: '지원하지 않는 판매 상태입니다.' }
        : null,
    ].filter((violation) => violation !== null)

    if (violations.length > 0) {
      return fail(400, {
        code: 'VALIDATION_FAILED',
        message: '입력값을 확인해 주세요.',
        violations,
      })
    }

    const categoryId = params.get('categoryId')
    const allowedCategories = categoryId ? collectCategoryIds(categoryId) : null
    const brand = params.get('brand')?.toLowerCase()
    const keyword = params.get('q')?.toLowerCase()
    const min = minPrice === null ? 0 : Number(minPrice)
    const max = maxPrice === null ? Number.MAX_SAFE_INTEGER : Number(maxPrice)

    const matched = products
      .filter((product) => {
        if (
          allowedCategories &&
          (product.categoryId === null ||
            !allowedCategories.includes(product.categoryId))
        ) {
          return false
        }
        if (brand && product.brand.toLowerCase() !== brand) return false
        if (saleStatus && product.saleStatus !== saleStatus) return false
        if (product.priceRange.max < min || product.priceRange.min > max) {
          return false
        }
        if (keyword) {
          const haystack = [product.name, product.brand, product.summary ?? '']
            .join(' ')
            .toLowerCase()
          if (!haystack.includes(keyword)) return false
        }
        return true
      })
      .map(toSummary)

    const comparator = comparators[sort]
    if (comparator) matched.sort(comparator)

    const items = matched.slice(page * size, page * size + size)
    const totalPages = Math.ceil(matched.length / size)

    return ok<Paged<ProductSummary>>({
      items,
      page,
      size,
      total: matched.length,
      totalPages,
      hasNext: page + 1 < totalPages,
    })
  }),

  http.get(
    url('/products/:productId/dispatch-windows/active'),
    ({ params }) => {
      const productId = String(params.productId)
      const version = dispatchWindows[productId]
      if (!version) {
        return fail(404, {
          code: 'PRODUCT_NOT_FOUND',
          message: '대상을 찾을 수 없습니다.',
        })
      }
      return ok(version)
    },
  ),

  http.get(url('/products/:productId/variants/:optionCode'), ({ params }) => {
    const product = products.find((it) => it.productId === params.productId)
    const variant = product?.variants.find(
      (it) => it.optionCode === params.optionCode,
    )
    if (!variant) {
      return fail(404, {
        code: 'PRODUCT_OPTION_NOT_FOUND',
        message: '대상을 찾을 수 없습니다.',
      })
    }
    return ok(variant)
  }),

  http.get(url('/products/:productId'), ({ params }) => {
    const product = products.find((it) => it.productId === params.productId)
    if (!product) {
      return fail(404, {
        code: 'PRODUCT_NOT_FOUND',
        message: '대상을 찾을 수 없습니다.',
      })
    }
    return ok(product)
  }),
]
