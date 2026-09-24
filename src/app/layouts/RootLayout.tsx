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
      <Header isMember={isLoggedIn} onLogoutClick={() => void logout()} />
      <Outlet />
      <Modal open={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  )
}
