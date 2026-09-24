import { createAndStoreState } from './kakaoState'

const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize'

// 카카오 개발자 콘솔의 Redirect URI에 이 경로(+ 현재 origin)를 등록해 둬야 한다.
export const KAKAO_CALLBACK_PATH = '/auth/kakao/callback'

export function getKakaoAuthorizeUrl() {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_KAKAO_OAUTH_REST_API_KEY,
    redirect_uri: `${window.location.origin}${KAKAO_CALLBACK_PATH}`,
    response_type: 'code',
    // state는 콜백 페이지가 sessionStorage 값과 대조해서 검증한다.
    state: createAndStoreState(),
  })

  return `${KAKAO_AUTHORIZE_URL}?${params.toString()}`
}
