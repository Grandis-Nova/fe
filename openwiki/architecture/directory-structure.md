---
type: architecture
title: Feature-Sliced Design 디렉터리 구조
description: src/ 하위에 채택된 Feature-Sliced Design(FSD) 레이어 구성과 각 레이어의 현재 사용 현황, 레이어 간 의존 방향 규칙을 설명한다.
tags: [architecture, fsd, feature-sliced-design, directory-structure, frontend]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-15T04:58:54.229Z
sources:
  - id: openwiki-source-4558ea953713960cf3fda474
    resource: repo://src/app/App.tsx
  - id: openwiki-source-145567731ef0344c954e7403
    resource: repo://src/entities/.gitkeep
  - id: openwiki-source-ddced469b618190cca481e4b
    resource: repo://src/features/.gitkeep
  - id: openwiki-source-95bfccfd0c712f6e72040e0d
    resource: repo://src/main.tsx
  - id: openwiki-source-57cde219e3643de4678ec1d1
    resource: repo://src/pages/.gitkeep
  - id: openwiki-source-f86d0187ad9616f2b9eabad8
    resource: repo://src/shared/assets/react.svg
  - id: openwiki-source-01ba3dd405d5a10d849d179b
    resource: repo://src/shared/assets/vite.svg
  - id: openwiki-source-3ebc8268b4effeb57796c327
    resource: repo://src/widgets/.gitkeep
generated: { by: "claude-code", at: "2026-09-15T04:58:54.229Z" }
---

## 개요

이 저장소의 `src/` 디렉터리는 Feature-Sliced Design(FSD) 컨벤션을 따른다. FSD는 코드를
"레이어(layer)"로 나누고, 상위 레이어는 하위 레이어를 참조할 수 있지만 그 반대는 금지하는
단방향 의존 규칙으로 구성을 통제하는 프런트엔드 아키텍처 방법론이다.

현재 채택된 레이어는 위에서 아래 순서로 다음과 같다.

- `app` — 앱 진입점, 루트 컴포넌트, 전역 스타일
- `pages`
- `widgets`
- `features`
- `entities`
- `shared` — 레이어 계층에서 가장 아래, 모든 레이어가 참조할 수 있는 공용 자산

## 레이어별 현재 상태

### app

루트 컴포넌트와 전역 스타일이 위치한다.

- [App.tsx](repo://src/app/App.tsx) — 앱의 루트 React 컴포넌트. 카운터 상태를 가진 데모 UI를
  렌더링하며, 스타일은 같은 디렉터리의 [App.css.ts](repo://src/app/App.css.ts)(vanilla-extract)에서
  가져온다.
- [styles/index.css](repo://src/app/styles/index.css) — 앱 전역에 적용되는 일반 CSS.

`src/main.tsx`는 FSD 레이어 밖에 있는 순수 부트스트랩 파일로, React 루트를 생성하고
`app` 레이어의 `App` 컴포넌트와 전역 스타일을 불러오기만 한다.

### pages / widgets / features / entities

네 레이어 모두 아직 실제 코드가 없고, 디렉터리가 git에서 추적되도록 자리표시자
`.gitkeep` 파일만 존재한다([pages/.gitkeep](repo://src/pages/.gitkeep),
[widgets/.gitkeep](repo://src/widgets/.gitkeep),
[features/.gitkeep](repo://src/features/.gitkeep),
[entities/.gitkeep](repo://src/entities/.gitkeep)). 실제 화면·기능·도메인 코드가 추가되면
해당 레이어 아래에 슬라이스(slice) 디렉터리를 만들어 채워나가는 구조다.

### shared

레이어 전반에서 재사용되는 자산이 위치한다. 현재는 이미지 자산만 존재한다.

- [react.svg](repo://src/shared/assets/react.svg), [vite.svg](repo://src/shared/assets/vite.svg) —
  `app` 레이어의 `App.tsx`가 가져다 쓰는 로고 이미지.

`shared` 레이어의 관례적 하위 세그먼트인 `ui`, `lib`, `api`, `config`는 아직 내용이 없어
디렉터리 자체가 만들어져 있지 않다. 필요해지는 시점에 추가한다.

## 의존 방향

FSD 규칙상 `app` → `pages` → `widgets` → `features` → `entities` → `shared` 순으로만
import가 허용되고 역방향 import는 금지된다. 예를 들어 `app/App.tsx`가
`shared/assets`를 가져오는 것은([App.tsx](repo://src/app/App.tsx)) 상위 레이어가 하위
레이어를 참조하는 정상적인 방향이다. 이 규칙은 현재 별도의 lint 플러그인으로 강제되고
있지 않으며, 슬라이스 수가 늘어나 위반 사례가 실제로 발생하면 검토할 수 있다.
