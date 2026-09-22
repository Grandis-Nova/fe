export type AdminProductType = 'preorder' | 'normal'
export type AdminProductStatus = 'selling' | 'scheduled' | 'closed'

export type AdminProduct = {
  id: string
  name: string
  type: AdminProductType
  optionCount: number
  /** 사전 예약만 오픈/마감 시각을 갖는다 */
  openPeriod: string | null
  status: AdminProductStatus
}

/** 상품 상세의 재고 조회 탭에 쌓이는 옵션별 재고 한 줄 */
export type AdminProductStock = {
  id: string
  color: string
  capacity: string
  /** 준비된 총 수량 */
  totalCount: number
  price: number
  /** 결제까지 확정된 건수 */
  confirmedCount: number
  /** 남은 건수 */
  remainingCount: number
}
