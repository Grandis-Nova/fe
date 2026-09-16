import chevronDoubleLeft from '../assets/icons/chevron-double-left.svg'
import chevronLeft from '../assets/icons/chevron-left.svg'
import * as styles from './Navigator.css'

export type NavigatorProps = {
  totalPages: number
  currentPage: number
  onPageChange?: (page: number) => void
  className?: string
}

export function Navigator({ totalPages, currentPage, onPageChange, className }: NavigatorProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className={[styles.root, className].filter(Boolean).join(' ')} aria-label="pagination">
      <button
        type="button"
        className={styles.arrowButton}
        aria-label="first page"
        onClick={() => onPageChange?.(1)}
      >
        <img src={chevronDoubleLeft} alt="" className={styles.arrowIcon} />
      </button>
      <button
        type="button"
        className={styles.arrowButton}
        aria-label="previous page"
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
      >
        <img src={chevronLeft} alt="" className={styles.arrowIcon} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={[styles.pageButton, page === currentPage && styles.pageButtonActive]
            .filter(Boolean)
            .join(' ')}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={styles.arrowButton}
        aria-label="next page"
        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
      >
        <img src={chevronLeft} alt="" className={`${styles.arrowIcon} ${styles.arrowIconFlipped}`} />
      </button>
      <button
        type="button"
        className={styles.arrowButton}
        aria-label="last page"
        onClick={() => onPageChange?.(totalPages)}
      >
        <img src={chevronDoubleLeft} alt="" className={`${styles.arrowIcon} ${styles.arrowIconFlipped}`} />
      </button>
    </nav>
  )
}
