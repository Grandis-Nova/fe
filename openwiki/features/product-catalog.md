---
type: concept
title: 상품 카탈로그 컴포넌트 구성
description: entities/product 슬라이스의 ProductCard/ProductColorSwatches/ProductOptionSelector/ProductPaymentCard/ProductSummary가 어떤 책임을 나누어 갖고 서로 어떻게 합성되는지 설명한다.
tags: [concept, entities, product, component-composition, frontend]
sources:
  - id: openwiki-source-d776cca5236e216ba85991fa
    resource: repo://src/entities/product/index.ts
  - id: openwiki-source-53658e0977cb67181465a15b
    resource: repo://src/entities/product/ui/ProductCard/ProductCard.tsx
  - id: openwiki-source-cc6e6776447ca864721deee9
    resource: repo://src/entities/product/ui/ProductColorSwatches/ProductColorSwatches.tsx
  - id: openwiki-source-fa12911d3200298e9428096c
    resource: repo://src/entities/product/ui/ProductOptionSelector/ProductOptionSelector.tsx
  - id: openwiki-source-da483db467471eaa7c1fc5fa
    resource: repo://src/entities/product/ui/ProductPaymentCard/ProductPaymentCard.tsx
  - id: openwiki-source-8194c2288602f84972a1ce3d
    resource: repo://src/entities/product/ui/ProductSummary/ProductSummary.tsx
generated: { by: "claude-code", at: "2026-09-20T09:53:37.867Z" }
verified:
  - by: openwiki/0.5.0
    at: 2026-09-20T09:53:37.867Z
---

## 개요

`entities/product`는 다섯 개의 독립된 UI 컴포넌트로 구성되며, 각각 `ui/<ComponentName>/`
하위 폴더에 `<ComponentName>.tsx` + `.css.ts` + `.stories.tsx` + `index.ts`를 갖는다.
`entities/product/index.ts`가 다섯 컴포넌트 전부와 관련 타입을 공개 API로 재수출한다.
이 페이지는 `entities/product` 범위만 다룬다 — `entities/order`, `entities/preorder`,
`entities/review` 등 다른 도메인 슬라이스는 별개다.

## ProductCard: 데이터 객체 props + ProductColorSwatches 합성

`ProductCard`는 개별 필드를 나열하는 대신 `product: ProductCardData` 객체 하나로 데이터
props를 묶고, 별도로 `onColorSelect`/`onStorageSelect` 콜백과 `className`만 얕은 레벨
props로 받는다(`ProductCardProps = { product, onColorSelect?, onStorageSelect?,
className? }`). `ProductCardData`의 `colorSwatches` 필드는 자체 타입을 새로 선언하지 않고
`ProductColorSwatches`가 export하는 `ProductColorSwatchItem`을 그대로 재사용한다.

렌더링 시 `ProductCard`는 색상 선택 UI를 직접 그리지 않고 `<ProductColorSwatches
colorName={colorName} size="small" colors={colorSwatches} onSelect={onColorSelect} />`로
위임한다 — 즉 `ProductCard`는 카드 레이아웃(이미지, 이름/모델명, 용량 선택, 가격)만
책임지고 색상 선택 로직과 마크업은 `ProductColorSwatches`가 전담한다. 용량 선택은
`ProductColorSwatches`처럼 별도 컴포넌트로 빼지 않고 `shared/ui`의 `SelectButton`을 직접
매핑해서 쓴다.

## ProductColorSwatches: 왜 shared/ui의 Button을 재사용하지 않는가

`ProductColorSwatches.tsx` 상단 주석은 이 설계 결정의 근거를 명시한다: `shared/ui`의
`Button`은 "행동을 실행"하는 CTA(확인, 제출 등)를 위한 컴포넌트라 라벨/색상 팔레트 API를
갖지만, 색상 스와치는 여러 옵션 중 하나를 고르는 선택 상태(라디오에 가까움)라 성격이
달라 `Button`을 재사용하지 않고 별도 컴포넌트로 분리했다. 그래서 선택 여부를 `aria-pressed`
로 표현하고, `onSelect`가 없으면 `disabled`인 순수 표시 전용 모드로도 동작한다.
`size: 'small' | 'medium'` 두 변형을 지원한다. 실제 소비처인 `ProductCard`는 `small`만
쓰고, `medium`은 현재 스토리북 스토리(`MediumInteractive`)에만 존재한다 — 이전에 있던
`ProductColorSelector`(medium 크기 전용 래퍼)는 더 이상 코드베이스에 없다.

## ProductOptionSelector: 범용 라벨-옵션 선택 컴포넌트

`ProductOptionSelector`는 `label`(예: "저장 용량")과 `ProductOption[]`(`{ label, selected? }`)
을 받아 `shared/ui`의 `SelectButton`을 `medium` 크기로 나열하는 범용 컴포넌트다.
`ProductCard`처럼 도메인 데이터 객체를 받지 않고 얕은 props를 그대로 받는다 — 용량 외에도
같은 "라벨 + 선택형 옵션 목록" 형태라면 재사용할 수 있는 범용 선택 UI다.

## ProductPaymentCard: variant로 갈라지는 결제/주문 맥락 카드

`ProductPaymentCard`는 `variant: 'default' | 'preorder-pending' | 'checkout' | 'cart'`
하나로 네 가지 맥락을 한 컴포넌트에서 처리한다. `variant === 'cart'`일 때만 좌측에
`shared/ui`의 `Checkbox`가 나타나고, `preorder-pending`/`checkout`일 때만 액션 버튼이
나타나며 두 경우 각각 다른 색 스타일(`actionPending`/`actionCheckout`)을 쓴다.
`imageSrc`가 없으면 빈 `thumbnail` div로 대체한다.

## ProductSummary: 이름/옵션 요약 + CTA 바

`ProductSummary`는 상품명, 옵션 요약 텍스트, CTA 버튼(`ctaLabel`/`onCtaClick`)만 가진
가장 단순한 컴포넌트로, 다른 네 컴포넌트와 달리 색상/이미지/가격을 다루지 않는다.

## 타이포그래피 적용 방식

다섯 컴포넌트 모두 `.css.ts`에서 `title`/`body`/`button` 프리셋을 더 이상 조합하지 않는다.
대신 `.tsx`에서 `@/shared/config/theme`의 `typography` 배럴을 import해 `[typography.title
.mdMedium, styles.name].join(' ')`처럼 프리셋 클래스명을 나머지 스타일과 className 레벨에서
직접 합성한다(`PreorderPage`와 동일한 패턴). `.css.ts`는 색상·레이아웃 등 프리셋이 아닌
값만 갖는다.

`ProductColorSwatches`는 `size`에 따라 다른 프리셋(`small`→`body.caption`,
`medium`→`body.subMedium`)을 써야 해서, 컴포넌트 안에 `colorNameTypography = { small:
typography.body.caption, medium: typography.body.subMedium }` 매핑 객체를 두고
`colorNameTypography[size]`로 골라 쓴다 — 정적으로 하나만 쓰면 되는 다른 컴포넌트와 달리
런타임 `size` 값에 따라 분기해야 하기 때문이다.

## 관련

- [디자인 토큰과 vanilla-extract 스타일 시스템](../architecture/design-system.md)
- [메인 페이지 히어로 오토스크롤 캐러셀](main-page-carousel.md) — `ProductCard`가 실제로
  쓰이는 화면.
