import { ProductPaymentCard } from '@/entities/product'

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
