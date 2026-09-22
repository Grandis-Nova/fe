import { ProductPaymentCard } from '@/entities/product'
import { InlineAlert } from '@/shared/ui'

import * as styles from './MypagePreorder.css'

// ponytail: 아직 사전예약 API가 없어서 목업 데이터로 대체
const preorderItems = [
  {
    id: '1',
    name: 'IPhone 18 Pro',
    modelNumber: '256GB · 스타라이트',
    optionSummary: 'AppleCare+ 포함',
    quantityLabel: '수량 1개',
    priceLabel: '2,278,100원',
  },
]

export function MypagePreorder() {
  return (
    <div className={styles.root}>
      <InlineAlert status="info" icon="info">
        사전 예약 상품은 24시간 이내에 결제가 완료되어야 합니다.
      </InlineAlert>
      <InlineAlert status="warning" icon="box_planet">
        사전 예약 상품은 24시간 이내에 결제가 완료되어야 합니다.
      </InlineAlert>
      {preorderItems.map((item) => (
        <ProductPaymentCard
          key={item.id}
          variant="checkout"
          product={item}
          actionLabel="결제하기"
        />
      ))}
    </div>
  )
}
