# TWOBYONE Project Hub

실생활에 꼭 필요하지만 구매까지는 망설여지는 작은 프로그램들을
스위스 나이프처럼 꺼내 쓰도록 모아두는 TWOBYONE의 메인 페이지입니다.
직접 제작 도구와 외부 유틸리티 큐레이션을 함께 제공합니다.

## 특징

- 모바일/PC 반응형 레이아웃
- 팀 소개/철학/문의 메일(andreabyfive@gmail.com) 노출
- 직접 제작 + 외부 유틸리티 큐레이션 허브
- 백엔드 없이 동작하는 로컬 중심 구조(직접 제공 도구 기준)
- 개인정보 요청/가입 절차 없이 사용할 수 있는 도구 지향
- 다국어 지원: 한국어, 영어, 일본어, 중국어
- GitHub Pages 배포 친화적 정적 구조

## 프로젝트 구조

```text
.
├─ index.html
├─ styles.css
├─ app.js
└─ data/
   ├─ web_utility_tools_100_plus.json
   └─ projects.json
```

## 프로젝트 추가 방법

기본 데이터 파일은 `data/web_utility_tools_100_plus.json` 입니다.  
`projects` 배열에 객체를 추가하면 자동으로 화면에 반영됩니다.

```json
{
  "id": "new-project-id",
  "name": {
    "ko": "프로젝트 이름",
    "en": "Project Name",
    "ja": "プロジェクト名",
    "zh": "项目名称"
  },
  "description": {
    "ko": "짧은 설명",
    "en": "Short description",
    "ja": "短い説明",
    "zh": "简短说明"
  },
  "type": "web",
  "status": "active",
  "stack": ["React", "PWA"],
  "updatedAt": "2026-02-23",
  "links": {
    "service": "https://example.com",
    "repo": "https://github.com/user/repo",
    "docs": "https://docs.example.com"
  }
}
```

### `type` 값

- `web`
- `mobile`
- `backend`
- `tool`
- `ai`
- `game`
- `other`

### `status` 값

- `active`
- `planning`
- `archived`

## 언어팩 확장

언어팩은 `app.js`의 `I18N` 객체에서 관리됩니다.  
새 언어를 추가하려면:

1. `SUPPORTED_LANGUAGES`에 언어 코드 추가
2. `LANGUAGE_TO_LOCALE`에 날짜 포맷 로케일 추가
3. `I18N`에 동일 키 구조로 번역 추가
4. `index.html`의 언어 선택 옵션 추가

### 언어 강제 지정

URL 쿼리로 초기 언어를 강제할 수 있습니다.

- `?lang=ko`
- `?lang=en`
- `?lang=ja`
- `?lang=zh`

## 나중에 API로 전환하기

`app.js`의 `CONFIG`를 아래처럼 변경하면, 정적 JSON 대신 API를 사용하도록 확장할 수 있습니다.

```js
const CONFIG = {
  dataUrl: "./data/web_utility_tools_100_plus.json",
  remoteSourceEnabled: true,
  remoteUrl: "https://api.example.com/projects"
};
```

## GitHub Pages 배포

1. 저장소에 파일 푸시
2. GitHub 저장소 설정에서 `Pages` 활성화
3. 배포 소스를 `main` 브랜치 루트(`/`)로 선택
4. 배포 URL 접속 후 동작 확인
