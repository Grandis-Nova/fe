---
type: architecture
title: 빌드 및 스타일링 도구 구성
description: Vite, TypeScript, Vanilla Extract, oxlint가 어떻게 연결되어 이 저장소의 개발/빌드/린트 파이프라인을 이루는지 설명한다.
tags: [architecture, build, vite, typescript, vanilla-extract, oxlint, tooling]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-15T04:58:54.229Z
sources:
  - id: openwiki-source-bbf3d58bf1c2c539fc59e66c
    resource: repo://.oxlintrc.json
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-53cd11a62a817d2042fa22d0
    resource: repo://src/app/App.css.ts
  - id: openwiki-source-c5a2ecd4ab5ca01116080973
    resource: repo://src/app/styles/index.css
  - id: openwiki-source-81cf84df6b5988f0684554d1
    resource: repo://tsconfig.app.json
  - id: openwiki-source-98d5ddb014a0fd4d678f6f2a
    resource: repo://tsconfig.json
  - id: openwiki-source-66b17f07b4ebfe7c85be1d44
    resource: repo://tsconfig.node.json
  - id: openwiki-source-5e1b077422a94ae165e88e4e
    resource: repo://vite.config.ts
generated: { by: "claude-code", at: "2026-09-15T04:58:54.229Z" }
---

## 개요

이 저장소는 Vite를 번들러로, TypeScript를 타입 체커로, Vanilla Extract를 CSS-in-TS
솔루션으로, oxlint를 린터로 사용한다. 네 도구는 [package.json](repo://package.json)의
스크립트와 [vite.config.ts](repo://vite.config.ts)의 플러그인 설정을 통해 하나의
파이프라인으로 연결된다.

## 스크립트

`package.json`에 정의된 스크립트는 다음과 같다.

- `dev` — `vite` 개발 서버 실행
- `build` — `tsc -b && vite build`. TypeScript 프로젝트 참조 빌드(`tsc -b`)로 타입 에러를
  먼저 검사한 뒤, 통과하면 Vite가 실제 프로덕션 번들을 생성한다.
- `lint` — `oxlint` 실행
- `preview` — Vite로 빌드 결과물을 로컬에서 미리보기

## Vite 플러그인 구성

[vite.config.ts](repo://vite.config.ts)는 두 개의 플러그인을 등록한다.

- `@vitejs/plugin-react` — React 컴포넌트의 JSX 트랜스폼과 Fast Refresh(HMR)를 지원.
- `@vanilla-extract/vite-plugin`의 `vanillaExtractPlugin()` — `.css.ts` 확장자를 가진
  파일을 빌드 타임에 정적 CSS로 컴파일하는 Vanilla Extract 통합.

두 플러그인 모두 없으면 각각 JSX 파일과 `.css.ts` 파일이 처리되지 않으므로, 이 등록이
React + Vanilla Extract 조합이 동작하는 핵심 연결점이다.

## Vanilla Extract 사용 방식

Vanilla Extract는 일반 CSS가 아니라 TypeScript 파일(`*.css.ts`)로 스타일을 작성하고,
빌드 시 정적 CSS로 추출되는 zero-runtime CSS-in-JS 방식이다. 이 저장소에서는
[App.css.ts](repo://src/app/App.css.ts)가 `@vanilla-extract/css`의 `style()` 함수로
클래스(`card`, `logo`)를 정의하고, `App.tsx`가 이를 객체로 import해 `className`에
연결한다. `logo` 스타일은 `:hover` 의사 클래스를 style 객체 안에서 직접 표현한다.

일반 전역 CSS(리셋, 폰트 등)는 Vanilla Extract가 아니라
[styles/index.css](repo://src/app/styles/index.css)처럼 순수 `.css` 파일로 유지된다.
즉 이 저장소는 "컴포넌트 스코프 스타일은 `.css.ts`, 전역 스타일은 `.css`"로 역할을
나누고 있다.

## TypeScript 프로젝트 구성

[tsconfig.json](repo://tsconfig.json)은 파일을 직접 포함하지 않고 두 하위 구성을
project reference로 묶기만 한다.

- [tsconfig.app.json](repo://tsconfig.app.json) — `src/` 아래 애플리케이션 코드용. 번들러
  모듈 해석(`moduleResolution: "bundler"`), JSX(`react-jsx`), `noEmit`을 사용해 Vite가
  실제 트랜스파일을 담당하고 TypeScript는 타입 검사만 수행하도록 분리되어 있다.
- [tsconfig.node.json](repo://tsconfig.node.json) — `vite.config.ts` 자체를 Node.js
  실행 컨텍스트 기준으로 타입 검사하기 위한 별도 구성.

`tsc -b`(build 스크립트)는 이 두 project reference를 함께 검사한다.

## 린트 구성

[.oxlintrc.json](repo://.oxlintrc.json)은 oxlint에 `react`, `typescript`, `oxc`
플러그인을 활성화하고, `react/rules-of-hooks`를 에러로, 상수만 내보내는 경우를 허용하는
`react/only-export-components`를 경고로 설정한다.
