# OAG-Backend

뉴스맵 프로젝트 백엔드 서버 — 전 세계 뉴스를 수집하고 한국 영향도 분석 결과를 프론트엔드에 제공합니다.

---

## 프로젝트 개요

전 세계 국제 뉴스 중 대한민국에 영향을 주는 사건을 AI가 분석해 지도 위에 직관적으로 보여주는 **뉴스맵 서비스**의 백엔드입니다.

- 국내외 주요 언론사 RSS 자동 수집
- AI 서버(OAG-AI)로부터 영향도·카테고리 분석 결과 수신
- 프론트엔드(OAG-Frontend)에 REST API 제공
- GPT API를 활용한 기사 클릭 시 3줄 요약 제공

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 언어 | TypeScript |
| 프레임워크 | NestJS |
| DB | SQLite (Phase 0) → PostgreSQL (Phase 1 이후) |
| 환경변수 | dotenv |
| AI 연동 | OpenAI API |

---

## 브랜치 전략

```
main  ← 최종 완성본 (발표용)
dev   ← 개발 통합 브랜치
feat/ ← 기능별 작업 브랜치
fix/  ← 버그 수정 브랜치
```

PR 흐름: `feat/*` → `dev` → `main`

---

## 시작하기

### 사전 요구사항

- Node.js 20 이상
- npm

### 설치

```bash
git clone https://github.com/OAGMAP/OAG-Backend.git
cd OAG-Backend
npm install
```

### 환경변수 설정

루트에 `.env` 파일 생성

```
PORT=8000
OPENAI_API_KEY=여기에_실제_키_입력
```

### 실행

```bash
# 개발 모드 (파일 변경 시 자동 재시작)
npm run start:dev

# 프로덕션
npm run build
npm run start
```

### 확인

```
http://localhost:8000           → 서버 상태 확인
http://localhost:8000/api/news  → 뉴스 목록 API
```

---

## API 명세

### GET /api/news

영향도 2 이상인 뉴스 목록 반환 (지도 표시용)

**Response**

```json
[
  {
    "article_id": 1,
    "title": "미국 기준금리 인상 결정",
    "source": "Reuters",
    "source_language": "en",
    "published_at": "2026-07-15T09:00:00Z",
    "url": "https://reuters.com/...",
    "primary_category": "economy",
    "impact_level": 4,
    "primary_event_country": "US",
    "related_countries": ["CN"],
    "summary": null,
    "analysis_status": "completed"
  }
]
```

| 필드 | 설명 |
|------|------|
| `impact_level` | 한국 영향도 1~4 (1은 지도 미표시) |
| `primary_category` | economy / security / diplomacy / society |
| `summary` | 클릭 전 null, 클릭 후 GPT 3줄 요약 |

---

### GET /api/news/:id/summary

기사 최초 클릭 시 GPT 3줄 요약 반환
이미 요약이 있으면 DB 캐시에서 반환 (GPT 재호출 없음)

**Response**

```json
{
  "article_id": 1,
  "summary": "미국 연준이 기준금리를 0.25%p 인상했습니다..."
}
```

---

## 영향도 기준

| 등급 | 의미 | 지도 표시 |
|------|------|-----------|
| 4 | 국가 경제·외교·안보 전반에 큰 영향 | 🔴 빨강 |
| 3 | 주요 산업 또는 다수 국민에 의미 있는 영향 | 🟠 주황 |
| 2 | 특정 기업·산업에 제한적 영향 | 🟡 노랑 |
| 1 | 실질적 영향 거의 없음 | 미표시 |

---

## 폴더 구조

```
src/
├── news/
│   ├── news.controller.ts  # API 엔드포인트
│   ├── news.service.ts     # 비즈니스 로직
│   ├── news.module.ts      # 모듈 설정
│   └── news.types.ts       # 타입 정의
├── app.module.ts           # 앱 루트 모듈
└── main.ts                 # 서버 시작점
```

---

## 개발 로드맵

| Phase | 기간 | 주요 작업 |
|-------|------|-----------|
| Phase 0 | 7/10~7/20 | 기반 세팅, 더미 API |
| Phase 1 | 7/21~8/10 | RSS 수집, DB 저장, API 완성 |
| Phase 2 | 8/11~8/25 | AI 서버 연동, GPT 요약 |
| Phase 3 | 8/26~9/14 | 실제 데이터 통합 테스트 |
| Phase 4 | 9/15~10/1 | 마무리, 발표 준비 |

---

## 팀

| 이름 | 역할 |
|------|------|
| 이승준 | 백엔드 메인 / 프론트엔드 메인 |
| 손성원 | AI 모델 메인 / AI API 설계 |

---

## 관련 레포

- [OAG-Frontend](https://github.com/OAGMAP/OAG-Frontend) — React 지도 대시보드
- [OAG-AI](https://github.com/OAGMAP/OAG-AI) — DistilBERT 영향도 분류 모델
