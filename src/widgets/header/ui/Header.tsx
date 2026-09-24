import { useEffect, useState } from 'react'

import { Bell, LogOut, Search, ShoppingCart, User } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { KakaoLoginModal } from '@/features/kakao-login'
import { useModalStore } from '@/shared/model/modalStore'
import { CategoryNav } from '@/widgets/category-nav'

import * as styles from './Header.css'

export type HeaderProps = {
  isMember?: boolean
  onSearchClick?: () => void
  onCartClick?: () => void
  onNotificationClick?: () => void
  onLogoutClick?: () => void
  className?: string
}

export function Header({
  isMember = false,
  onSearchClick,
  onCartClick,
  onNotificationClick,
  onLogoutClick,
  className,
}: HeaderProps) {
  const openModal = useModalStore((state) => state.open)
  const { pathname } = useLocation()
  const isMainPage = pathname === '/'
  const isProductDetailPage = pathname.startsWith('/products/')
  const isMypage = pathname.startsWith('/mypage')
  // 어드민은 쇼핑 내비게이션이 필요 없다 — 로고/이동 경로를 바꾸고 알림만 남긴다.
  const isAdminPage = pathname.startsWith('/admin')
  const [scrolled, setScrolled] = useState(false)

  // 메인 최상단에서만 배너와 겹쳐 보이게 배경을 없앤다. 조금이라도 스크롤하면
  // 흰 콘텐츠가 헤더 뒤로 지나가므로 배경을 되살려 글자가 묻히지 않게 한다.
  useEffect(() => {
    if (!isMainPage) return

    const syncScrolled = () => setScrolled(window.scrollY > 0)
    syncScrolled()
    window.addEventListener('scroll', syncScrolled, { passive: true })
    return () => window.removeEventListener('scroll', syncScrolled)
  }, [isMainPage])

  const isOverlay = isMainPage && !scrolled

  // 어드민과 회원 헤더 양쪽에 들어가므로 한 번만 만들어 둔다.
  const notificationButton = (
    <button
      type="button"
      className={styles.iconButton}
      aria-label="알림"
      onClick={onNotificationClick}
    >
      <Bell className={styles.icon} aria-hidden="true" />
    </button>
  )

  return (
    <header
      className={[
        styles.root,
        styles.surface[isOverlay ? 'transparent' : 'solid'],
        styles.border[isMainPage ? 'hidden' : 'visible'],
        isMainPage
          ? styles.overlay
          : !isProductDetailPage && !isMypage && styles.sticky,
        isOverlay && styles.onDark,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.content}>
        <div className={styles.leftGroup}>
          <Link
            to={isAdminPage ? '/admin' : '/'}
            className={[styles.logo, isMember && styles.logoMember]
              .filter(Boolean)
              .join(' ')}
          >
            {isAdminPage ? 'NOVA ADMIN' : 'NOVA'}
          </Link>
          {!isAdminPage && (
            <CategoryNav tone={isOverlay ? 'onDark' : 'default'} />
          )}
        </div>
        <div className={styles.actions}>
          {isAdminPage ? (
            notificationButton
          ) : (
            <>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="검색"
                onClick={onSearchClick}
              >
                <Search className={styles.icon} aria-hidden="true" />
              </button>
              {isMember ? (
                <>
                  {notificationButton}
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label="장바구니"
                    onClick={onCartClick}
                  >
                    <ShoppingCart className={styles.icon} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label="로그아웃"
                    onClick={onLogoutClick}
                  >
                    <LogOut className={styles.icon} aria-hidden="true" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label="계정"
                  onClick={() => openModal(<KakaoLoginModal />)}
                >
                  <User className={styles.icon} aria-hidden="true" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
