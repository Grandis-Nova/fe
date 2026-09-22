---
type: architecture
title: 디자인 토큰과 vanilla-extract 스타일 시스템
description: shared/config/theme 아래의 color/typography/spacing/breakpoint/container/motion 토큰 체계와 sprinkles 반응형 유틸이 실제로 어떻게 쓰이는지 설명한다.
tags: [architecture, design-tokens, vanilla-extract, sprinkles, styling, frontend]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-21T01:15:36.692Z
sources:
  - id: openwiki-source-276795f6d5ad19adb078c64e
    resource: repo://eslint.config.js
  - id: openwiki-source-78ab8fda5442c3abe8a80e51
    resource: repo://src/entities/preorder/ui/PreorderCard/PreorderCard.css.ts
  - id: openwiki-source-180dbe3e59ccf9bf4f9ea9ad
    resource: repo://src/shared/config/theme/index.ts
  - id: openwiki-source-a2d17cc7a9c2e5a69a1bfd38
    resource: repo://src/shared/config/theme/mixins.ts
  - id: openwiki-source-52bc90a7f51011b21df8a8e3
    resource: repo://src/shared/config/theme/sprinkles.css.ts
  - id: openwiki-source-0be4609a25decb74f07c8bb9
    resource: repo://src/shared/config/theme/tokens/breakpoint.ts
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
  - id: openwiki-source-2ceede115a3430c4a9aaf46c
    resource: repo://src/shared/ui/BottomSheet/BottomSheet.css.ts
  - id: openwiki-source-3b45612287bea1ac240dba0c
    resource: repo://src/shared/ui/Button/Button.css.ts
generated: { by: "claude-code", at: "2026-09-21T01:15:36.692Z" }
---

## 개요

모든 스타일은 `src/shared/config/theme/` 아래에 정의된 디자인 토큰을 통해서만 값을 얻는다.
컴포넌트의 `*.css.ts` 파일이 색상·타이포그래피·간격 등을 직접 하드코딩하는 대신 이 토큰들을
import해서 쓰는 것이 관례이며, `CLAUDE.md`의 "Reuse before adding" 지침이 명시적으로 요구하는
바이기도 하다.

`src/shared/config/theme/index.ts`가 외부에 노출하는 공개 API는 `color`, `spacing`,
`typography`, `motion`, `sprinkles`(+`Sprinkles` 타입), `lineClamp`다. `breakpoint`,
`container`, `typography/base`는 이 배럴에 없어 `tokens/*` 경로에서 직접 import해야 한다 —
`.css.ts` 파일은 토큰 모듈을 대부분 직접 참조하는 vanilla-extract 관례를 따르고, `.tsx` 파일
(레이아웃 등)만 배럴에서 가져다 쓴다.

`lineClamp`는 `mixins.ts`가 내보내는 유일한 헬퍼로, 줄 수를 받아 `-webkit-line-clamp` 기반
말줄임 스타일 객체를 반환하는 함수다(토큰처럼 고정값이 아니라 인자를 받는 스타일 조각이라
`tokens/`가 아닌 별도 `mixins.ts`에 둔다). `entities/preorder`의 `PreorderCard` 제목이
`...lineClamp(2)`로 2줄 말줄임에 쓴다.

## 색상: semantic.css.ts 단일 파일

색상 토큰은 `tokens/color/semantic.css.ts` 한 파일로 구성된다. 과거에는 raw hex를 담는
`base.ts`와 용도별 이름을 매핑하는 `semantic.css.ts`로 2단 구성이었지만, 실제로 거의 모든
값이 1:1로만 매핑돼 있어 분리해 둘 이점이 크지 않다고 판단해 `base.ts`를 없애고 hex 값을
`semantic.css.ts`에 직접 인라인했다. `createGlobalTheme(':root', ...)`으로 `color` 객체를
만들고, `globalStyle('body', { color: color.text.primary })`로 바디 기본 텍스트 색을 전역
지정한다 — 히어로 섹션처럼 다른 색이 필요한 곳만 개별 스타일에서 덮어쓴다.

`backgroundDark`(`base`/`surface` 두 값만 있는 축소된 팔레트) 토큰은 `base.ts` 정리 이후에도
`color` 객체 안에 그대로 남아 있다 — 다만 `text`/`border` 등 다크모드에 필요한 나머지
카테고리는 다크 변형이 없고, `backgroundDark` 자체도 앱 코드 어디에서도 import되지 않는다.
즉 다크모드는 색상 토큰 절반만 준비된 채로 아직 구현되어 있지 않다.

## 타이포그래피: base 토큰 + 완성된 스타일 프리셋

`tokens/typography/base.ts`는 `fontFamily`/`fontWeight`/`fontSize`/`lineHeight`/
`letterSpacing` 원시 스케일을 담는다. `tokens/typography/semantic.css.ts`는 이걸 조합해
`title.xxlSemibold`, `body.defaultRegular`, `button.mdBold`처럼 **바로 쓸 수 있는
vanilla-extract 스타일 클래스**로 미리 만들어 둔다.

컴포넌트는 이 프리셋을 `.css.ts`에서 다른 값과 조합하지 않고, `.tsx`에서 `typography` 배럴을
import해 클래스명을 다른 스타일 클래스와 나란히 합성한다 — 예: `[typography.title.mdMedium,
styles.name].join(' ')`. `base.ts`의 원시 스케일을 직접 쓰는 경우는 프리셋에 없는 값(예:
배지의 `fontSize: '10px'`)이 필요할 때뿐이다.

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
"모바일 ↔ 데스크톱에 따라 실제로 달라지는" 속성만 반응형 유틸로 노출한다: `display`(`none`/
`block`/`flex`/`inline-flex`/`grid`), `flexDirection`, `alignItems`, `justifyContent`,
`flexWrap`, `gap`, `padding*`, `margin*`, `maxWidth`, `fontSize`, `color`. `color`는
`color.text.*` semantic 토큰으로 만든 `textColor` 맵을 쓰며, "그때그때 `.css.ts`를 새로
만들지 않고도 타이포그래피 프리셋 + `sprinkles(color)` 조합만으로 색 있는 텍스트를
완성"하려는 의도로 추가됐다.

조건은 `mobile`(`@media: breakpoint.mobile`, 기본값)과 `desktop`(`@media:
breakpoint.desktop`) 두 가지이며 둘 다 명시적 media query를 쓴다. `defaultCondition:
'mobile'`이라 모바일 값을 생략할 수 없다. **정적이라 브레이크포인트별로 안 바뀌는 값은
sprinkles를 쓰지 않고 plain `style()`로 남기는 것이 관례** — sprinkles는 반응형이 실제로
필요한 속성에만 쓴다.

## 토큰 import 경로: 상대경로가 아니라 `@/` 앨리어스

같은 컴포넌트 폴더 안의 형제 파일(예: `Button.tsx`가 `./Button.css`를 참조)은 상대경로를
쓰지만, `shared/config/theme` 밖으로 나가 토큰을 참조할 때는 상대경로(`../../config/theme/...`)
대신 `@/shared/config/theme/...` 앨리어스를 쓴다. 이건 스타일 취향이 아니라
`eslint.config.js`의 `import-x/order` 설정이 실제로 구분하는 경계다 — `pathGroups`가
`@/**`를 `external` 다음, `parent`/`sibling`(상대경로) 앞에 오는 별도 `internal` 그룹으로
분리해 두 스타일이 같은 파일 안에서 섞이면 그룹 순서가 어긋난다. `BottomSheet.css.ts`,
`PreorderCard.css.ts`처럼 이후에 작성된 컴포넌트들은 처음부터 `@/shared/config/theme/...`를
쓰고, `shared/ui`의 오래된 컴포넌트들(`Button`, `Checkbox`, `Dropdown`, `Input`, `Navigator`,
`SelectButton`, `Tag`, `Toggle`, `SwirlBackground`)도 컴포넌트별 폴더로 옮기면서 같은 방식으로
정리됐다.

## 관련

- 이 토큰들을 실제로 쓰는 FSD 레이어 배치는 [Feature-Sliced Design 디렉터리 구조](directory-structure.md) 참고.
- 상품 카탈로그 컴포넌트들이 이 토큰을 어떻게 조합하는지는 [상품 카탈로그 컴포넌트 구성](../features/product-catalog.md) 참고.
