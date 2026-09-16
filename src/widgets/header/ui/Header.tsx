import bellIcon from '@/shared/assets/icons/bell.svg'
import cartIcon from '@/shared/assets/icons/cart.svg'
import logoutIcon from '@/shared/assets/icons/logout.svg'
import searchIcon from '@/shared/assets/icons/search.svg'
import userIcon from '@/shared/assets/icons/user.svg'
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
          <img src={searchIcon} alt="" className={styles.icon} />
        </button>
        {isMember ? (
          <>
            <button type="button" className={styles.iconButton} aria-label="알림" onClick={onNotificationClick}>
              <img src={bellIcon} alt="" className={styles.icon} />
            </button>
            <button type="button" className={styles.iconButton} aria-label="장바구니" onClick={onCartClick}>
              <img src={cartIcon} alt="" className={styles.icon} />
            </button>
            <button type="button" className={styles.iconButton} aria-label="로그아웃" onClick={onLogoutClick}>
              <img src={logoutIcon} alt="" className={styles.icon} />
            </button>
          </>
        ) : (
          <button type="button" className={styles.iconButton} aria-label="계정" onClick={onAccountClick}>
            <img src={userIcon} alt="" className={styles.icon} />
          </button>
        )}
      </div>
    </header>
  )
}
