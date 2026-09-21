---
type: workflow
title: 사전예약 상세 페이지 알림/예약 플로우
description: PreorderDetailPage의 카운트다운 게이트(useCountdown), BottomSheet 기반 모델별 예약/알림 신청 UI, PreorderModelSummary와 BottomSheet 컴포넌트가 나누는 책임을 설명한다.
tags:
  [workflow, preorder, countdown, bottom-sheet, vaul, component-composition, frontend]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-21T00:58:42.533Z
sources:
  - id: openwiki-source-e4650c7a5b3a8fb12d7e59a1
    resource: repo://src/entities/preorder/ui/PreorderModelSummary/PreorderModelSummary.tsx
  - id: openwiki-source-8756c9f7b515ccfc645f0ec9
    resource: repo://src/pages/preorder-detail/ui/PreorderDetailPage.tsx
  - id: openwiki-source-db400565b0bb014f48bfe5af
    resource: repo://src/shared/lib/useCountdown.ts
  - id: openwiki-source-2ceede115a3430c4a9aaf46c
    resource: repo://src/shared/ui/BottomSheet/BottomSheet.css.ts
  - id: openwiki-source-78363aa32feea4375d1eaacf
    resource: repo://src/shared/ui/BottomSheet/BottomSheet.tsx
generated: { by: "claude-code", at: "2026-09-21T00:58:42.533Z" }
---

## 개요

`pages/preorder-detail/ui/PreorderDetailPage.tsx`(`/preorder/:preorderId` 라우트)는 하드코딩된
오픈 시각(`TEMP_OPENS_AT`, 실제 API 연동 전 임시값)까지 남은 시간을 `useCountdown`으로
표시하다가, 오픈 전/후에 따라 다른 동작을 하는 CTA 버튼 → `BottomSheet` → 모델별
`PreorderModelSummary` 행으로 이어지는 흐름을 구성한다. 라우트 자체는
[라우팅과 레이아웃 구성](../architecture/routing.md)에 이미 등록돼 있다.

## useCountdown: 카운트다운 훅과 isOver 게이트

`shared/lib/useCountdown.ts`는 목표 `Date`를 받아 1초 간격 `setInterval`로 `days`/`hours`/
`minutes`/`seconds`(분·초는 2자리 0-padding된 문자열)와 `isOver`(남은 시간이 0이 됐는지)를
반환하는 훅이다. `remainingMs`가 0에 도달하면 더 갱신하지 않고 `isOver: true`로 고정된다.

`PreorderDetailPage`는 `isOver` 하나로 페이지 전체의 문구·동작을 가른다:

- CTA 버튼 라벨: `사전예약 하러가기`(`isOver`) vs `예약알림 신청하기`
- CTA 클릭 시: `isOver`든 아니든 일단 `BottomSheet`를 연다(`handleActionClick`은 분기 없이
  `setBottomSheetOpen(true)`만 한다) — 실제 갈림은 시트 안의 타이틀/설명 문구와
  `PreorderModelSummary`의 CTA에서 일어난다.
- 카운트다운 텍스트는 `!isOver`일 때만 렌더링된다(오픈 후에는 빈 자리).

## BottomSheet: vaul Drawer를 감싼 얇은 프리미티브

`shared/ui/BottomSheet/BottomSheet.tsx`는 `vaul`의 `Drawer`(`Root`/`Trigger`/`Close`/`Title`/
`Description`/`Content`)를 거의 그대로 재노출하는 얇은 래퍼다. `Content`만 감싸서 `vaul`의
기본 `Overlay`(스타일만 `styles.overlay`로 교체)와 손잡이용 `div`(`styles.handle`)를 추가로
그린다. 배경 스크롤 잠금이나 오버레이 클릭 동작에 대한 커스텀 로직은 없다 — `vaul`의 기본
`Overlay`/스크롤 락 동작에 그대로 의존한다. `Content` 박스는 `maxHeight: 90vh`로 세로를
제한하고, 가로는 `shared/config/theme`의 `container` `maxWidth` 토큰(`1200px`)을 그대로 써서
`Container`/`Header` 등 페이지 콘텐츠 폭 계약과 일치시킨다(`boxSizing: 'border-box'`로
padding까지 포함해 맞춘다).

## PreorderModelSummary: CTA 표시는 스스로, 액션 실행은 페이지에 위임

`entities/preorder/ui/PreorderModelSummary/PreorderModelSummary.tsx`는 `isOver`/`isAlert` 두
boolean과 `onReserve`/`onNotify` 두 콜백을 받는다. 컴포넌트 내부에서 계산하는 것은 "무엇을
보여줄지"뿐이다.

```
isOver === true                  → CTA "예약 하기", onClick = onReserve
isOver === false && isAlert === false → CTA "알림 신청", onClick = onNotify
isOver === false && isAlert === true  → CTA "신청 완료", disabled, onClick 없음
```

"무엇을 할지"(상품 상세로 `navigate`할지, 알림 신청 처리를 할지)는 컴포넌트가 알지 못하고
호출부가 `onReserve`/`onNotify`로 그대로 주입한다 — `entities/product`의 `ProductSummary`가
`ctaLabel`/`onCtaClick`을 호출부에서 그대로 받는 것과 같은 책임 분리 패턴이다([상품 카탈로그
컴포넌트 구성](product-catalog.md) 참고). 다만 `ProductSummary`는 라벨 자체도 호출부가 정해서
넘기는 반면, `PreorderModelSummary`는 라벨과 `disabled` 상태를 `isOver`/`isAlert` 조합으로
스스로 계산한다는 차이가 있다.

## 페이지 조립: isAlert는 시트 전체가 공유한다

`PreorderDetailPage`는 시트 안에 `PreorderModelSummary`를 모델별로 두 번(`IPhone 18 Pro`,
`IPhone 18 Pro Max`) 렌더링하지만, `isAlert` state는 페이지에 하나뿐이라 두 행이 그대로
공유한다 — 한쪽에서 알림 신청을 완료하면(`handleNotify`가 `setIsAlert(true)`) 두 모델의 CTA가
동시에 "신청 완료"로 바뀐다. `handleNotify`의 완료 안내(`alert(...)`)도 클릭한 모델과 무관하게
항상 "IPhone 18 Pro 알림 신청이 완료됐습니다" 문구를 띄운다 — 모델별 알림 상태를 구분하려면
`isAlert`를 모델 키로 관리하는 구조로 바꿔야 한다. `onReserve`는 모델마다 다른
`navigate('/products/1')`/`navigate('/products/2')`를 넘겨 이동 경로는 모델별로 정확히
갈린다.

`handleActionClick`/`handleNotify`/`handleNotifySubmit` 세 핸들러 모두 실제 API 연동 전
`ponytail:` 주석이 달린 임시 처리다(오픈 시각 하드코딩 포함).

## 관련

- [Feature-Sliced Design 디렉터리 구조](../architecture/directory-structure.md) — `BottomSheet`/
  `PreorderModelSummary`가 어느 레이어에 있는지.
- [라우팅과 레이아웃 구성](../architecture/routing.md) — `/preorder/:preorderId` 라우트 등록.
- [상품 카탈로그 컴포넌트 구성](product-catalog.md) — 같은 "표시와 액션 분리" 패턴을 쓰는
  `ProductSummary`.
