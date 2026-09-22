---
type: quickstart
title: 빠른 시작
description: 저장소를 처음 접하는 사람이나 에이전트가 로컬에서 실행하고, 이 위키에서 어디를 봐야 할지 찾도록 안내하는 진입 페이지.
tags: [quickstart, onboarding, getting-started]
sources:
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-95bfccfd0c712f6e72040e0d
    resource: repo://src/main.tsx
generated: { by: "claude-code", at: "2026-09-21T00:58:42.533Z" }
verified:
  - by: openwiki/0.5.0
    at: 2026-09-21T00:58:42.533Z
---

## 이 저장소는 무엇인가

Vite로 스캐폴딩한 React + TypeScript 프로젝트다. 스타일링은 Vanilla Extract(zero-runtime
CSS-in-TS) + `@vanilla-extract/sprinkles`를 사용하고, `src/` 디렉터리 구조는
Feature-Sliced Design(FSD) 컨벤션을 따르며 eslint로 레이어 경계가 강제된다. 초기
스캐폴딩 단계를 지나 라우팅, 디자인 토큰 시스템, 상품 카탈로그 컴포넌트 등 실제 기능
코드가 상당히 채워진 상태다.

## 로컬 실행

`package.json`에 정의된 스크립트를 사용한다.

```bash
npm install
npm run dev              # 개발 서버 (Vite + HMR)
npm run build            # tsc -b 타입 체크 후 프로덕션 번들 생성
npm run preview          # 빌드 결과물 로컬 미리보기
npm run lint             # eslint . 실행
npm run lint:fix         # eslint . --fix
npm run format           # prettier --check .
npm run format:fix       # prettier --write .
npm run storybook        # Storybook 개발 서버 (:6006)
npm run build-storybook  # Storybook 정적 빌드
```

앱 진입점은 `src/main.tsx`이며, `src/app/router/index.tsx`가 만드는 `router`를
`RouterProvider`에 넘기고 전역 스타일/디자인 토큰을 불러오는 것 외에는 로직이 없는 순수
부트스트랩 파일이다.

## 이 위키에서 다음에 볼 곳

- [Feature-Sliced Design 디렉터리 구조](repo://openwiki/architecture/directory-structure.md) —
  `src/`가 FSD 레이어로 어떻게 나뉘고 각 레이어에 지금 무엇이 들어있는지.
- [빌드 및 스타일링 도구 구성](repo://openwiki/architecture/tooling.md) — Vite,
  TypeScript, ESLint(oxlint에서 전환), Vanilla Extract, Storybook 연결 방식.
- [디자인 토큰과 vanilla-extract 스타일 시스템](repo://openwiki/architecture/design-system.md) —
  색상/타이포그래피/spacing/motion 토큰과 `sprinkles` 반응형 유틸.
- [라우팅과 레이아웃 구성](repo://openwiki/architecture/routing.md) — 라우트 테이블과
  `RootLayout`/`MainLayout` 중첩 레이아웃.
- [상품 카탈로그 컴포넌트 구성](repo://openwiki/features/product-catalog.md) —
  `entities/product`의 다섯 컴포넌트가 나누는 책임과 합성 관계.
- [메인 페이지 히어로 오토스크롤 캐러셀](repo://openwiki/features/main-page-carousel.md) —
  `embla-carousel` 무한 루프 구현에서 실제로 겪은 비직관적 제약.
- [사전예약 상세 페이지 알림/예약 플로우](repo://openwiki/features/preorder-detail.md) —
  카운트다운 게이트와 `BottomSheet`(`vaul`) 기반 모델별 예약/알림 신청 UI.

## 참고

Vite React+TS 템플릿이 기본 제공하는 SWC 기반 플러그인 대안, React Compiler 도입 방법은
`README.md`에 설명되어 있다. 린터 구성(ESLint)은
[빌드 및 스타일링 도구 구성](repo://openwiki/architecture/tooling.md) 참고.
