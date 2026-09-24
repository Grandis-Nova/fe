import type { Session, SessionRole } from '@/shared/api/types'
import { createStore } from '@/shared/lib/createStore'

export type SessionState = {
  displayName: string | null
  role: SessionRole | null
}

type SessionStore = SessionState & {
  // 메모리에만 둔다 — localStorage/sessionStorage에 넣지 않는다
  // (11-frontend-guide.md §3). 새로고침하면 사라지고 재발급으로 되살린다.
  sessionToken: string | null
  setSession: (session: Session) => void
  clearSession: () => void
}

export const useSessionStore = createStore<SessionStore>((set) => ({
  sessionToken: null,
  displayName: null,
  role: null,
  setSession: ({ sessionToken, displayName, role }) =>
    set({ sessionToken, displayName, role }),
  clearSession: () =>
    set({ sessionToken: null, displayName: null, role: null }),
}))

export const isLoggedIn = () => useSessionStore.getState().sessionToken !== null
