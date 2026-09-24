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

  // 메인의 배너~히어로(어두운 이미지 구간) 위에 떠 있는 동안만 배경을 없애 이미지가
  // 헤더 뒤로 이어지게 한다. 그 구간을 지나 흰 콘텐츠가 올라오면 배경을 되살려
  // 글자가 묻히지 않게 한다. 구간의 끝은 MainPage가 data 속성으로 알려준다.
  useEffect(() => {
    if (!isMainPage) return

    const region = document.querySelector('[data-header-overlay-region]')
    if (!region) return

    // rootMargin으로 뷰포트 위쪽을 헤더 높이만큼 잘라내, 구간의 밑단이 헤더 아래를
    // 지나가는 순간을 경계로 삼는다. scroll 이벤트마다 레이아웃을 읽지 않아도 된다.
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: `-${styles.HEADER_HEIGHT}px 0px 0px 0px` },
    )
    observer.observe(region)
    return () => observer.disconnect()
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
