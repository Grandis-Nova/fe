---
type: architecture
title: Feature-Sliced Design 디렉터리 구조
description: src/ 하위 FSD 레이어 구성과 각 레이어의 현재 슬라이스 현황, 레이어 간 의존 방향 규칙이 eslint로 실제 강제되는 방식을 설명한다.
tags:
  [
    architecture,
    fsd,
    feature-sliced-design,
    directory-structure,
    eslint,
    frontend,
  ]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-19T17:13:03.359Z
sources:
  - id: openwiki-source-276795f6d5ad19adb078c64e
    resource: repo://eslint.config.js
  - id: openwiki-source-a52b9019d30f194703418d40
    resource: repo://src/app/router/index.tsx
  - id: openwiki-source-9ed14020c76950114f6f3b76
    resource: repo://src/entities/order/index.ts
  - id: openwiki-source-88db37c6207c43ec3798b32c
    resource: repo://src/entities/preorder/index.ts
  - id: openwiki-source-d776cca5236e216ba85991fa
    resource: repo://src/entities/product/index.ts
  - id: openwiki-source-7825d23bf521e75974c7ccfa
    resource: repo://src/entities/product/ui/ProductCard/index.ts
  - id: openwiki-source-53699091d2a36eec74622d60
    resource: repo://src/entities/review/index.ts
  - id: openwiki-source-ddced469b618190cca481e4b
    resource: repo://src/features/.gitkeep
  - id: openwiki-source-95bfccfd0c712f6e72040e0d
    resource: repo://src/main.tsx
  - id: openwiki-source-6971a2a503a7100fbdcee22b
    resource: repo://src/pages/main/index.ts
  - id: openwiki-source-58fd484f7316cfff5a234663
    resource: repo://src/pages/mypage/index.ts
  - id: openwiki-source-45f9b729caf4256845a67d36
    resource: repo://src/pages/not-found/index.ts
  - id: openwiki-source-ba3ed92c2866db2869872739
    resource: repo://src/pages/preorder-detail/index.ts
  - id: openwiki-source-5d2ccfc79b042352e729e35a
    resource: repo://src/pages/preorder/index.ts
  - id: openwiki-source-078f0709e5a6dfd53483aaf1
    resource: repo://src/pages/product-detail/index.ts
  - id: openwiki-source-9e7cf50395741bd7aade5d03
    resource: repo://src/pages/result/index.ts
  - id: openwiki-source-f86d0187ad9616f2b9eabad8
    resource: repo://src/shared/assets/react.svg
  - id: openwiki-source-180dbe3e59ccf9bf4f9ea9ad
    resource: repo://src/shared/config/theme/index.ts
  - id: openwiki-source-eaa28e59aee0c79ba0697842
    resource: repo://src/shared/lib/simplexNoise.js
  - id: openwiki-source-d131a7da28ef0d717bef8452
    resource: repo://src/shared/ui/index.ts
  - id: openwiki-source-40f3921f4b0510e0c5986ce8
    resource: repo://src/widgets/banner/index.ts
  - id: openwiki-source-753e730221d9c22d10a446d8
    resource: repo://src/widgets/category-nav/index.ts
  - id: openwiki-source-c03b24e730079673fa4d18ee
    resource: repo://src/widgets/header/index.ts
  - id: openwiki-source-3e8591749cf9dc980674c1a4
    resource: repo://src/widgets/mypage-menu/index.ts
  - id: openwiki-source-fe9d4837246c407a3285609f
    resource: repo://src/widgets/product-page-tab/index.ts
generated: { by: 'claude-code', at: '2026-09-19T17:13:03.359Z' }
---

## 개요

`src/`는 Feature-Sliced Design(FSD) 레이어로 구성된다. 위에서 아래 순서로
`app → pages → widgets → features → entities → shared`이며, 상위 레이어만 하위 레이어를
import할 수 있고 역방향은 금지된다. 초기(2026-09-15) 시점에는 `app`을 제외한 모든 레이어가
`.gitkeep`뿐인 빈 디렉터리였지만, 지금은 전 레이어가 실제 슬라이스로 채워져 있다.

## 의존 방향은 eslint로 실제 강제된다

`eslint.config.js`의 `import-x/no-restricted-paths` 규칙(`error` 레벨)이 레이어별 `zones`를
정의해 역방향 import를 정적으로 차단한다: `shared`는 다른 어떤 레이어도 import할 수 없고,
`entities`는 `features/widgets/pages/app`을, `features`는 `widgets/pages/app`을, `widgets`는
`pages/app`을, `pages`는 `app`을 import할 수 없다. 초기 버전 문서는 "별도 lint 플러그인으로
강제되지 않는다"고 서술했지만 더 이상 사실이 아니다.

## 레이어별 현재 상태

### app

- `router/index.tsx` — `react-router` v7 라우트 트리. 자세한 내용은
  [라우팅과 레이아웃 구성](routing.md) 참고.
- `layouts/RootLayout.tsx`, `layouts/MainLayout.tsx` — 중첩 레이아웃 라우트.
- `styles/index.css` — 전역 CSS(리셋/폰트 등).

과거 있던 `App.tsx`/`App.css.ts`(카운터 데모 UI)는 라우터 도입 후 제거됐고, `main.tsx`가
FSD 레이어 밖의 순수 부트스트랩 파일로서 `router`의 `RouterProvider`와 전역 스타일만
불러오는 역할로 바뀌었다.

### pages

라우트별 슬라이스: `main`, `mypage`, `product-detail`, `preorder`, `preorder-detail`,
`result`, `not-found`. 각 슬라이스는 `index.ts`(공개 API)와 `ui/` 세그먼트로 구성된 동일한
패턴을 따른다.

### widgets

`banner`, `header`, `category-nav`, `mypage-menu`, `product-page-tab` — 여러 페이지에서
재사용되는 레이아웃 조각. 각각 `index.ts` + `ui/*.tsx` + `ui/*.css.ts` + `ui/*.stories.tsx`
구성이다.

### entities

`order`(`HistoryCard`, `QueueCard`), `preorder`(`PreorderCard`), `product`, `review`
(`ReviewCard`) 도메인 슬라이스. `features`는 아직 `.gitkeep`만 있는 빈 레이어다.

`entities/product`는 다른 슬라이스와 다르게 **컴포넌트별 하위 폴더** 패턴을 쓴다 —
`ui/ProductCard.tsx` 단일 파일이 아니라 `ui/ProductCard/{ProductCard.tsx,
ProductCard.css.ts, ProductCard.stories.tsx, index.ts}`처럼 컴포넌트마다 자체 폴더를
갖는다(`ProductCard`, `ProductColorSwatches`, `ProductOptionSelector`,
`ProductPaymentCard`, `ProductSummary`가 이 패턴). 자세한 구성과 컴포넌트 간 관계는
[상품 카탈로그 컴포넌트 구성](../features/product-catalog.md) 참고.

### shared

초기엔 이미지 자산만 있던 레이어였지만 지금은 관례적 하위 세그먼트가 대부분 채워졌다.

- `ui/` — `Button`, `Checkbox`, `Dropdown`, `Input`, `Navigator`, `SelectButton`, `Tag`,
  `Toggle`, `SwirlBackground` 등 범용 UI 컴포넌트. `index.ts`가 공개 API를 배럴로 내보낸다.
- `config/theme/` — 디자인 토큰과 vanilla-extract 스타일 시스템. 자세한 내용은
  [디자인 토큰과 vanilla-extract 스타일 시스템](design-system.md) 참고.
- `lib/` — `simplexNoise.js`(+`.d.ts`) — `SwirlBackground`가 쓰는 노이즈 함수 서드파티 이식.
- `assets/` — 로고 등 이미지 자산.

`api` 세그먼트는 아직 내용이 없어 디렉터리 자체가 없다.

## 관련

- [라우팅과 레이아웃 구성](routing.md)
- [디자인 토큰과 vanilla-extract 스타일 시스템](design-system.md)
- [상품 카탈로그 컴포넌트 구성](../features/product-catalog.md)
- [빠른 시작](../quickstart.md)
