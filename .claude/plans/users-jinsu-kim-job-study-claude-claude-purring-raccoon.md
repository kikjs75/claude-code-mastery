# 계획: GovernX 스타일 다크 대시보드 이력서 리디자인

## Context
현재 이력서는 라이트/다크 토글 방식의 블루 계열 디자인이다. 사용자가 GovernX 금융 대시보드(짙은 흑색 배경, 카드 패널, 브라이트 그린 액센트) 스타일의 모던하고 세련된 다크 전용 디자인으로 전면 개편을 요청했다.

---

## 목표 디자인 시스템

### 색상 토큰
```css
:root {
  --color-bg:               #0A0D12;   /* 최심층 배경 */
  --color-surface:          #0F1318;   /* 카드/패널 */
  --color-surface-elevated: #141921;   /* hover/active */
  --color-border:           #1C2333;   /* 카드 경계 */
  --color-border-subtle:    #151D2C;
  --color-accent:           #00D17A;   /* 기본 그린 */
  --color-accent-dim:       rgba(0,209,122,0.10);
  --color-text:             #E2E8F2;
  --color-text-muted:       #5E6E8A;
  --color-text-dim:         #3D4F6B;
  --color-positive:         #00C896;
  --color-negative:         #FF4D6A;
}
```

---

## 수정 파일 및 변경 내용

### 1. `resume/js/main.js` (최소 수정)
- `initTheme()`: 항상 다크 고정 (`classList.add('dark')`, localStorage 무관)
- 테마 토글 버튼 숨김 (`display: none`)

### 2. `resume/index.html` (구조 변경)

| 위치 | 현재 | 변경 |
|------|------|------|
| `<html>` | `class=""` | `class="dark"` |
| FOUC 스크립트 | 시스템 테마 감지 로직 | `document.documentElement.classList.add('dark')` 한 줄 |
| `<body>` | `bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100` | `transition-colors duration-300` (색상은 CSS 변수로) |
| 모든 `text-blue-500 dark:text-blue-400` | Tailwind 블루 | `accent-icon` 클래스 또는 인라인 `style="color:var(--color-accent)"` |
| 모든 `bg-slate-50 dark:bg-slate-800/50` | Tailwind 배경 | `section-alt` 클래스 |
| 섹션 제목 | `<h2 class="section-title ...">Skills</h2>` | 2단 구조: `<p class="section-label">SKILLS</p>` + `<h2 class="section-heading">기술 스택</h2>` |

**Hero 섹션 재구성** (2컬럼 → 전체 너비 중앙 정렬):
- 프로필 이미지 Hero에서 제거 (About 섹션 유지)
- 이름 대형 표시 (5xl→7xl)
- 타이핑 애니메이션 그린 컬러
- 통계 Pills 3개: `경력 3년`, `프로젝트 10+`, `기술스택 13개`
- CTA 버튼: `.btn-primary` (그린 채움) + `.btn-secondary` (그린 아웃라인)

**Experience 타임라인**:
- `border-l-2 border-blue-500` → `.timeline-line` 클래스 (CSS에서 처리)
- 날짜 span → `.date-badge` 클래스 (그린 틴트 pill)
- 역할명 → `.role-title` 클래스

**Projects 카드**:
- `<img>` 피크섬 이미지 → `.project-icon-area` 그라디언트 영역 + FontAwesome 아이콘
  - 쇼핑몰: `fa-cart-shopping` + `.gradient-shop`
  - 날씨: `fa-cloud-sun` + `.gradient-weather`
  - 포트폴리오: `fa-code` + `.gradient-portfolio`

**Education/Contact 아이콘 래퍼**:
- `bg-blue-100 dark:bg-blue-900/30` → `.edu-icon-wrap` 클래스 (그린 틴트 배경)

**폼 제출 버튼**: `bg-blue-500 hover:bg-blue-600` → `.btn-primary`

### 3. `resume/css/style.css` (전면 재작성)

**삭제**: `.dark {}` 블록 전체, 모든 하드코딩 블루(`#3b82f6`, `#60a5fa`)

**신규/변경 클래스**:

```css
/* 레이아웃 */
.section-alt { background-color: var(--color-surface); }
.footer-bar { border-top: 1px solid var(--color-border); }

/* 타이포 */
.section-label { font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--color-accent); }
.section-heading { font-size:2rem; font-weight:700; }
.section-heading::after { width:2.5rem; height:2px; background:var(--color-accent); }
.accent-icon { color: var(--color-accent); }
.role-title { color: var(--color-accent); }

/* 버튼 */
.btn-primary { background:var(--color-accent); color:#0A0D12; border-radius:8px; padding:0.75rem 1.75rem; }
.btn-secondary { border:1px solid var(--color-accent); color:var(--color-accent); border-radius:8px; padding:0.75rem 1.75rem; }

/* Hero 통계 */
.stat-pill { background:var(--color-surface); border:1px solid var(--color-border); border-radius:9999px; }
.stat-pill .stat-value { color:var(--color-accent); font-weight:700; }

/* 카드 */
.skill-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; }
.skill-card:hover { border-color:var(--color-accent); background:var(--color-surface-elevated); transform:none; }
.project-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; }
.project-card:hover { border-color:var(--color-accent); box-shadow:none; transform:none; }
.social-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; }
.social-card:hover { border-color:var(--color-accent); background:var(--color-surface-elevated); }

/* 프로젝트 아이콘 영역 */
.project-icon-area { aspect-ratio:16/7; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:2.5rem; }
.gradient-shop    { background: linear-gradient(135deg, #0F2A1E, #1A3D2B); }
.gradient-weather { background: linear-gradient(135deg, #0F1E2A, #1A2B3D); }
.gradient-portfolio { background: linear-gradient(135deg, #1E0F2A, #2B1A3D); }

/* 교육/연락 아이콘 래퍼 */
.edu-icon-wrap { background:var(--color-accent-dim); border:1px solid rgba(0,209,122,0.15); }

/* 프로그레스 바 */
.progress-track { background:var(--color-border); height:4px; }
.progress-bar { background:linear-gradient(90deg, var(--color-accent), var(--color-positive)); }

/* 타임라인 */
.timeline-line { border-left:1px solid var(--color-border); }
.timeline-dot { background:var(--color-accent); box-shadow:0 0 0 1px var(--color-accent); }
.date-badge { background:var(--color-accent-dim); color:var(--color-accent); border:1px solid rgba(0,209,122,0.2); border-radius:9999px; padding:0.2rem 0.7rem; font-size:0.75rem; }

/* 폼 */
.form-input { background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; color:var(--color-text); }
.form-input:focus { border-color:var(--color-accent); box-shadow:0 0 0 3px var(--color-accent-dim); }

/* 배지 */
.badge { background:var(--color-accent-dim); color:var(--color-accent); border:1px solid rgba(0,209,122,0.2); }
.tech-tag { background:transparent; border:1px solid var(--color-border); color:var(--color-text-muted); }
.tech-tag:hover { border-color:var(--color-accent); color:var(--color-accent); }

/* 소셜 */
.social-icon-btn { background:var(--color-surface); border:1px solid var(--color-border); color:var(--color-text-muted); border-radius:8px; }
.social-icon-btn:hover { background:var(--color-accent-dim); border-color:var(--color-accent); color:var(--color-accent); transform:none; }
.visit-link { color: var(--color-accent); }

/* 스크롤바, 선택, 기타 */
::selection { background:var(--color-accent-dim); color:var(--color-accent); }
::-webkit-scrollbar { width:6px; }
::-webkit-scrollbar-thumb { background:var(--color-border); border-radius:3px; }
::-webkit-scrollbar-thumb:hover { background:var(--color-accent); }
#scroll-progress { background:linear-gradient(90deg, var(--color-accent), var(--color-positive)); }
#back-to-top { background:var(--color-accent); color:#0A0D12; border-radius:8px; }
```

---

## 구현 순서

1. `main.js` — `initTheme()` 다크 강제 고정
2. `style.css` — CSS 변수 교체, `.dark {}` 삭제, 모든 컴포넌트 클래스 갱신
3. `index.html` — `<html>`, FOUC 스크립트, `<body>` 수정
4. `index.html` — Navbar 블루 클래스 제거
5. `index.html` — Hero 구조 재편 (stat pills, 중앙 정렬)
6. `index.html` — 섹션 제목 2단 구조 전환
7. `index.html` — Experience 타임라인 (`date-badge`, `role-title`)
8. `index.html` — Projects 이미지 → 아이콘 영역
9. `index.html` — Education/Contact 아이콘 래퍼
10. `index.html` — 나머지 모든 `text-blue-*`, `bg-blue-*`, `dark:*` Tailwind 클래스 제거

---

## 검증

```bash
python3 -m http.server 3000
# 브라우저에서 http://localhost:3000/resume/ 접속
```

확인 항목:
- [ ] 배경이 `#0A0D12` 근접한 짙은 검정으로 렌더링
- [ ] 모든 액센트 색상이 그린 (`#00D17A`)으로 표시
- [ ] 카드 섹션에 1px 경계선 표시
- [ ] Hero 통계 Pills 3개 표시
- [ ] 프로젝트 카드에 그라디언트 아이콘 영역 표시
- [ ] 스킬 프로그레스 바 그린 그라디언트
- [ ] 타임라인 초록 dot과 date-badge 표시
- [ ] 폼 포커스 시 그린 ring 표시
- [ ] 모바일 반응형 유지
- [ ] 스크롤 애니메이션 정상 동작
