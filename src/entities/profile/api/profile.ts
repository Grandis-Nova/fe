import { apiClient } from '@/shared/api/client'
import type { ProfileInfo, UpdateProfileRequest } from '@/shared/api/types'

// 로그인/재발급과 달리 일반 보호 엔드포인트다 — 401이면 재발급 후 재시도한다
// (skipAuthRefresh를 안 준다).
export const getProfile = () =>
  apiClient.request<ProfileInfo>('/api/v1/me/profile')

// 세 칸을 항상 통째로 보낸다 — 부분 수정 없음.
export const putProfile = (body: UpdateProfileRequest) =>
  apiClient.request<ProfileInfo>('/api/v1/me/profile', {
    method: 'PUT',
    body,
  })
