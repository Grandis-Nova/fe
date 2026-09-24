import { apiClient } from '@/shared/api/client'
import type {
  DefaultAddressResponse,
  PutDefaultAddressRequest,
} from '@/shared/api/types'

// 마이페이지에서 관리하는 여러 배송지(AddressCard)와는 다른, 결제 화면에
// 자동으로 채워 넣을 "기본 배송지" 하나다(11-frontend-guide.md §7).
export const getDefaultAddress = () =>
  apiClient.request<DefaultAddressResponse>('/api/v1/me/default-address')

// 다섯 칸을 항상 통째로 보낸다 — 부분 수정 없음.
export const putDefaultAddress = (body: PutDefaultAddressRequest) =>
  apiClient.request<DefaultAddressResponse>('/api/v1/me/default-address', {
    method: 'PUT',
    body,
  })
