import { AddressCard, type AddressCardData } from '@/entities/address'

import * as styles from './MypageAddress.css'

// ponytail: 아직 주소록 API가 없어서 목업 데이터로 대체
const addresses: AddressCardData[] = [
  {
    id: '1',
    label: '집',
    recipientName: '기매진',
    phone: '010-1234-5678',
    fullAddress: '서울특별시 강남구 테헤란로 123',
    isDefault: true,
  },
  {
    id: '2',
    label: '회사',
    recipientName: '기매진',
    phone: '010-1234-5678',
    fullAddress: '서울특별시 서초구 서초대로 456',
  },
]

export function MypageAddress() {
  return (
    <div className={styles.root}>
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </div>
  )
}
