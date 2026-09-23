import { ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

import { AdminProductForm } from '@/widgets/admin-product-form'
import type { AdminProductFormValue } from '@/widgets/admin-product-form'

import * as styles from './AdminProductNewPage.css'

export function AdminProductNewPage() {
  const navigate = useNavigate()

  // ponytail: 등록 API가 아직 없어서 값만 확인하고 목록으로 돌아간다.
  const handleSubmit = (value: AdminProductFormValue) => {
    console.info('상품 등록', value)
    navigate('/admin/products')
  }

  return (
    <div className={styles.root}>
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        <Link className={styles.breadcrumbLink} to="/admin/products">
          상품 관리
        </Link>
        <ChevronRight className={styles.breadcrumbIcon} aria-hidden="true" />
        <span className={styles.breadcrumbCurrent}>새 상품 등록</span>
      </nav>

      <h1 className={styles.title}>새 상품 등록</h1>

      <AdminProductForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/products')}
        onPreview={(value) => console.info('미리보기', value)}
      />
    </div>
  )
}
