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
        {/* <div
          style={{
            width: '100%',
            borderBottom: '1px solid #e0e0e0',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '16px',
          }}
        >
          <span>NOVA</span>
        </div> */}
        <Outlet />
      </div>
    </>
  )
}
