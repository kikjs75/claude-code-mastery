====================================
```
```

====================================
```
```

====================================
```
```

====================================
```
```

====================================
```
```

====================================
```
```

====================================
```
```

====================================
```
<< 설정 파일 - settings.json - Bash 와일드 카드, JSON 스키마 설정 >>
1) Bash 와일드 카드
- Bash: 터미널에서 컴퓨터에게 명령을 내리는 언어
- 참조: https://code.claude.com/docs/ko/permissions
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)",
      "Bash(git * main)",
      "Bash(* --version)",
      "Bash(* --help *)"
    ],
    "deny": [
      "Bash(git push *)"
    ]
  }
}

2) JSON 스키마 설정
- 참조: https://code.claude.com/docs/ko/settings
- JSON 스키마를 지정하면 특정 필드(model)를 입력할 때 가능한 값들을 자동으로 제시해줍니다. JSON 스키마를 지정하면 IDE의 자동완성 기능이 활성화되어 오타를 방지합니다.
```

====================================
```
<< 설정 파일 - settings.json >>
1) 사용자 설정: ~/.claude/settings.json
2) 프로젝트 설정
  - [프로젝트 디렉토리]/.claude/settings.json: 형상관리. 팀과 공유.
  - [프로젝트 디렉토리]/.claude/settings.local.json: 형상관리 X, 개인.
3) 엔터프라이즈 배포의 경우, 엔터프라이즈 관리 정책 설정
  - macOS: /Library/Application Support/ClaudeCode/managed-settings.json
  - Linux 및 WSL: /etc/claude-code/managed-settings.json
  - Windows: C:\ProgramData\ClaudeCode\managed-settings.json

# 우선순위: 엔터프라이즈 관리 정책 설정 > 프로젝트 설정 > 사용자 설정
# 공식문서: https://code.claude.com/docs/ko/settings

# 권한 설정
- defaultMode: claude Code를 열 때 기본 권한 모드입니다. 유효한 값: default, acceptEdits, plan, auto, dontAsk, bypassPermissions | "plan"
- additionalDirectories: Claude가 액세스할 수 있는 추가 작업 디렉토리입니다. 대부분의 .claude/ 구성은 이러한 디렉토리에서 발견되지 않습니다 | [ "../docs/" ]

# 민감한 파일 제외
- API 키, 비밀 및 환경 파일과 같은 민감한 정보가 포함된 파일에서 Claude Code가 액세스하는 것을 방지하려면 .claude/settings.json 파일에서 permissions.deny 설정을 사용합니다:
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)",
      "Read(./build)"
    ]
  }
}
이는 더 이상 사용되지 않는 ignorePatterns 구성을 대체합니다. 이러한 패턴과 일치하는 파일은 파일 검색 및 검색 결과에서 제외되며 이러한 파일에 대한 읽기 작업이 거부됩니다.
```

====================================
```
<< Git >>
- 'git workflow' 키워드로 검색하면 Git 전략을 더 자세히 알 수 있음.
- Claude code 통해서 bug 브랜치를 main 브랜치에 병합
프롬프트: hotfix/결제-오류 브랜치를 main브랜치로 merge 해주세요!
- Claude code 통해서 develop 브랜치를 main 브랜치에 병합
프롬프트: develop 브랜치를 main으로 병합해주세요!

- 프롬프트: claude code를 활용한 git 브랜치 워크플로우를 가이드해주세요!

====================================
<< Git 브랜치 워크플로우 가이드 >>

[ 1. 기본 개념 ]

Git Flow 전략:
  - main: 프로덕션 배포 가능한 안정 버전
  - develop: 개발 중인 버전
  - feature/*: 새로운 기능 개발 (develop에서 분기)
  - hotfix/*: 긴급 버그 수정 (main에서 분기)
  - release/*: 배포 준비 (develop에서 분기)

[ 2. 워크플로우 단계별 프롬프트 ]

1️⃣ 새로운 기능 개발 시작
  프롬프트: "feature/로그인-기능 브랜치 생성하고 체크아웃해줘"
  Claude Code 실행:
    $ git checkout -b feature/로그인-기능
    $ git branch -a  (생성 확인)

2️⃣ 기능 개발 완료 후 커밋
  프롬프트: "로그인 폼 HTML, CSS, JavaScript 작성 완료. 커밋해줘"
  Claude Code가 수행:
    - 변경사항 확인 (git status, git diff)
    - 파일 스테이징 (git add)
    - 커밋 메시지 생성 및 커밋

3️⃣ develop 브랜치에 기능 병합
  프롬프트: "feature/로그인-기능 브랜치를 develop에 병합해줘"
  Claude Code 실행:
    $ git checkout develop
    $ git merge feature/로그인-기능

4️⃣ 완료된 feature 브랜치 삭제
  프롬프트: "feature/로그인-기능 브랜치 삭제해줘"
  Claude Code 실행:
    $ git branch -d feature/로그인-기능

5️⃣ hotfix 긴급 패치
  프롬프트: "hotfix/결제-오류 브랜치 생성하고, 버그를 수정해줘"
  Claude Code가 수행:
    - hotfix 브랜치 생성
    - 버그 수정 코드 작성
    - 테스트 및 커밋

6️⃣ hotfix를 main과 develop에 병합
  프롬프트: "hotfix/결제-오류 브랜치를 main으로 merge하고, develop에도 merge해줘"
  Claude Code 실행:
    $ git checkout main
    $ git merge hotfix/결제-오류
    $ git checkout develop
    $ git merge hotfix/결제-오류

[ 3. 병합 전 확인 사항 ]

병합 전 체크리스트:
  ✅ 현재 브랜치 확인: git status
  ✅ 변경사항 저장: 모든 파일 커밋 완료
  ✅ 병합할 브랜치 확인: git branch -a
  ✅ 대상 브랜치 최신화: git pull origin develop (또는 main)
  ✅ 충돌 가능성 미리 체크

프롬프트 예시:
  "develop 브랜치 최신 상태 확인하고, feature/새로운-기능을 develop에 병합해줘"

[ 4. 병합 충돌 해결 ]

충돌 발생 시:
  프롬프트: "develop 브랜치로 병합할 때 충돌이 발생했어. 해결해줘"
  
Claude Code가 수행:
  1. 충돌 파일 표시 (<<<<<<, ======, >>>>>>)
  2. 충돌 부분 수정
  3. 병합 완료: git add . && git commit -m "병합 충돌 해결"

[ 5. Pull Request (PR) 생성 및 병합 ]

📌 PR이란?
  - Pull Request는 GitHub, GitLab, Bitbucket 같은 플랫폼에서 제공하는 협업 기능
  - Git 자체에는 없고, "코드 리뷰 후 병합"을 가능하게 하는 웹 기반 도구
  - 개인 프로젝트: 로컬 merge만 가능
  - 팀 협업: PR로 리뷰, 토론, 자동 테스트 후 병합

5-1. PR과 로컬 Merge의 차이

로컬 Merge (자동 병합):
  $ git merge feature/로그인
  ❌ 리뷰 불가, 토론 불가, 기록 남지 않음
  
GitHub PR (검토 병합):
  1. PR 생성 → GitHub 웹사이트에서 요청
  2. 코드 리뷰 → 팀원이 검토 및 피드백
  3. 수정 → 피드백 반영해서 커밋
  4. 승인 후 병합 → 최종 병합 실행
  ✅ 리뷰 O, 토론 O, 기록 O, 자동 테스트 O

5-2. 실전 PR 워크플로우 (단계별)

Step 1️⃣: 로컬에서 기능 개발
  프롬프트: "feature/로그인-기능 브랜치 생성해줘"
  $ git checkout -b feature/로그인-기능
  
  [개발자가 코드 작성...]
  
  프롬프트: "로그인 폼 완성했어. 커밋해줘"
  $ git add .
  $ git commit -m "feat: 로그인 폼 추가"

Step 2️⃣: 원격에 푸시 (GitHub에 업로드)
  프롬프트: "feature/로그인-기능 브랜치를 원격에 푸시해줘"
  $ git push -u origin feature/로그인-기능
  
  ✅ GitHub에 feature/로그인-기능 브랜치 생성됨

Step 3️⃣: GitHub에서 PR 생성
  프롬프트: "feature/로그인-기능을 main으로 PR 생성해줘"
  
  Claude Code 실행:
    $ gh pr create --title "로그인 기능 추가" \
                   --body "사용자 인증 폼을 구현했습니다"
  
  GitHub 웹사이트 화면:
  ┌──────────────────────────────────┐
  │ Pull Request #42                 │
  ├──────────────────────────────────┤
  │ feature/로그인-기능 → main       │
  │                                  │
  │ 제목: 로그인 기능 추가            │
  │ 설명: 사용자 인증 폼을 구현...   │
  │                                  │
  │ 📋 변경된 파일:                 │
  │   ├ index.html (+50 -10)        │
  │   ├ css/style.css (+20 -5)      │
  │   └ js/auth.js (+100 -0)        │
  │                                  │
  │ 👤 Reviewer 필요                 │
  │ 🔴 리뷰 대기 중...              │
  └──────────────────────────────────┘

Step 4️⃣: 팀원의 코드 리뷰 (GitHub에서)
  
  Team Lead가 PR을 열어서:
  
  js/auth.js 라인 45:
    💬 "비밀번호를 평문으로 전송하나요? 
        HTTPS인지 확인 필요합니다"
  
  개발자의 답변:
    ✅ "네, HTTPS로 안전하게 전송합니다"
  
  다른 코멘트:
    💬 "변수명이 좀 더 명확했으면..."
    
  개발자가 수정:
    프롬프트: "변수명 수정해줄게. 다시 커밋해줘"
    $ git add .
    $ git commit -m "refactor: 변수명 명확하게 수정"
    $ git push origin feature/로그인-기능
    → PR이 자동으로 업데이트됨

Step 5️⃣: 리뷰 완료 및 승인
  
  Team Lead:
    ✔️ "코드 좋습니다. 승인합니다!"
    [Approve 버튼 클릭]
  
  프롬프트: "PR #42 승인되었으니 main에 병합해줘"
  Claude Code 실행:
    $ gh pr merge 42 --merge
  
  ✅ PR이 닫혀지고 main 브랜치에 병합됨

Step 6️⃣: 로컬 정리
  
  프롬프트: "develop 최신화하고, feature/로그인-기능 브랜치 삭제해줘"
  $ git checkout main
  $ git pull origin main
  $ git branch -d feature/로그인-기능
  
  ✅ 작업 완료!

5-3. Claude Code로 PR 관리하기

PR 생성:
  프롬프트: "feature/결제 브랜치를 원격에 푸시하고 
            develop으로의 PR을 생성해줘. 
            제목: '결제 기능 추가', 설명: '신용카드, 계좌이체 지원'"
  
  $ git push -u origin feature/결제
  $ gh pr create --title "결제 기능 추가" \
                 --body "신용카드, 계좌이체 지원"

PR 상태 확인:
  프롬프트: "PR #50의 현재 상태를 보여줘"
  $ gh pr view 50
  
  출력:
    - PR 번호, 제목, 설명
    - 리뷰 상태 (대기/승인/변경 요청)
    - CI/CD 테스트 결과
    - 코멘트 개수

PR 리뷰 코멘트 확인:
  프롬프트: "PR #50에서 팀원들의 코멘트를 보여줘"
  $ gh pr view 50 --comments

PR 승인:
  프롬프트: "PR #50을 코드 리뷰 후 승인해줘"
  $ gh pr review 50 --approve

PR 병합:
  프롬프트: "PR #50을 main에 병합해줘"
  $ gh pr merge 50
  
  또는 특정 병합 전략:
  $ gh pr merge 50 --merge      # 일반 merge
  $ gh pr merge 50 --squash     # squash merge
  $ gh pr merge 50 --rebase     # rebase merge

PR 닫기 (병합 안 함):
  프롬프트: "PR #50을 병합하지 말고 닫아줘"
  $ gh pr close 50

5-4. 병합 전략 (merge strategy)

1. Merge (일반 병합):
  $ git merge feature/로그인
  
  커밋 기록:
  ──────────────────────────
  main    ●─────○ Merge branch 'feature/로그인'
          ╱     ╱
  feature ●─●─●
  ──────────────────────────
  
  장점: ✅ 전체 개발 과정을 볼 수 있음
  단점: ❌ 커밋 기록이 많아짐

2. Squash (압축 병합):
  $ git merge --squash feature/로그인
  
  커밋 기록:
  ──────────────────────────
  main    ●─● (모든 커밋을 1개로 압축)
          ╱
  feature ●─●─●
  ──────────────────────────
  
  장점: ✅ 깔끔한 커밋 기록
  단점: ❌ 개발 과정 정보 손실

3. Rebase (재기반 설정):
  $ git merge --rebase feature/로그인
  
  커밋 기록:
  ──────────────────────────
  main    ●─●─●─● (feature 커밋이 main 위에 순서대로)
             ╱
  feature ●─●─●
  ──────────────────────────
  
  장점: ✅ 선형적이고 깔끔한 기록
  단점: ❌ 보안에 민감함 (공개 브랜치는 금지)

5-5. 실전 PR 체크리스트

PR 생성 전:
  ✅ 브랜치명 명확한가? (feature/기능명)
  ✅ 모든 변경사항 커밋했는가?
  ✅ 로컬 테스트 통과했는가?
  ✅ 불필요한 파일 추가 안 했는가? (.env, node_modules 등)

PR 생성 시:
  ✅ 제목이 명확한가? (30자 이내)
  ✅ 설명에 변경 내용을 기술했는가?
  ✅ 관련 Issue 번호 링크했는가? (#123)
  ✅ 스크린샷/동영상 첨부했는가? (UI 변경 시)

PR 리뷰 중:
  ✅ 모든 코멘트 해결했는가?
  ✅ 필요한 수정 반영했는가?
  ✅ 충돌 없는가?
  ✅ CI/CD 테스트 통과했는가?

PR 병합 전:
  ✅ 최소 1명 이상 승인했는가?
  ✅ 리뷰 대기 중인 항목 없는가?
  ✅ develop 최신 상태인가?
  ✅ 병합 후 배포 필요한가?

5-6. PR 예제 (한국어 템플릿)

프롬프트:
  "다음 정보로 PR을 생성해줘:
   - 브랜치: feature/장바구니
   - 대상: develop
   - 제목: 장바구니 기능 추가
   - 설명:
     ## 변경사항
     - 장바구니 추가/삭제 기능
     - 상품 수량 조절 기능
     
     ## 테스트 방법
     1. 상품 페이지에서 장바구니 추가 버튼 클릭
     2. 장바구니 페이지 이동
     3. 수량 조절 및 삭제 테스트
     
     ## 스크린샷
     [추가 예정]
     
     Fixes #15"

결과:
  GitHub PR 페이지:
  ┌─────────────────────────────────┐
  │ PR #123                         │
  ├─────────────────────────────────┤
  │ feature/장바구니 → develop      │
  │                                 │
  │ ## 변경사항                     │
  │ - 장바구니 추가/삭제 기능      │
  │ - 상품 수량 조절 기능           │
  │                                 │
  │ ## 테스트 방법                  │
  │ 1. 상품 페이지에서 추가 클릭   │
  │ 2. 장바구니 페이지 이동        │
  │ 3. 수량 조절 및 삭제 테스트    │
  │                                 │
  │ 🔗 Fixes #15                    │
  │                                 │
  │ [요청된 변경 대기 중...]       │
  └─────────────────────────────────┘

[ 6. 브랜치 상태 조회 ]

현재 상태 확인:
  프롬프트: "현재 git 상태와 모든 브랜치 목록을 보여줘"
  Claude Code 실행:
    $ git status
    $ git branch -a
    $ git log --oneline -5

[ 7. 워크플로우 자동화 팁 ]

✨ 효율적인 프롬프트 작성:
  - 명확한 목표: "develop을 main에 병합"
  - 구체적인 브랜치: "feature/결제" (O) vs "브랜치 병합" (X)
  - 이전/이후 작업 포함: "병합 후 PR 생성하고, 로컬 브랜치 삭제"
  - 검증 포함: "병합 후 최종 상태 확인"

통합 프롬프트 예시:
  "다음을 순서대로 해줘:
   1. develop 브랜치 최신화
   2. feature/새로운-기능을 develop에 병합
   3. 병합 결과 확인
   4. 원격에 푸시
   5. feature/새로운-기능 로컬 브랜치 삭제"

[ 8. 커밋 메시지 컨벤션 (Claude Code 활용) ]

좋은 커밋 메시지 작성:
  프롬프트: "변경사항을 커밋하는데, 메시지는 관례에 맞게 작성해줘"
  
패턴:
  - feat: 새로운 기능 (feat: 로그인 폼 추가)
  - fix: 버그 수정 (fix: 버튼 클릭 오류 수정)
  - docs: 문서화 (docs: README 업데이트)
  - style: 코드 스타일 (style: 들여쓰기 수정)
  - refactor: 리팩토링 (refactor: 함수명 변경)
  - test: 테스트 추가 (test: 로그인 테스트 작성)

[ 9. 실전 예제 ]

시나리오 1: 새 기능 개발 완료까지의 전체 흐름
  1. "feature/장바구니 브랜치 생성해줘"
  2. [로컬에서 기능 개발]
  3. "장바구니 기능 작성 완료. 커밋해줘"
  4. "feature/장바구니를 develop에 병합하고, 원격에 푸시해줘"
  5. "feature/장바구니 로컬 브랜치 삭제"

시나리오 2: hotfix → main + develop 병합
  1. "hotfix/보안-패치 브랜치 생성해줘"
  2. [보안 패치 코드 작성]
  3. "보안 패치 커밋해줘"
  4. "hotfix/보안-패치를 main과 develop에 모두 병합해줘"

[ 10. 주의사항 ]

❌ 피해야 할 패턴:
  - main 브랜치에서 직접 개발 (항상 feature 브랜치 사용)
  - 커밋하지 않고 브랜치 전환 (git status로 항상 확인)
  - 병합 전 pull 하지 않기 (충돌 방지)
  - 불명확한 커밋 메시지 ("수정됨" vs "로그인 폼 유효성 검사 개선")

✅ 안전한 패턴:
  - 각 작업별 별도 브랜치 생성
  - 한 브랜치 = 한 기능/버그
  - 병합 전 항상 최신 상태 확인
  - 커밋 메시지는 구체적으로

```

====================================
```
<< output-style >>
  This changes how Claude Code communicates with you

  ❯ 1. Default(기본값) ✔    Claude completes coding tasks efficiently and provides concise responses 
      => "일단 결과를 빨리 만들어 줘."
      => Claude가 코딩 작업을 효율적으로 완료하고 간결하게 응답합니다.
    2. Proactive(적극적)    Claude executes immediately, minimizes interruptions, and prefers action over planning 
      => "묻지 말고 알아서 진행해 줘."
      => Claude가 즉시 실행하며,
        불필요한 중단을 최소화하고,
        계획을 설명하기보다 행동(실행)을 우선합니다.
    3. Explanatory(설명형)  Claude explains its implementation choices and codebase patterns
      => "왜 이렇게 구현했는지 자세히 설명해 줘."
      => Claude가 구현을 선택한 이유와
        코드베이스의 패턴 및 구조를 자세히 설명합니다.
    4. Learning(학습형)     Claude pauses and asks you to write small pieces of code for hands-on practice
      => "정답을 바로 주지 말고 내가 배우면서 하게 해 줘."
      => Claude가 중간중간 멈춰서
        사용자가 직접 작은 코드 조각을 작성하도록 요청하며,
        실습 중심으로 학습할 수 있게 도와줍니다.
  Enter to confirm · Esc to cancel

( 실습 )
- 실제로 실습해보니 바로 적용이 안 되는 경우 있는 것 같다. 
그래서 
  프롬프트에 명시적으로 적용하거나(Learning 스타일로, 단계별 설명하면서 계산기 HTML 만들어줘)
  CLAUDE.md  에 스타일 지침 넣어두라고 한다. 또한
  settings.json 에 명시
    {
      "outputStyle": "explanatory",
    }

( 사용자 정의 출력 형식 만들기 )
- 사용자 수준(~/.claude/output-styles) 또는 프로젝트 수준(.claude/output-styles) 에 저장.
- 지정된 위치에 md 파일 넣는다. (예시:beginner.md)
beginner.md
---
name: Beginner Friendly Style
description: 초보자를 위한 자세한 설명 스타일
keep-coding-instructions: true
---

# Beginner Friendly Style

당신은 프로그래밍을 배우는 초보자를 돕는 친절한 선생님입니다.

## 주요 행동 방식

- 코드를 한 줄씩 자세히 설명하고, 왜 이렇게 하는지 이유를 함께 알려주세요.
- 예제 코드에는 한글 주석을 추웁ㄴ히 달아주세요.
- 어려운 프로그래밍 용어는 쉽게 풀어서 설명하세요.
- 비유를 많이 사용하여 이해하기 쉽게 설명하세요.
- HTML 구조를 먼저 설명한 후 JavaScript 로직을 설명하세요.

```

====================================
```
< statusline >
- /statusline : statusline 설치 진행. 서브에이전트로 진행되며 실패할 수도 있음. 그러면 다시 재시도.
- claude code 종료 후 재시작하고 다음 명령어 실행. => /statusline 모델명, 켄텍스트 사용량, 비용 을 표시해줘!
- statusline-command.sh
  ctx_size=$(echo "$input" | jq -r '.context_window.context_window_size // 0')
  - jq: 터미널에서 JSON Data 다루는 명령어. jq --version

```

====================================
```
<< 토큰 줄이는 방법 >>
1. 범위를 제한해서 프롬프트 작성
- 핵심 키워드
  - 간단한
  - 단일 파일로
  - ~줄 이하
  - 배포/테스트/빌드 제외

2. HAIKU 모델 적극 활용
- HAIKU: 학습 / 간단한 실습
- Sonnet / Opus: 복잡한 프로젝ㅌ, 실전 개발

3. 컨텍스트 관리
- 새로운 작업할 때는: /clear
- 컨텍스트가 거의 찼는데 작업을 이어가고 싶다면: /compact

4. 켄텍스트 차지하는 요소 줄이기
- 서브에이전트, MCP, CLAUDE.md 모두 컨텍스트를 차지합니다.
- 정말 필요한 것만 엄선, 안 쓰는 건 과감히 제거.

(토큰 효율화 핵심 3가지)
1) 명확한 프롬프트로 범위 제한
2) 작업에 맞는 적절한 모델 선택
3) 컨텍스트를 깔끔하게 정리

- AI 네이티브 개발자가 되려면 결국 컨텍스트 싸움입니다. 이 원칙들은 Claude 뿐만 아니라 모든 AI 모델에 동일하게 적용됩니다.
```

====================================
```
<< 컨텍스트 윈도우 >>
- 컨텍스트 윈도우: 한 번에 처리할 수 있는 최대 토큰 사용량
- 최대 200K(20만) 토큰. 책 1권 분량. 입력 + 출력을 합쳐서 최대 200K 까지 쓸 수 있다는 뜻.
- 컨텍스트 윈도우는 기존이 모든 대화 내용을 입력으로 보내고 답변이 출력이 된다. 이것은 순환하기에 시간이 지날 수록 입력 토큰의 크기는 아주 커진다.
- 새로운 작업할 때는: /clear
- 컨텍스트가 거의 찼는데 작업을 이어가고 싶다면: /compact
- 서브에이전트, MCP 등 확장 기능도 컨텍스트 윈도우를 차지합니다. 그래서 너무 많이 설치하면 Claude 가 바보될 확률 높아진다.
- 사용량 확인 방법: /usage
  - Current session: 5시간 단위로 리셋.
  - Current week(all models): 5시간 단위로 리셋. 모든 모델 대상.
  - Current week(Sonnet only): 5시간 단위로 리셋. Sonnet 모델만 대상.
  - Extra usage: 
```

====================================
```
❯ /context 
  ⎿  Context Usage
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛀ ⛀   Haiku 4.5
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁   claude-haiku-4-5-20251001
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁   97k/200k tokens (48%)
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ 
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛀   Estimated usage by category
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ System prompt: 6.5k tokens (3.3%) => Claude 자체 규칙: 한국어로 답변, 위험한 요청 거부, 도구 사용 규칙, 답변 형식 규칙
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ System tools: 9.5k tokens (4.8%) => 도구 설명서: Read 사용법, Edit 사용법, Bash 사용법, WebSearch 사용법
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ Memory files: 1.1k tokens (0.5%) => CLAUDE.md 같은 프로젝트 메모: Java 21 사용, Gradle 사용, Spring Boot 3 사용
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ Skills: 1.1k tokens (0.5%) => Claude Code 내장 스킬
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ Messages: 79.2k tokens (39.6%) => 사용자와 지금까지 나눈 대화
                           ⛶ Free space: 102.6k (51.3%)

     MCP tools · /mcp (loaded on-demand)

     Available
     ├ mcp__claude_ai_Gmail__create_draft
     ├ mcp__claude_ai_Gmail__create_label
     ├ mcp__claude_ai_Gmail__delete_label
     ├ mcp__claude_ai_Gmail__get_thread
     ├ mcp__claude_ai_Gmail__label_message
     ├ mcp__claude_ai_Gmail__label_thread
     ├ mcp__claude_ai_Gmail__list_drafts
     ├ mcp__claude_ai_Gmail__list_labels
     ├ mcp__claude_ai_Gmail__search_threads
     ├ mcp__claude_ai_Gmail__unlabel_message
     ├ mcp__claude_ai_Gmail__unlabel_thread
     ├ mcp__claude_ai_Gmail__update_label
     ├ mcp__claude_ai_Google_Calendar__create_event
     ├ mcp__claude_ai_Google_Calendar__delete_event
     ├ mcp__claude_ai_Google_Calendar__get_event
     ├ mcp__claude_ai_Google_Calendar__list_calendars
     ├ mcp__claude_ai_Google_Calendar__list_events
     ├ mcp__claude_ai_Google_Calendar__respond_to_event
     ├ mcp__claude_ai_Google_Calendar__suggest_time
     ├ mcp__claude_ai_Google_Calendar__update_event
     ├ mcp__claude_ai_Google_Drive__authenticate
     ├ mcp__claude_ai_Google_Drive__complete_authentication
     ├ mcp__claude_ai_Notion__notion-create-comment
     ├ mcp__claude_ai_Notion__notion-create-database
     ├ mcp__claude_ai_Notion__notion-create-pages
     ├ mcp__claude_ai_Notion__notion-create-view
     ├ mcp__claude_ai_Notion__notion-duplicate-page
     ├ mcp__claude_ai_Notion__notion-fetch
     ├ mcp__claude_ai_Notion__notion-get-comments
     ├ mcp__claude_ai_Notion__notion-get-teams
     ├ mcp__claude_ai_Notion__notion-get-users
     ├ mcp__claude_ai_Notion__notion-move-pages
     ├ mcp__claude_ai_Notion__notion-query-data-sources
     ├ mcp__claude_ai_Notion__notion-query-database-view
     ├ mcp__claude_ai_Notion__notion-query-meeting-notes
     ├ mcp__claude_ai_Notion__notion-search
     ├ mcp__claude_ai_Notion__notion-update-data-source
     ├ mcp__claude_ai_Notion__notion-update-page
     ├ mcp__claude_ai_Notion__notion-update-view
     ├ mcp__ide__executeCode
     └ mcp__ide__getDiagnostics

     Memory files(Claude가 항상 참고하는 메모리 파일들) · /memory(메모리 파일이 저장된 위치)
     └ CLAUDE.md: 1.1k tokens

     Skills · /skills

     Built-in
     ├ claude-api(claude-api 관련 작업): ~270 tokens
     ├ update-config(설정 파일 수정): ~180 tokens
     ├ code-review(코드 리뷰): ~100 tokens
     ├ schedule(작업 계획 수립): ~90 tokens
     ├ run(명령 실행): ~90 tokens
     ├ loop(반복 작업): ~90 tokens
     ├ verify(결과 검증): ~60 tokens
     ├ keybindings-help(단축키 도움말): ~60 tokens
     ├ fewer-permission-prompts(권한 요청 최소화)): ~50 tokens
     ├ simplify(코드 설명 단순화): ~50 tokens
     ├ security-review(보안 검토): ~20 tokens
     ├ init(초기화): < 20 tokens
     └ review(간단 검토): < 20 tokens

      Suggestions
      ℹ Read results using 89.8k tokens (45%) → save ~26.9k
        Use offset and limit parameters to read only the sections you need. Avoid re-reading entire files when you only need a few lines.
        => 결과를 읽는 데 89.8k 토큰(45%)을 사용했습니다 → 약 26.9k 토큰을 절약할 수 있습니다. 필요한 몇 줄만 읽을 때는 전체 파일을 다시 읽지 말고, offset(시작 위치)과 limit(읽을 개수) 매개변수를 사용하세요.
        => 쉽게 말하면:
          현재 파일을 읽으면서 89,800 토큰을 사용했음
          읽는 범위를 줄이면 약 26,900 토큰을 절약할 수 있음
          파일 전체를 읽지 말고
          offset = 어디부터 읽을지
          limit = 몇 줄만 읽을지
          를 지정해서 필요한 부분만 읽으라는 뜻
        => 예를 들어,
          read file.txt
            처럼 전체를 읽는 대신,
          read file.txt --offset 100 --limit 20
            처럼 100번째 줄부터 20줄만 읽으라는 의미입니다.
```

====================================
```
<< 토큰 효과적으로 사용하기 >>

1. 프롬포트 토큰 절약하기
1.1. 토큰 많이 사용하는 프롬프트: Claude 가 과도하게 생성할 수 있다.
프로필 웹사이트 만들어줘.

1.2. 토큰을 절약하는 프롬프트: 꼭 필요한 기능만 생성하므로 토큰을 크게 절약할 수 있다.
간단한 프로필 웹사이트를 만들어줘:
- 단일 HTML 파일로만 작성
- 이름, 소개, SNS 링크만 포함
- 외부 라이브러리 사용하지 말고 순수 HTML/CSS만 사용
- 배포, 테스트, 최적화 단계는 제외
- 총 300줄 이하로 작성

2. Haiku 모델 활요하기
- 강의 학습 단계에서는 /model 로 Haiku 모델 전환 적극 추천
- 사용 방법: /model haiku
- 복잡한 프로젝트나 높은 품질이 필요할 때만 Sonnet 활용, 학습과 실습에는 Haiku 를 사용하는 전략 적극 추천.

3. 컨텍스트 관리 명령어로 토큰 최적화 하기
- 토큰 관리의 핵심은 '컨텍스트 관리'입니다.
- 필수 명령어 3가지
1) /context: 현재 컨텍스트에 포함된 파일 확인. 80% 이상 쌓이면 /clear 로 정리해서 Messages 정리 필요.
2) /clear: 불필요한 컨텍스트 제거. 하나의 작업이 끝나면 사용. (예시: 로그인 기능 개발과 디버깅 후 결제 개발 시에 로그인 기능 컨텍스트 불필요. 토큰만 많이 소비. 그래서 /clear 명령어 실행.)
3) /compact: 컨텍스트 압축으로 토큰 절약. 80% 이상이지만 컨텍스트 유지하고 싶으면 압축해서 토큰 절약. /config 통해서 Auto-Compact is true 해주면 알아서 해준다.
- 토큰 최적화 완벽 가이드: https://youtu.be/VbD8ITrJ6lg?si=zc432UsYCW3gNFYz => 실제 사용 예시와 함께 /context, /clear, /compact 명령어 어떻게 활용할 지 상세히 설명.
```

====================================
```
<< 사고 토큰 설정 바꾸는 방법 >>

~/.claude/settings.json

# 사고 토큰을 최대(63,999)로 늘리고 싶은 경우
{
	"env": {
		'MAX_THINKING_TOKENS': "63999"
	}
}

# 사고 토큰을 줄이고 싶은 경우(예: 10,000)
{
	"env": {
		'MAX_THINKING_TOKENS': "10000"
	}
}

# 확장 사고를 완전히 끄고 싶은 경우
{
	"env": {
		'MAX_THINKING_TOKENS': "0"
	}
}

# settings.json 에 다른 설정 있다면 기존 내용으 그대로 두고 "env" 부분만 추가
{
	"permissions": {
		"allow": ["Read", "Write"]
	},
	"env": {
		'MAX_THINKING_TOKENS': "0"
	}
}
```

====================================
```
# 더 깊은 사고
: 프롬프트에 think(4,000 tokens) < think hard < think harder < megathink(10,000 tokens) < ultrathink(maximum bugdget)

---

전체적인 디자인을 모던하고 세련된 디자인으로 해주세요
- 다크모드
- 전체적인 레이아웃 및 간격 일관성
- 모던하고 세련된 스타일
- 이미지참고 : [Image #2]
ultrathink

이미지 파일 첨부하거나 경로 알려주면 원하는 결과 얻을 수 있다.
https://dribbble.com/ 사이트(드리블)에 가면 벤치마킹 할 세련된 이미지 많음. 'deveoper portfolio' 검색
```

====================================
```
# Cmd + T(extended thinking) 설정 단축키 안 되는 경우
Cmd + , > VS Code Settings >  VSCode 설정 > 검색(meta) > Terminal > "Integrated: Mac Option is Meta"을 설정

---

UI를 개선해줘!
ultrathink => 이걸로 extended thinking 활성화 되었다.

extended thinking(확장 사고)는 질문하면 바로 답변안하고 좀 더 깊게 생각한다. 그만큼 토큰 많이 사용한다.
---

/config

Thinking mode		true => 그런데 상황에 따라 해제 필요. false 바꾸면 extended thinking 해제

---

{
  "permissions": {
    "allow": [
      "Bash"
    ]
  },
  "plansDirectory": ".claude/plans" # 파일로 저장되는 계획 파일 저장 위치 지정.
}

---

plan open
```

====================================
```
@ROADMAP.md 파일을 참고해서 개발해줘.

---

index.html 에 SNS 링크를 포함하는 색션을 추가해줘.
- github, youtube, instagram, etc

---

[Image #1]
수정사항:
- 웹의 전체적인 컨테이너 폭을 줄여주세요.

---

[Image #1]
수정사항:
- 웹의 전체적인 컨테이너 폭을 줄여주세요.
- 안 보이는 이미지는 웹에서 샘플이미지를 사용해서 보이도록 해줘!
====================================
claude --dangerously-skip-permissions: Claude Code의 권한 확인을 완전히 건너뛰는 플래그예요.
====================================
개발자 웹 이력서를 개발할 수 있도록 ROADMAP.md 파일을 작성해 주세요.
esc => 작업 취소
/terminal-setup

---
개발자 웹 이력서를 개발할 수 있도록 ROADMAP.md 파일을 작성해 주세요.\
\
기술스택: \
- html, css, javascript, tailwindcss\
이력서 내용:\
- 일반적인 내용으로 간단히 작성해줘.

내가 진행중에 창을 닫았다면 
	터미널 모드에서 claude --continue 하면 이어서 작업 가능.
	플로그인 모드에서 /resume 이전 내용 확인 가능.

	그리고 위 화살표 방향키 눌러서 기존에 입력한 프롬프트 다시 입력.

---
전체내용 보려면 Ctrl+R	

---
/init 프로젝트 초기화를 한국어로 진행해주세요.

다음 설정을 CLAUDE.md 에 포함해주세요.

## 언어 및 커뮤니케이션 규칙
- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어(코드 표준 준수)
```

====================================
```
CLAUDE.md: 프로젝트 규칙 미리 전달
Skills: 필요할 때만 전문 지식 활성화
MCP: 토큰 46.9% 절감
Hooks: 상황별 맥락 자동 주입
Sub-agents: 요약한 결과만 반환 -> 메인 대화 깔끔 유지
```

====================================
```
컨텍스트 엔지니어링
```

====================================
```
Claude Code, Codex CLI, Gemini Cli
```
