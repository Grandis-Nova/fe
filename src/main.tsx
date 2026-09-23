import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import './app/styles/index.css'
import './shared/config/theme'
import { router } from './app/router'
import { startMockWorker } from './shared/api/mock'

// worker 등록 전에 첫 요청이 나가면 mocking을 놓치므로 렌더보다 먼저 기다린다.
void startMockWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
})
