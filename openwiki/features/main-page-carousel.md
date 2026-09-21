---
type: workflow
title: 메인 페이지 히어로 오토스크롤 캐러셀
description: MainPage의 SwirlBackground 히어로와 embla-carousel 기반 무한 오토스크롤 캐러셀 구현, 그리고 loop 구현에서 실제로 겪은 비직관적 제약과 그 근본 원인을 설명한다.
tags:
  [workflow, main-page, carousel, embla-carousel, canvas-animation, frontend]
sources:
  - id: openwiki-source-142553122a4b594242936aa7
    resource: repo://src/pages/main/ui/MainPage.css.ts
  - id: openwiki-source-9d07391d0987e367447a753a
    resource: repo://src/pages/main/ui/MainPage.tsx
  - id: openwiki-source-106882e9cc35fe9cd43bb118
    resource: repo://src/shared/ui/SwirlBackground/SwirlBackground.css.ts
  - id: openwiki-source-1cd6e8b1b508a390e34f873a
    resource: repo://src/shared/ui/SwirlBackground/SwirlBackground.tsx
generated: { by: "claude-code", at: "2026-09-20T09:53:37.867Z" }
verified:
  - by: openwiki/0.5.0
    at: 2026-09-21T01:15:36.692Z
---

## 개요

`pages/main/ui/MainPage.tsx`의 히어로 섹션은 두 겹으로 구성된다: 배경에는 `SwirlBackground`
(캔버스 파티클 애니메이션), 그 위에 `embla-carousel` 기반 무한 오토스크롤 상품 캐러셀이
얹힌다. 히어로 아래에는 같은 `ProductCard`를 그리드로 나열하는 별도의 "추천 상품" 섹션이
있다(`RECOMMENDED_COUNT`개, 캐러셀과 무관).

## SwirlBackground: 컨테이너 크기 추종 캔버스 애니메이션

`shared/ui/SwirlBackground.tsx`는 `useRef`로 얻은 부모 컨테이너 안에 두 개의 `<canvas>`를
직접 생성해(React가 아니라 순수 DOM API로) 파티클을 그리는 컴포넌트다. 리사이즈 시
`container.clientWidth`/`clientHeight`를 읽어 캔버스 크기를 맞추므로, 부모 요소의 크기가
곧 애니메이션 영역이 된다. `SwirlBackground.css.ts`의 `root`는 `position: absolute; inset: 0`
로 부모(`MainPage.css.ts`의 `hero`, `position: relative; height: 770px`) 전체를 채운다 —
즉 뷰포트 전체가 아니라 **자신을 감싼 `hero` div의 크기**에 맞춰 캔버스가 리사이즈된다.

## embla-carousel 무한 오토스크롤: 세 가지 비직관적 제약

`MainPage.tsx`는 `useEmblaCarousel({ loop: true, dragFree: true, align: 'start' },
[AutoScroll({ speed: 1, stopOnInteraction: false })])`로 캐러셀을 구성한다. 이 구성에
도달하기까지 코드에 남은 세 가지 근거는 각각 Embla 내부 동작과 직접 관련된다.

### 1. 슬라이드 컨테이너에 `width`를 명시하면 안 된다

`carouselContainer`(`display: flex`인 슬라이드 래퍼)는 의도적으로 `width`를 지정하지
않는다. Embla는 자신이 ref로 받은 뷰포트 요소의 첫 자식(이 슬라이드 래퍼)의
`getBoundingClientRect().width`를 `canLoop()` 판정에 쓰는데, 이 값이 전체 슬라이드 합계
폭과 비슷하거나 같아지면(예: `width: 'max-content'`를 주면) `canLoop()`가 항상 실패해서
Embla가 `loop: true` 요청을 조용히 `loop: false`로 폴백시킨다 — 그러면 무한 스크롤 자체가
동작하지 않는다. `width`를 아예 생략하면 flex 컨테이너의 `width: auto`가 부모(뷰포트, 화면
폭 정도)만큼만 잡히는데, 이 정도로 작은 값이어야 `canLoop()`가 통과한다.

### 2. flex `gap`은 마지막↔첫 슬라이드 사이에는 적용되지 않는다

CSS `gap`은 형제 요소 "사이"에만 적용되는 속성이라, `loop: true`로 마지막 슬라이드
다음에 첫 슬라이드가 다시 이어질 때는 그 이음매에 `gap`이 들어가지 않는다. `carouselSlide`
스타일은 `&:last-child`에 `gap`과 같은 크기의 `marginRight`를 추가해 이 이음매 간격을
보정한다.

### 3. `AutoScroll`과 함께 쓸 때는 `dragFree: true`가 필요하다

`dragFree: true`가 없으면 스냅포인트가 활성화된 채로 오토스크롤이 진행되어, 슬라이드
경계마다 멈칫거리는 것처럼 보인다. `dragFree: true`로 스냅을 끄면 오토스크롤이 끊김 없이
흐른다.

세 가지 모두 `CLAUDE.md`의 Gotchas 섹션에도 같은 결론이 한 줄씩 요약돼 있다 — 이 문서는
왜 그런지 메커니즘까지 풀어 쓴 버전이다. 히어로 타이틀 스타일은 `title`이 아니라
`bestTitle`이라는 이름으로 export된다(`recommendedTitle`과 구분하기 위함).

## 추천 상품 섹션: Container + typography 직접 조합

히어로 아래 "추천 상품" 그리드는 더 이상 인라인 `sprinkles({ maxWidth, paddingX, paddingY,
marginX })` 호출로 레이아웃을 만들지 않고, `shared/ui`의 `Container` 컴포넌트로 감싼다 —
페이지 콘텐츠 표준 레이아웃(모바일 full / 데스크톱 max-width 1200px)을 이 페이지도 그대로
따르기 위해서다. 제목 텍스트는 `[typography.title.xlSemibold, styles.recommendedTitle]
.join(' ')`처럼 `typography` 배럴의 프리셋 클래스를 `.css.ts`의 나머지 스타일과 className
레벨에서 직접 합성하는 패턴을 쓴다 — `entities` 컴포넌트들과 동일한 패턴이며, 자세한 배경은
[상품 카탈로그 컴포넌트 구성](product-catalog.md) 참고.

## 관련

- [디자인 토큰과 vanilla-extract 스타일 시스템](../architecture/design-system.md)
- [상품 카탈로그 컴포넌트 구성](product-catalog.md)
