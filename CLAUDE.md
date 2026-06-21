# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

---

## 프로젝트 개요

개발자 웹 이력서 프로젝트입니다. 빌드 도구 없이 브라우저에서 직접 실행되는 순수 정적 웹사이트입니다.

**기술 스택**: HTML5 · CSS3 · Vanilla JavaScript · Tailwind CSS (CDN)

**개발 로드맵**: `ROADMAP.md` 참고

---

## 프로젝트 구조

```
resume/
├── index.html       # 이력서 전체 마크업 (단일 페이지)
├── css/
│   └── style.css    # Tailwind 확장 커스텀 스타일, CSS 변수, 애니메이션
├── js/
│   └── main.js      # 네비게이션, 타이핑 효과, 스크롤 이벤트, 폼 유효성 검사
└── assets/
    ├── images/      # 프로필 사진, 프로젝트 썸네일
    └── icons/       # SVG 아이콘
```

---

## 개발 및 실행

빌드 과정 없이 `index.html`을 브라우저에서 직접 열어 개발합니다.

```bash
# VS Code Live Server 확장 또는 아래 명령어로 로컬 서버 실행
npx serve .
# 또는
python3 -m http.server 3000
```

---

## 아키텍처 핵심 사항

- **단일 페이지 구성**: 모든 섹션이 `index.html` 하나에 존재하며, JS로 스무스 스크롤 처리
- **Tailwind CSS**: CDN 방식으로 로드. 커스텀 스타일은 `css/style.css`에 작성하고 Tailwind 클래스와 병행 사용
- **다크모드**: CSS 변수(`--color-*`)로 색상 토큰을 관리하고, `<html>` 태그의 `data-theme` 속성으로 전환
- **스크롤 애니메이션**: `Intersection Observer API`를 사용해 섹션 진입 시 페이드인 처리 (`js/main.js`)
- **폼 처리**: 백엔드 없이 JavaScript 유효성 검사만 수행 (실제 전송은 별도 연동 필요)

---

## 이력서 섹션 구성

| 섹션 ID | 역할 |
|---------|------|
| `#hero` | 이름, 직함, 타이핑 애니메이션, CTA 버튼 |
| `#about` | 프로필 사진, 자기소개, 핵심 역량 뱃지 |
| `#skills` | 기술 스택 아이콘 + 숙련도 프로그레스 바 |
| `#experience` | 세로 타임라인 경력 목록 |
| `#projects` | 프로젝트 카드 그리드 |
| `#education` | 학력 및 자격증 |
| `#contact` | 연락처, 소셜 링크, 문의 폼 |
