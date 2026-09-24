import { Outlet } from 'react-router'

import { logout, useSession } from '@/entities/auth'
import { useModalStore } from '@/shared/model/modalStore'
import { Modal } from '@/shared/ui'
import { Header } from '@/widgets/header'

export function RootLayout() {
  const { isLoggedIn } = useSession()
  const isModalOpen = useModalStore((state) => state.isOpen)
  const modalContent = useModalStore((state) => state.content)
  const closeModal = useModalStore((state) => state.close)

  return (
    <>
      <Header
        isMember={isLoggedIn}
        onLogoutClick={() => {
          // 로컬 세션은 logout() 안에서 항상 지워진다 — 서버 호출 실패만 알려준다.
          logout().catch(() => {
            alert('로그아웃 처리 중 문제가 발생했습니다. 다시 시도해 주세요.')
          })
        }}
      />
      <Outlet />
      <Modal open={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  )
}
