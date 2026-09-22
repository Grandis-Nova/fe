import { ProductPaymentCard } from '@/entities/product'
import { InlineAlert } from '@/shared/ui'

import * as styles from './MypagePreorder.css'

// ponytail: 아직 사전예약 API가 없어서 목업 데이터로 대체
const preorderItems = [
  {
    id: '1',
    name: '아이폰 18 Pro',
    modelNumber: 'A3714',
    optionSummary: '스타라이트 · 256GB · AppleCare+ 포함',
    quantityLabel: '수량 1개',
    priceLabel: '2,278,100원',
  },
]

export function MypagePreorder() {
  return (
    <div className={styles.root}>
      <InlineAlert status="warning" icon="clock">
        사전 예약 상품은 24시간 이내에 결제가 완료되어야 합니다.
      </InlineAlert>
      {preorderItems.map((item) => (
        <div key={item.id} className={styles.card}>
          <ProductPaymentCard
            variant="checkout"
            product={item}
            actionLabel="결제하기"
          />
        </div>
      ))}
    </div>
  )
}
