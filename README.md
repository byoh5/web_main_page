# Dev Launchpad

개발한 웹 프로그램을 한곳에서 소개하고 진입할 수 있는 정적 메인 페이지입니다.

## 특징

- 모바일/PC 반응형 레이아웃
- 인포링크 스타일의 프로젝트 허브 화면
- `data/projects.json` 기반의 쉬운 항목 추가
- 현재는 백엔드 없이 동작, 이후 API 연동 가능
- GitHub Pages 배포 친화적 구조

## 프로젝트 구조

```text
.
├─ index.html
├─ styles.css
├─ app.js
└─ data/
   └─ projects.json
```

## 프로젝트 추가 방법

`data/projects.json`의 `projects` 배열에 객체를 추가하면 자동으로 화면에 반영됩니다.

```json
{
  "id": "new-project-id",
  "name": "프로젝트 이름",
  "description": "짧은 설명",
  "type": "web",
  "status": "active",
  "stack": ["React", "Firebase"],
  "updatedAt": "2026-02-23",
  "links": {
    "service": "https://example.com",
    "repo": "https://github.com/user/repo",
    "docs": "https://docs.example.com"
  }
}
```

### `type` 예시

- `web`
- `mobile`
- `backend`
- `tool`
- `ai`
- `game`
- `other`

### `status` 예시

- `active` 운영 중
- `planning` 기획 중
- `archived` 보관

## 나중에 API로 전환하기

`app.js`의 `CONFIG`를 아래처럼 변경하면, 정적 JSON 대신 API를 사용하도록 확장할 수 있습니다.

```js
const CONFIG = {
  dataUrl: "./data/projects.json",
  remoteSourceEnabled: true,
  remoteUrl: "https://api.example.com/projects"
};
```

## GitHub Pages 배포

1. 저장소에 파일 푸시
2. GitHub 저장소 설정에서 `Pages` 활성화
3. 배포 소스를 `main` 브랜치 루트(`/`)로 선택
4. 배포 URL 접속 후 확인
