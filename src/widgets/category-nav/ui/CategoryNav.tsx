import { Link } from 'react-router'

import * as styles from './CategoryNav.css'

export type CategoryNavLink = '구매후기' | '사전예약' | '마이페이지'

export type CategoryNavProps = {
  activeLink?: CategoryNavLink
  showBorder?: boolean
  onLinkClick?: (link: CategoryNavLink) => void
  className?: string
}

const brands = ['SAMSUNG', 'Apple', '악세사리']
const links: CategoryNavLink[] = ['구매후기', '사전예약', '마이페이지']
const linkPaths: Record<CategoryNavLink, string> = {
  구매후기: '/reviews',
  사전예약: '/preorder',
  마이페이지: '/mypage',
}

export function CategoryNav({
  activeLink,
  showBorder = true,
  onLinkClick,
  className,
}: CategoryNavProps) {
  return (
    <nav
      className={[
        styles.root,
        styles.border[showBorder ? 'visible' : 'hidden'],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.row}>
        <div className={styles.links}>
          {brands.map((brand) => (
            <Link
              key={brand}
              to={`/products?brand=${encodeURIComponent(brand)}`}
              className={styles.link}
            >
              {brand}
            </Link>
          ))}
        </div>
        <span className={styles.divider}>|</span>
        <div className={styles.links}>
          {links.map((link) => (
            <Link
              key={link}
              to={linkPaths[link]}
              className={[styles.link, link === activeLink && styles.linkActive]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onLinkClick?.(link)}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
