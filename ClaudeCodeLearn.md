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
```

====================================
```
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
