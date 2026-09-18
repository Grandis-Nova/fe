import { Bell, LogOut, Search, ShoppingCart, User } from 'lucide-react'

import * as styles from './Header.css'

export type HeaderProps = {
  isMember?: boolean
  onSearchClick?: () => void
  onAccountClick?: () => void
  onCartClick?: () => void
  onNotificationClick?: () => void
  onLogoutClick?: () => void
  className?: string
}

export function Header({
  isMember = false,
  onSearchClick,
  onAccountClick,
  onCartClick,
  onNotificationClick,
  onLogoutClick,
  className,
}: HeaderProps) {
  return (
    <header className={[styles.root, className].filter(Boolean).join(' ')}>
      <span className={[styles.logo, isMember && styles.logoMember].filter(Boolean).join(' ')}>NOVA</span>
      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} aria-label="검색" onClick={onSearchClick}>
          <Search className={styles.icon} aria-hidden="true" />
        </button>
        {isMember ? (
          <>
            <button type="button" className={styles.iconButton} aria-label="알림" onClick={onNotificationClick}>
              <Bell className={styles.icon} aria-hidden="true" />
            </button>
            <button type="button" className={styles.iconButton} aria-label="장바구니" onClick={onCartClick}>
              <ShoppingCart className={styles.icon} aria-hidden="true" />
            </button>
            <button type="button" className={styles.iconButton} aria-label="로그아웃" onClick={onLogoutClick}>
              <LogOut className={styles.icon} aria-hidden="true" />
            </button>
          </>
        ) : (
          <button type="button" className={styles.iconButton} aria-label="계정" onClick={onAccountClick}>
            <User className={styles.icon} aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  )
}
