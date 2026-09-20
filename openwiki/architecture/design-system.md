---
type: architecture
title: 디자인 토큰과 vanilla-extract 스타일 시스템
description: shared/config/theme 아래의 color/typography/spacing/breakpoint/container/motion 토큰 체계와 sprinkles 반응형 유틸이 컴포넌트 스타일링에서 실제로 어떻게 쓰이는지 설명한다.
tags:
  [architecture, design-tokens, vanilla-extract, sprinkles, styling, frontend]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-19T17:13:03.359Z
sources:
  - id: openwiki-source-180dbe3e59ccf9bf4f9ea9ad
    resource: repo://src/shared/config/theme/index.ts
  - id: openwiki-source-52bc90a7f51011b21df8a8e3
    resource: repo://src/shared/config/theme/sprinkles.css.ts
  - id: openwiki-source-0be4609a25decb74f07c8bb9
    resource: repo://src/shared/config/theme/tokens/breakpoint.ts
  - id: openwiki-source-c5f0bcf84711f717c2632871
    resource: repo://src/shared/config/theme/tokens/color/base.ts
  - id: openwiki-source-cb18dcc3ecd805fce57e1b7d
    resource: repo://src/shared/config/theme/tokens/color/semantic.css.ts
  - id: openwiki-source-c511d4b4028e1d99563eace8
    resource: repo://src/shared/config/theme/tokens/container.ts
  - id: openwiki-source-c07b163d03be3a03c29718d8
    resource: repo://src/shared/config/theme/tokens/motion.ts
  - id: openwiki-source-a98df67ed90ead24e1d9402f
    resource: repo://src/shared/config/theme/tokens/spacing.ts
  - id: openwiki-source-60f66069b720e1c7eb394b69
    resource: repo://src/shared/config/theme/tokens/typography/base.ts
generated: { by: 'claude-code', at: '2026-09-19T17:13:03.359Z' }
---

## 개요

모든 스타일은 `src/shared/config/theme/` 아래에 정의된 디자인 토큰을 통해서만 값을 얻는다.
컴포넌트의 `*.css.ts` 파일이 색상·타이포그래피·간격 등을 직접 하드코딩하는 대신 이 토큰들을
import해서 쓰는 것이 관례이며, `CLAUDE.md`의 "Reuse before adding" 지침이 명시적으로 요구하는
바이기도 하다.

`src/shared/config/theme/index.ts`가 외부에 노출하는 공개 API는 `color`, `typography`,
`motion`, `sprinkles` 네 가지뿐이다. `spacing`, `breakpoint`, `container`, `typography/base`
등은 이 배럴을 거치지 않고 `tokens/*` 경로에서 직접 import한다 — `.css.ts` 파일은 토큰 모듈을
직접 참조하는 vanilla-extract 관례를 따르고, `.tsx` 파일(레이아웃 등)만 `sprinkles`/`color`/
`motion`을 배럴에서 가져다 쓴다.

## 색상: base → semantic 2단 구조

`tokens/color/base.ts`의 `baseColor`는 raw hex 값만 담는다(`primary.base = '#3F4891'` 등).
`tokens/color/semantic.css.ts`는 `createGlobalTheme(':root', ...)`으로 이 raw 값들을 **용도
이름**으로 다시 매핑한 `color` 객체를 만든다 — 예를 들어 `color.primary.hover`는
`baseColor.primary.focus`를 가리킨다. 실제 컴포넌트 코드는 항상 `color`(semantic)만
참조하고 `baseColor`를 직접 쓰지 않는다.

`semantic.css.ts`는 여기에 더해 `globalStyle('body', { color: color.text.primary })`로
바디 기본 텍스트 색을 전역으로 한 번 지정한다 — 히어로 섹션처럼 다른 색이 필요한 곳만
개별 스타일에서 덮어쓴다.

## 타이포그래피: base 토큰 + 완성된 스타일 프리셋

`tokens/typography/base.ts`는 `fontFamily`/`fontWeight`/`fontSize`/`lineHeight`/
`letterSpacing` 원시 스케일을 담는다. `tokens/typography/semantic.css.ts`는 이걸 조합해
`title.xxlSemibold`, `body.defaultRegular`, `button.mdBold`처럼 **바로 쓸 수 있는
vanilla-extract 스타일 클래스**로 미리 만들어 둔다. 컴포넌트는 보통 `title`/`body`/`button`
같은 완성된 프리셋을 `style([titleToken.lgSemibold, {...}])` 형태로 확장해서 쓰고, `base.ts`의
원시 스케일을 직접 쓰는 경우는 프리셋에 없는 값(예: 아이콘 옆 배지의 `fontSize[12]`)이
필요할 때뿐이다.

## spacing / motion / container / breakpoint

- `spacing`: 0~100px 사이 고정 스텝(`0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 30, 32, 40, 50,
60, 70, 80, 90, 100`) 스케일. padding/gap/margin은 이 스케일 중 정확히 일치하는 값이 있으면
  반드시 이걸 쓴다 — 없는 값(예: 5px)만 리터럴로 남긴다.
- `motion`: `duration.fast`(150ms)와 `easing.default`(ease) 두 값뿐인 최소 구성. transition을
  쓰는 모든 곳이 이 두 토큰을 참조한다.
- `container`: `maxWidth.content`(1200px), `maxWidth.full`(100%), `maxWidth.none` — 페이지
  본문 폭 제한에 쓰는 스케일.
- `breakpoint`: `mobile`(`max-width: 743px`)과 `desktop`(`min-width: 744px`) 두 값. 모바일
  우선(mobile-first) 설계의 기준점.

## sprinkles: 반응형 전용 유틸

`sprinkles.css.ts`는 `@vanilla-extract/sprinkles`의 `defineProperties`/`createSprinkles`로
"모바일 ↔ 데스크톱에 따라 실제로 달라지는" 속성만 반응형 유틸로 노출한다: `display`,
`flexDirection`, `alignItems`, `justifyContent`, `flexWrap`, `gap`, `padding*`, `margin*`,
`maxWidth`, `fontSize`, `color`. `color`는 `color.text.*` semantic 토큰으로 만든 `textColor`
맵을 쓰며, "그때그때 `.css.ts`를 새로 만들지 않고도 타이포그래피 프리셋 + `sprinkles(color)`
조합만으로 색 있는 텍스트를 완성"하려는 의도로 추가됐다.

조건은 `mobile`(기본값)과 `desktop`(`@media: breakpoint.desktop`) 두 가지뿐이고,
`defaultCondition: 'mobile'`이라 모바일 값을 생략할 수 없다. **정적이라 브레이크포인트별로
안 바뀌는 값은 sprinkles를 쓰지 않고 plain `style()`로 남기는 것이 관례** — sprinkles는
반응형이 실제로 필요한 속성에만 쓴다.

## 관련

- 이 토큰들을 실제로 쓰는 FSD 레이어 배치는 [Feature-Sliced Design 디렉터리 구조](directory-structure.md) 참고.
- 상품 카탈로그 컴포넌트들이 이 토큰을 어떻게 조합하는지는 [상품 카탈로그 컴포넌트 구성](../features/product-catalog.md) 참고.
