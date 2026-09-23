import type { UploadedImage } from '@/shared/ui'

export type ProductColorOption = {
  id: string
  /** 색상 이름. '색상 없음'을 체크하면 빈 문자열로 둔다 */
  name: string
  /** 조합 표에 찍히는 스와치 색 */
  hex: string
  noColor: boolean
  images: UploadedImage[]
}

export function createColorOption(): ProductColorOption {
  // hex가 빈 값이면 아직 색을 고르지 않은 상태다.
  return { id: crypto.randomUUID(), name: '', hex: '', noColor: false, images: [] }
}

export function createOptionValue(): ProductOptionValue {
  return { id: crypto.randomUUID(), label: '', extraPrice: 0 }
}

export function createOptionGroup(): ProductOptionGroup {
  return { id: crypto.randomUUID(), name: '', values: [createOptionValue()] }
}

export type ProductOptionValue = {
  id: string
  label: string
  /** 기본 가격에 더해지는 금액 */
  extraPrice: number
}

export type ProductOptionGroup = {
  id: string
  /** 옵션 이름 (예: '용량') */
  name: string
  values: ProductOptionValue[]
}

export type AdminProductFormValue = {
  name: string
  modelName: string
  isPreorder: boolean
  /** datetime-local 형식 문자열 */
  openAt: string
  closeAt: string
  colors: ProductColorOption[]
  optionGroups: ProductOptionGroup[]
  basePrice: number
  /**
   * 조합별 수량. 키는 `색상|옵션값|옵션값` 형태다.
   * 조합 행 자체는 colors × optionGroups에서 매번 파생시키고 수량만 여기 남겨서,
   * 색상이나 옵션을 추가·삭제해도 살아남은 조합의 입력값이 유지되게 한다.
   */
  quantities: Record<string, number>
  detailImages: UploadedImage[]
  specImages: UploadedImage[]
  noticeImages: UploadedImage[]
}

export function createEmptyProductFormValue(): AdminProductFormValue {
  return {
    name: '',
    modelName: '',
    isPreorder: false,
    openAt: '',
    closeAt: '',
    // 색상은 최소 한 칸을 미리 열어둔다 (아직 아무것도 선택되지 않은 상태).
    colors: [createColorOption()],
    optionGroups: [],
    basePrice: 0,
    quantities: {},
    detailImages: [],
    specImages: [],
    noticeImages: [],
  }
}
