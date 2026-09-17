import { createBrowserRouter } from 'react-router'

import { MainLayout } from '@/app/layouts/MainLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { MainPage } from '@/pages/main'
import { Mypage } from '@/pages/mypage'
import { NotFoundPage } from '@/pages/not-found'
import { PreorderPage } from '@/pages/preorder'
import { PreorderDetailPage } from '@/pages/preorder-detail'
import { ProductDetailPage } from '@/pages/product-detail'
import { ResultPage } from '@/pages/result'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <MainPage /> },
          { path: '/preorder', element: <PreorderPage /> },
          { path: '/preorder/:preorderId', element: <PreorderDetailPage /> },
          { path: '/products/:productId', element: <ProductDetailPage /> },
          { path: '/result', element: <ResultPage /> },
          { path: '/mypage', element: <Mypage /> },
          // 구매후기, 브랜드별 상품 목록(/products?brand=...) 페이지는 아직 미구현 — 만들면 여기 추가.
          { path: '*', element: <NotFoundPage /> },
        ],
      },
      // admin 라우트가 생기면 MainLayout 밖, 여기 형제로 추가한다 (Header만 적용, CategoryNav 제외).
    ],
  },
])
