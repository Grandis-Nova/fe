import { http } from 'msw'

import { fail, ok } from '../response'
import { url } from '../url'

import type {
  AdminLoginRequest,
  KakaoCallbackRequest,
  Session,
  SessionInfo,
} from '../../types'
import type { RequestHandler } from 'msw'

// ponytail: 실제 인증 서버가 없어 메모리로 흉내낸다. 핸들러는 SW가 아니라 페이지
// 컨텍스트에서 실행되므로(MSW v2 구조) 새로고침하면 이 파일의 모듈도 다시 평가된다 —
// 그래서 DB를 sessionStorage에 함께 태워 새로고침에도 살아남게 한다(cart.ts와 같은 패턴).
// 탭을 닫으면 사라진다. 실제 서버 저장소를 대체하지 않는다.
type SessionRecord = { displayName: string; role: Session['role'] }
type DB = {
  sessions: [string, SessionRecord][]
  refreshTokens: [string, SessionRecord][]
  usedCodes: string[]
}

const DB_KEY = 'nova-auth-mock-db'

function loadDB(): DB {
  try {
    const raw = sessionStorage.getItem(DB_KEY)
    if (raw) return JSON.parse(raw) as DB
  } catch {
    // 파싱 실패 시 빈 DB로 시작한다.
  }
  return { sessions: [], refreshTokens: [], usedCodes: [] }
}

const initial = loadDB()
const sessions = new Map<string, SessionRecord>(initial.sessions)
const refreshTokens = new Map<string, SessionRecord>(initial.refreshTokens)
const usedCodes = new Set<string>(initial.usedCodes)

function saveDB() {
  const db: DB = {
    sessions: [...sessions.entries()],
    refreshTokens: [...refreshTokens.entries()],
    usedCodes: [...usedCodes],
  }
  sessionStorage.setItem(DB_KEY, JSON.stringify(db))
}

const MOCK_USER: SessionRecord = { displayName: '기매진', role: 'USER' }
// 로컬 개발용 관리자 계정. 실제 값이 아니다.
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin1234'
const MOCK_ADMIN: SessionRecord = { displayName: '관리자', role: 'ADMIN' }

const REFRESH_COOKIE: Record<Session['role'], string> = {
  USER: 'refresh_token',
  ADMIN: 'admin_refresh_token',
}

function parseCookies(header: string): Record<string, string> {
  if (!header) return {}
  return Object.fromEntries(
    header.split(';').map((pair) => {
      const [key, ...rest] = pair.trim().split('=')
      return [key, rest.join('=')]
    }),
  )
}

function issueSession(record: SessionRecord) {
  const sessionToken = `mock-session-${crypto.randomUUID()}`
  const refreshToken = `mock-refresh-${crypto.randomUUID()}`
  sessions.set(sessionToken, record)
  refreshTokens.set(refreshToken, record)
  saveDB()

  // HttpOnly는 여기 못 붙인다 — browser.ts가 이 값을 document.cookie로 심는데,
  // document.cookie로는 애초에 HttpOnly를 켤 수 없다(로컬 목업만의 한계).
  const cookie = `${REFRESH_COOKIE[record.role]}=${refreshToken}; Path=/; SameSite=Strict`

  return { sessionToken, refreshToken, cookie }
}

export const authHandlers: RequestHandler[] = [
  http.post(url('/api/v1/auth/kakao/callback'), async ({ request }) => {
    const body = (await request
      .json()
      .catch(() => null)) as Partial<KakaoCallbackRequest> | null

    if (!body?.code || !body.redirectUri) {
      return fail(400, {
        code: 'VALIDATION_FAILED',
        message: '요청 값이 올바르지 않습니다.',
        violations: [
          !body?.code
            ? { field: 'code', message: '필수 값입니다.' }
            : { field: 'redirectUri', message: '필수 값입니다.' },
        ].filter((v): v is { field: string; message: string } => v !== null),
      })
    }

    if (usedCodes.has(body.code)) {
      return fail(400, {
        code: 'INVALID_OAUTH_CALLBACK',
        message: '이미 사용된 코드입니다. 다시 로그인해 주세요.',
      })
    }
    usedCodes.add(body.code)
    saveDB()

    const { sessionToken, cookie } = issueSession(MOCK_USER)
    const response = ok<Session>({ sessionToken, ...MOCK_USER })
    response.headers.set('X-Mock-Set-Cookie', cookie)
    return response
  }),

  http.post(url('/api/v1/session/refresh'), () => {
    // 인터셉트된 Request의 headers에서는 Cookie를 읽을 수 없다(Service Worker Fetch
    // API의 의도된 제약 — SW가 쿠키를 훔쳐볼 수 없게 막는다. 실서버는 이 제약이 없다).
    // 이 핸들러는 페이지 컨텍스트에서 실행되므로 document.cookie로 직접 읽는다.
    const cookies = parseCookies(document.cookie)
    // 재발급은 회원 쿠키를 먼저 본다(11-frontend-guide.md §6).
    const refreshToken =
      cookies[REFRESH_COOKIE.USER] ?? cookies[REFRESH_COOKIE.ADMIN]
    const record = refreshToken ? refreshTokens.get(refreshToken) : undefined

    if (!record) {
      return fail(401, {
        code: 'UNAUTHENTICATED',
        message: '로그인이 필요합니다.',
      })
    }

    refreshTokens.delete(refreshToken)
    const { sessionToken, cookie } = issueSession(record)
    const response = ok<Session>({ sessionToken, ...record })
    response.headers.set('X-Mock-Set-Cookie', cookie)
    return response
  }),

  http.get(url('/api/v1/session'), ({ request }) => {
    const token = request.headers.get('X-Session-Token')
    const record = token ? sessions.get(token) : undefined
    if (!record) {
      return fail(401, {
        code: 'UNAUTHENTICATED',
        message: '로그인이 필요합니다.',
      })
    }
    return ok<SessionInfo>(record)
  }),

  http.delete(url('/api/v1/session'), ({ request }) => {
    const token = request.headers.get('X-Session-Token')
    const record = token ? sessions.get(token) : undefined
    if (token) sessions.delete(token)
    saveDB()

    const cookieName = REFRESH_COOKIE[record?.role ?? 'USER']
    const response = new Response(null, { status: 204 })
    response.headers.set(
      'X-Mock-Set-Cookie',
      `${cookieName}=; Path=/; SameSite=Strict; Max-Age=0`,
    )
    return response
  }),

  http.post(url('/api/v1/admin/session'), async ({ request }) => {
    const body = (await request
      .json()
      .catch(() => null)) as Partial<AdminLoginRequest> | null

    if (body?.username !== ADMIN_USERNAME || body.password !== ADMIN_PASSWORD) {
      return fail(401, {
        code: 'INVALID_CREDENTIALS',
        message: '아이디 또는 비밀번호가 올바르지 않습니다.',
      })
    }

    const { sessionToken, cookie } = issueSession(MOCK_ADMIN)
    const response = ok<Session>({ sessionToken, ...MOCK_ADMIN })
    response.headers.set('X-Mock-Set-Cookie', cookie)
    return response
  }),
]
