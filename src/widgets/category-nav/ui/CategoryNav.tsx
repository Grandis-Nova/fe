import * as styles from './CategoryNav.css'

export type CategoryNavLink = '구매후기' | '사전예약' | '마이페이지'

export type CategoryNavProps = {
  brands?: string[]
  activeLink?: CategoryNavLink
  onLinkClick?: (link: CategoryNavLink) => void
  className?: string
}

const links: CategoryNavLink[] = ['구매후기', '사전예약', '마이페이지']

export function CategoryNav({
  brands = ['SAMSUNG', 'Apple', '악세사리'],
  activeLink,
  onLinkClick,
  className,
}: CategoryNavProps) {
  return (
    <nav className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.row}>
        <div className={styles.brands}>
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
        <span className={styles.divider}>|</span>
        <div className={styles.links}>
          {links.map((link) => (
            <button
              key={link}
              type="button"
              className={[styles.link, link === activeLink && styles.linkActive].filter(Boolean).join(' ')}
              onClick={() => onLinkClick?.(link)}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
