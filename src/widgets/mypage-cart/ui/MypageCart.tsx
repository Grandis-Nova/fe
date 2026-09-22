import { type CartItemCardData } from '@/entities/cart'
import { ProductPaymentCard } from '@/entities/product'

import * as styles from './MypageCart.css'

// ponytail: 아직 장바구니 API가 없어서 목업 데이터로 대체
const cartItems: CartItemCardData[] = [
  {
    id: '1',
    name: '아이폰 18 Pro',
    optionSummary: '실버 · 512GB',
    quantity: 1,
    priceLabel: '2,278,100원',
  },
  {
    id: '2',
    name: '맥북 네오',
    optionSummary: '미드나이트 · 256GB',
    quantity: 1,
    priceLabel: '1,690,000원',
  },
]

export function MypageCart() {
  return (
    <div className={styles.root}>
      {cartItems.map((item) => (
        <ProductPaymentCard
          key={item.id}
          variant="cart"
          product={{
            imageSrc: item.imageSrc,
            name: item.name,
            modelNumber: '',
            optionSummary: item.optionSummary,
            quantityLabel: `수량 ${item.quantity}개`,
            priceLabel: item.priceLabel,
          }}
          actionLabel="결제하기"
        />
      ))}
    </div>
  )
}
