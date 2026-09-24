export type SessionRole = 'USER' | 'ADMIN'

// 리프레시 토큰은 본문에 없다(HttpOnly 쿠키로 온다) — 프론트가 만질 값이 아니라
// 타입에도 없다.
export type Session = {
  sessionToken: string
  displayName: string
  role: SessionRole
}

export type KakaoCallbackRequest = {
  code: string
  redirectUri: string
}

// 세션 조회는 토큰을 돌려주지 않는다 — 이미 갖고 있는 값이다.
export type SessionInfo = Pick<Session, 'displayName' | 'role'>

export type AdminLoginRequest = {
  username: string
  password: string
}
