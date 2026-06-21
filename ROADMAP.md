# 개발자 웹 이력서 개발 로드맵

## 기술 스택
- **HTML5** — 시맨틱 마크업
- **CSS3** — 커스텀 스타일 및 애니메이션
- **Tailwind CSS** — 유틸리티 기반 스타일링
- **JavaScript (Vanilla)** — 인터랙션 및 동적 기능

---

## 이력서 구성 섹션

| 섹션 | 내용 |
|------|------|
| Hero | 이름, 직함, 한 줄 소개, CTA 버튼 |
| About | 자기소개, 사진, 핵심 역량 |
| Skills | 기술 스택 목록 (아이콘 + 숙련도 바) |
| Experience | 경력 타임라인 |
| Projects | 주요 프로젝트 카드 |
| Education | 학력 사항 |
| Contact | 연락처, 소셜 링크, 문의 폼 |

---

## 개발 단계

### Phase 1 — 프로젝트 초기 설정
- [ ] 프로젝트 폴더 구조 생성
- [ ] Tailwind CSS CDN 또는 CLI 설정
- [ ] `index.html` 기본 템플릿 작성
- [ ] 전역 CSS 변수 및 폰트(Google Fonts) 설정
- [ ] 반응형 브레이크포인트 기준 정의 (mobile / tablet / desktop)

```
resume/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    └── icons/
```

---

### Phase 2 — 레이아웃 및 네비게이션
- [ ] 고정 헤더(Navbar) 구현 — 로고, 섹션 링크, 다크모드 토글
- [ ] 스무스 스크롤 링크 연결
- [ ] 모바일 햄버거 메뉴 구현
- [ ] 스크롤 시 헤더 배경 변경 효과

---

### Phase 3 — Hero 섹션
- [ ] 이름 및 직함 타이핑 애니메이션
- [ ] 한 줄 자기소개 문구
- [ ] "이력서 다운로드" / "연락하기" CTA 버튼
- [ ] 소셜 링크 아이콘 (GitHub, LinkedIn 등)

**샘플 내용**
```
이름: 김진수 (Jin-su Kim)
직함: Frontend Developer
소개: 사용자 경험을 중시하는 프론트엔드 개발자입니다.
```

---

### Phase 4 — About 섹션
- [ ] 프로필 이미지 (원형 + 호버 효과)
- [ ] 자기소개 텍스트 (3~4문장)
- [ ] 핵심 역량 뱃지 (예: 문제해결, 팀워크, 커뮤니케이션)

**샘플 내용**
```
3년 경력의 프론트엔드 개발자로, React와 Vue 기반의 웹 애플리케이션을 
주로 개발해 왔습니다. 클린 코드와 성능 최적화에 관심이 많으며, 
팀과의 협업을 통해 더 나은 결과를 만들어가는 것을 좋아합니다.
```

---

### Phase 5 — Skills 섹션
- [ ] 카테고리별 기술 그룹핑 (Frontend / Backend / Tools)
- [ ] 기술 아이콘 + 이름 표시
- [ ] 숙련도 프로그레스 바 (스크롤 시 애니메이션)

**샘플 기술 목록**
```
Frontend: HTML/CSS, JavaScript, React, TypeScript, Tailwind CSS
Backend:  Node.js, Express, Python
Tools:    Git, GitHub, Figma, VS Code, Docker
```

---

### Phase 6 — Experience 섹션
- [ ] 세로 타임라인 레이아웃
- [ ] 회사명, 기간, 직책, 담당 업무 목록

**샘플 경력**
```
[현재] ABC 테크 | Frontend Developer | 2022.03 ~ 현재
  - React 기반 사내 관리자 대시보드 개발
  - 웹 성능 최적화로 로딩 속도 40% 개선
  - 디자인 시스템 구축 및 컴포넌트 라이브러리 관리

[전직] XYZ 스타트업 | Web Developer | 2020.07 ~ 2022.02
  - 반응형 랜딩 페이지 10+ 개발
  - REST API 연동 및 상태 관리 구현
```

---

### Phase 7 — Projects 섹션
- [ ] 프로젝트 카드 그리드 레이아웃 (2~3열)
- [ ] 썸네일 이미지, 제목, 설명, 사용 기술 태그
- [ ] GitHub / 라이브 데모 링크 버튼
- [ ] 호버 시 오버레이 효과

**샘플 프로젝트**
```
1. 쇼핑몰 웹앱 — React, Node.js, MongoDB
2. 날씨 대시보드 — JavaScript, OpenWeather API
3. 포트폴리오 사이트 — HTML, CSS, JavaScript
```

---

### Phase 8 — Education 섹션
- [ ] 학교명, 전공, 기간, 학위 표시
- [ ] 관련 수료 과정 / 자격증 목록

**샘플 학력**
```
한국대학교 | 컴퓨터공학과 | 2016.03 ~ 2020.02 | 학사
자격증: 정보처리기사, AWS Cloud Practitioner
```

---

### Phase 9 — Contact 섹션
- [ ] 이메일, 전화번호, 위치 정보 표시
- [ ] 소셜 링크 (GitHub, LinkedIn, Blog)
- [ ] 문의 폼 (이름, 이메일, 메시지, 전송 버튼)
- [ ] 폼 유효성 검사 (JavaScript)

---

### Phase 10 — 마무리 및 최적화
- [ ] 다크 모드 구현 (CSS 변수 + JS 토글)
- [ ] 스크롤 진행률 표시바
- [ ] 섹션 진입 시 페이드인 애니메이션 (Intersection Observer)
- [ ] "맨 위로 가기" 버튼
- [ ] 이미지 최적화 및 lazy loading
- [ ] 메타 태그 SEO 설정
- [ ] Open Graph 태그 설정
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 반응형 최종 검수
- [ ] PDF 이력서 다운로드 링크 연결

---

## 파일별 역할 요약

| 파일 | 역할 |
|------|------|
| `index.html` | 전체 이력서 마크업 구조 |
| `css/style.css` | Tailwind 확장 커스텀 스타일, 애니메이션 |
| `js/main.js` | 네비게이션, 타이핑 효과, 스크롤 이벤트, 폼 처리 |

---

## 완료 기준
- 모든 섹션이 모바일(375px) ~ 데스크탑(1440px)에서 깨짐 없이 표시됨
- 다크/라이트 모드 전환 정상 동작
- 문의 폼 유효성 검사 통과
- Lighthouse 성능 점수 90점 이상
