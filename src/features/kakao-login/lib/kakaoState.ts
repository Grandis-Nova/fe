// CSRF 방지용 state — 탭별 sessionStorage에 둔다. localStorage는 다른 탭·다음
// 세션까지 남아서 금지(11-frontend-guide.md §3).
const STATE_KEY = 'kakao_oauth_state'

export function createAndStoreState(): string {
  // UUID 하나(32자)로도 요구치(32자 이상)는 채우지만, 여유를 두려고 두 개를 잇는다.
  const state =
    crypto.randomUUID().replace(/-/g, '') +
    crypto.randomUUID().replace(/-/g, '')
  sessionStorage.setItem(STATE_KEY, state)
  return state
}

// 저장한 state는 검증 성공/실패와 무관하게 즉시 지운다 — 한 번 쓴 state는 버린다.
export function consumeStoredState(returnedState: string | null): boolean {
  const stored = sessionStorage.getItem(STATE_KEY)
  sessionStorage.removeItem(STATE_KEY)
  return stored !== null && returnedState !== null && stored === returnedState
}
