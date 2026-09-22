import { Outlet } from 'react-router'

import { Container } from '@/shared/ui/Container'

export function MypageLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}
