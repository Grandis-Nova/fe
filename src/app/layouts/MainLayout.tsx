import { Outlet, useLocation } from 'react-router'

import { sprinkles } from '@/shared/config/theme'
import { CategoryNav } from '@/widgets/category-nav'

export function MainLayout() {
  const { pathname } = useLocation()
  const isMainPage = pathname === '/'

  return (
    <>
      <CategoryNav showBorder={!isMainPage} />
      <div className={sprinkles({ marginX: 'auto' })}>
        <Outlet />
      </div>
    </>
  )
}
