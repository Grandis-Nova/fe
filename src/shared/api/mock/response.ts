import { HttpResponse } from 'msw'

import type { ApiError, ApiResponse } from '../types'

const envelope = () => ({
  timestamp: new Date().toISOString(),
  traceId: crypto.randomUUID(),
})

export function ok<TData>(data: TData, status = 200) {
  return HttpResponse.json<ApiResponse<TData>>(
    { success: true, data, error: null, ...envelope() },
    { status },
  )
}

// detail/retryable은 대부분 기본값이라 code/message만 필수로 받는다.
export function fail(
  status: number,
  error: Pick<ApiError, 'code' | 'message'> & Partial<ApiError>,
) {
  return HttpResponse.json<ApiResponse<never>>(
    {
      success: false,
      data: null,
      error: { detail: null, retryable: false, ...error },
      ...envelope(),
    },
    { status },
  )
}
