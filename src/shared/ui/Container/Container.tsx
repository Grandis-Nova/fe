import type { ReactNode } from 'react'

import { sprinkles } from '../../config/theme'

export type ContainerProps = {
  children: ReactNode
  className?: string
}

// 페이지 콘텐츠의 표준 레이아웃 계약: 모바일은 전체 폭, 데스크톱은 max-width 1200px로
// 캡되고 paddingX 20px/paddingY 50px가 적용된다. 이 값이 필요한 곳은 sprinkles를 직접
// 쓰지 말고 항상 이 컴포넌트를 통해서 쓴다 — 페이지마다 손으로 옮겨 적다가 값이 갈리는 걸 막기 위해서다.
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={[
        sprinkles({
          maxWidth: { mobile: 'full', desktop: 'content' },
          paddingX: { mobile: 16, desktop: 30 },
          paddingY: { mobile: 24, desktop: 50 },
          marginX: { mobile: 'auto', desktop: 'auto' },
        }),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
