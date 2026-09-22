import { Outlet } from 'react-router'

import { sprinkles } from '@/shared/config/theme'

export function MainLayout() {
  return (
    <div className={sprinkles({ marginX: 'auto' })}>
      <Outlet />
    </div>
  )
}
