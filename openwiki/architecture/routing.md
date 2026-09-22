---
type: architecture
title: 라우팅과 레이아웃 구성
description: react-router 기반 라우트 테이블과 RootLayout/MainLayout 중첩 레이아웃이 Header/CategoryNav 노출 여부를 어떻게 제어하는지 설명한다.
tags: [architecture, routing, react-router, layout, frontend]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-19T17:13:03.359Z
sources:
  - id: openwiki-source-d421dbd6ae0978e083418e1f
    resource: repo://src/app/layouts/MainLayout.tsx
  - id: openwiki-source-b65fd9a56ff85e721f2d0b4c
    resource: repo://src/app/layouts/RootLayout.tsx
  - id: openwiki-source-a52b9019d30f194703418d40
    resource: repo://src/app/router/index.tsx
  - id: openwiki-source-95bfccfd0c712f6e72040e0d
    resource: repo://src/main.tsx
generated: { by: 'claude-code', at: '2026-09-19T17:13:03.359Z' }
---

## 개요

`src/app/router/index.tsx`가 `react-router` v7의 `createBrowserRouter`로 전체 라우트
트리를 정의한다. `src/main.tsx`는 이 `router`를 `RouterProvider`에 넘기기만 하는 순수
부트스트랩 파일이다.

## 중첩 레이아웃 구조

라우트 트리는 두 단계로 중첩된 레이아웃 라우트를 쓴다.

```
RootLayout (element 없는 부모 라우트)
└─ MainLayout (RootLayout의 자식)
   ├─ / → MainPage
   ├─ /preorder → PreorderPage
   ├─ /preorder/:preorderId → PreorderDetailPage
   ├─ /products/:productId → ProductDetailPage
   ├─ /result → ResultPage
   ├─ /mypage → Mypage
   └─ * → NotFoundPage
```

- **`RootLayout`**은 `<Header />`와 `<Outlet />`만 렌더링한다 — 이 트리 아래 모든 라우트는
  예외 없이 `Header`를 갖는다.
- **`MainLayout`**은 `<CategoryNav />`와 `sprinkles({ marginX: 'auto' })`를 적용한
  `<div>` 안에 `<Outlet />`을 렌더링한다. `useLocation()`으로 현재 경로가 `/`(메인 페이지)인지
  판별해 `CategoryNav`의 `showBorder`를 `!isMainPage`로 넘긴다 — 메인 페이지에서는 하단
  보더를 숨기고 다른 페이지에서는 보인다.

두 레이아웃 모두 실제 자기 자신을 라우트 엘리먼트로 등록하고, 화면 콘텐츠는
`<Outlet />` 자리에 렌더링되는 표준 react-router 중첩 라우트 패턴을 따른다.

## 향후 확장: admin 라우트

`router/index.tsx`의 주석은 admin 라우트가 생기면 `MainLayout` 밖, `RootLayout`의 자식
목록에 형제로 추가하라고 명시한다 — 그러면 `Header`는 그대로 적용되지만 `CategoryNav`와
`MainLayout`의 래퍼는 적용되지 않는다. 아직 admin 라우트 자체는 구현되지 않았다.

같은 파일의 주석은 구매후기 페이지와 브랜드별 상품 목록(`/products?brand=...`)도 아직
미구현이며, 만들어지면 `MainLayout`의 자식 배열에 추가하라고 안내한다.

## 관련

- [Feature-Sliced Design 디렉터리 구조](directory-structure.md)
- [빠른 시작](../quickstart.md)
