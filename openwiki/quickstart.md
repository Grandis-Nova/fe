---
type: quickstart
title: 빠른 시작
description: 저장소를 처음 접하는 사람이 로컬에서 실행하고, 이 위키에서 어디를 봐야 할지 찾도록 안내하는 진입 페이지.
tags: [quickstart, onboarding, getting-started]
verified:
  - by: openwiki/0.5.0
    at: 2026-09-15T04:58:54.229Z
sources:
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-95bfccfd0c712f6e72040e0d
    resource: repo://src/main.tsx
generated: { by: "claude-code", at: "2026-09-15T04:58:54.229Z" }
---

## 이 저장소는 무엇인가

Vite로 스캐폴딩한 React + TypeScript 프로젝트다. 스타일링은 Vanilla Extract(zero-runtime
CSS-in-TS)를 사용하고, `src/` 디렉터리 구조는 Feature-Sliced Design(FSD) 컨벤션을
따른다. 아직 초기 스캐폴딩 단계라 실제 기능 코드는 거의 없다.

## 로컬 실행

[package.json](repo://package.json)에 정의된 스크립트를 사용한다.

```bash
npm install
npm run dev       # 개발 서버 (Vite + HMR)
npm run build     # tsc -b 타입 체크 후 프로덕션 번들 생성
npm run preview   # 빌드 결과물 로컬 미리보기
npm run lint       # oxlint 실행
```

앱 진입점은 [src/main.tsx](repo://src/main.tsx)이며, React 루트를 생성하고 `app` 레이어의
루트 컴포넌트와 전역 스타일을 불러온다.

## 이 위키에서 다음에 볼 곳

- [디렉터리 구조](repo://openwiki/architecture/directory-structure.md) — `src/`가
  FSD 레이어(app/pages/widgets/features/entities/shared)로 어떻게 나뉘어 있고 각
  레이어에 지금 무엇이 들어있는지.
- [빌드 및 스타일링 도구 구성](repo://openwiki/architecture/tooling.md) — Vite,
  TypeScript, Vanilla Extract, oxlint가 어떻게 연결되어 개발/빌드 파이프라인을
  이루는지.

## 참고

Vite React+TS 템플릿이 기본으로 제공하는 SWC 기반 플러그인 대안, React Compiler 도입
방법, oxlint의 타입 인지(type-aware) 규칙 확장 방법은 [README.md](repo://README.md)에
설명되어 있다.
