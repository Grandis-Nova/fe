import type { AdminProductStatus, AdminProductType } from './types'

export const adminProductTypeLabel: Record<AdminProductType, string> = {
  preorder: '사전 예약',
  normal: '일반 판매',
}

export const adminProductStatusLabel: Record<AdminProductStatus, string> = {
  selling: '판매 중',
  scheduled: '판매 예정',
  closed: '판매 종료',
}

export const adminProductStatusColor: Record<
  AdminProductStatus,
  'green' | 'blue' | 'gray'
> = {
  selling: 'green',
  scheduled: 'blue',
  closed: 'gray',
}
