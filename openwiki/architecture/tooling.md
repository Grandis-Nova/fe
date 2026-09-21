---
type: architecture
title: 빌드 및 스타일링 도구 구성
description: Vite, TypeScript, ESLint(oxlint에서 전환), Vanilla Extract, Storybook이 어떻게 연결되어 개발/빌드/린트/컴포넌트 문서화 파이프라인을 이루는지 설명한다.
tags:
  [
    architecture,
    build,
    vite,
    typescript,
    vanilla-extract,
    eslint,
    storybook,
    tooling,
  ]
sources:
  - id: openwiki-source-1911308755a010411fc9869e
    resource: repo://.prettierrc
  - id: openwiki-source-808b9ff10fba3d7819aa09ab
    resource: repo://.storybook/main.ts
  - id: openwiki-source-dc148dcfd63a2eebc35c0f06
    resource: repo://.storybook/preview.tsx
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-c5a2ecd4ab5ca01116080973
    resource: repo://src/app/styles/index.css
  - id: openwiki-source-81cf84df6b5988f0684554d1
    resource: repo://tsconfig.app.json
  - id: openwiki-source-98d5ddb014a0fd4d678f6f2a
    resource: repo://tsconfig.json
  - id: openwiki-source-5e1b077422a94ae165e88e4e
    resource: repo://vite.config.ts
generated: { by: "claude-code", at: "2026-09-20T09:53:37.867Z" }
verified:
  - by: openwiki/0.5.0
    at: 2026-09-20T09:53:37.867Z
---

## 개요

Vite가 번들러, TypeScript가 타입 체커, Vanilla Extract가 CSS-in-TS 솔루션, ESLint가
린터, Prettier가 포맷터, Storybook이 컴포넌트 문서화/테스트 도구다. `package.json`
스크립트와 `vite.config.ts`의 플러그인 설정이 이들을 하나의 파이프라인으로 연결한다.

## 스크립트

- `dev` — `vite` 개발 서버
- `build` — `tsc -b && vite build`. TypeScript 프로젝트 참조 빌드가 먼저 통과해야 Vite가
  실제 프로덕션 번들을 만든다.
- `lint` / `lint:fix` — `eslint .` / `eslint . --fix`
- `format` / `format:fix` — `prettier --check .` / `prettier --write .`
- `preview` — 빌드 결과물 로컬 미리보기
- `storybook` — `:6006`에서 Storybook 개발 서버
- `build-storybook` — Storybook 정적 빌드

## 포맷터: Prettier

`.prettierrc`는 `singleQuote: true, semi: false`만 지정한다 — 나머지는 Prettier 기본값을
따른다. ESLint와 별도 도구로 분리되어 있어(`eslint-config-prettier`로 규칙 충돌 방지),
포맷은 Prettier가, 코드 품질/레이어 경계는 ESLint가 담당하는 역할 분리 구조다.

## 린터: ESLint

린터는 `eslint.config.js` 기반 ESLint 하나뿐이다. 이전에 쓰이던 `oxlint`는 devDependency와
`.oxlintrc.json` 설정 파일 모두 저장소에서 완전히 제거됐다. ESLint 쪽은
`import-x`(FSD 레이어 경계 강제, import 순서),
`unused-imports`, `react-hooks`, `react-refresh`, `eslint-plugin-storybook`,
`typescript-eslint`를 조합한다. FSD 레이어 경계 규칙 자체는
[Feature-Sliced Design 디렉터리 구조](directory-structure.md)에서 다룬다.

## Vite 플러그인과 테스트 통합

`vite.config.ts`는 `@vitejs/plugin-react`(JSX/Fast Refresh)와
`@vanilla-extract/vite-plugin`의 `vanillaExtractPlugin()`(`.css.ts` 빌드 타임 컴파일)을
등록한다. 또한 `@/*` → `src/*` 경로 별칭을 정의하고, `test.projects`에
`@storybook/addon-vitest`의 `storybookTest()`를 연결해 `.storybook` 설정 기준으로 스토리를
브라우저 모드 Vitest(`@vitest/browser-playwright`, Chromium)로 실행하도록 구성돼 있다 —
즉 Storybook 스토리 자체가 Vitest 테스트로도 실행된다.

## Vanilla Extract 사용 방식

컴포넌트 스코프 스타일은 `*.css.ts`(Vanilla Extract, zero-runtime CSS-in-JS)로, 전역
스타일(리셋 등)은 `src/app/styles/index.css` 같은 순수 `.css` 파일로 역할이 나뉜다.
디자인 토큰 자체와 각 토큰이 어떻게 조합되는지는
[디자인 토큰과 vanilla-extract 스타일 시스템](design-system.md) 참고.

## TypeScript 프로젝트 구성

`tsconfig.json`은 파일을 직접 포함하지 않고 두 project reference를 묶는다.

- `tsconfig.app.json` — `src/` 애플리케이션 코드용. `moduleResolution: "bundler"`,
  `jsx: "react-jsx"`, `noEmit: true`로 트랜스파일은 Vite가, 타입 검사만 TypeScript가
  담당하도록 분리돼 있다. `@/*` → `./src/*` paths 별칭도 여기서 정의된다.
- `tsconfig.node.json` — `vite.config.ts` 자체를 Node.js 실행 컨텍스트로 타입 검사하기
  위한 별도 구성.

`tsc -b`(build 스크립트)가 이 두 project reference를 함께 검사한다.

## Storybook 구성

`.storybook/main.ts`는 `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`와 `*.mdx`를 스토리로
수집하고, `@chromatic-com/storybook`, `@storybook/addon-vitest`, `@storybook/addon-a11y`,
`@storybook/addon-docs`, `@storybook/addon-mcp` 애드온과 `@storybook/react-vite`
프레임워크를 쓴다. `.storybook/preview.tsx`는 모든 스토리에 전역 스타일(`app/styles/index.css`)과
디자인 토큰(`shared/config/theme`)을 로드하고, 접근성 검사(`a11y`)는 `test: 'todo'`로
설정돼 있어 위반이 있어도 CI를 실패시키지 않고 테스트 UI에만 표시된다.

각 UI 컴포넌트는 관례적으로 같은 폴더에 `ComponentName.stories.tsx`를 함께 둔다.
