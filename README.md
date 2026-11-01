# G.ANCE · 지앙스 홈페이지

HTML5 / CSS3 / Vanilla JavaScript 기반 정적 홈페이지입니다. 서버·DB·외부 UI 라이브러리·개인정보 수집 폼 없이 동작합니다. 현재 배포 대상은 기존 Netlify 프로젝트입니다. 이번 작업에서는 업로드하지 않았습니다.

## 화면 확인

D:\work\GANCE_Web\index.html을 더블클릭합니다. 수정 후 브라우저를 새로고침하세요.

## 나중에 Netlify에 올리기

현재 검색용 URL은 https://beautiful-dasik-9523c8.netlify.app/ 입니다. 다른 프로젝트에 올릴 경우 먼저 실제 주소로 변경해야 합니다.

```powershell
cd D:\work\GANCE_Web
node scripts/package.mjs
```

원본 검사 → dist 폴더 재생성 → 배포본 검사를 수행합니다. Node.js 외 패키지 설치는 필요하지 않습니다.

- Netlify에서 기존 beautiful-dasik-9523c8 프로젝트를 선택하고 Deploys의 수동 업로드 영역에 dist 폴더를 끌어 놓습니다. 기존 주소의 랜딩페이지가 새 홈페이지로 교체됩니다.
- gance-netlify.zip은 이번에 만든 dist의 압축본입니다. ZIP 사용 시 압축을 풀고 index.html이 바로 들어 있는 폴더를 업로드하세요. 수정 후에는 폴더와 ZIP을 다시 만들어야 합니다.
- 전체 작업 폴더를 올리지 마세요. docs, scripts, archive는 dist에서 제외됩니다.
- GitHub 연동을 선택하면 netlify.toml의 빌드 명령과 dist 게시 경로를 사용합니다. 수동 업로드는 로컬에서 먼저 package 명령을 실행해야 합니다.

주소를 바꿀 때:

```powershell
node scripts/configure.mjs https://새로운주소.netlify.app
node scripts/package.mjs
```

## 구성 및 운영

- index.html: 본문, FAQ, 메타데이터, BeautySalon JSON-LD
- css/style.css: 반응형 디자인 / assets/images/: 제공된 로고·실제 작업 사진
- _headers: Netlify 보안 헤더 / 404.html: 없는 경로의 오류 페이지
- robots.txt, sitemap.xml: 검색 접근 및 사이트맵
- [배포·검색 등록](docs/deployment.md), [GEO 점검](docs/geo-checklist.md), [측정 CSV](docs/geo-measurement.csv)
- [자료 및 상충 정보](docs/design-reference.md), [콘텐츠 확인 목록](docs/content-todo.md)

가격·전화·정책은 자료가 상충하여 확정값을 게시하지 않았습니다. 네이버 예약 링크는 제공된 로컬 랜딩페이지의 item URL에서 과거 날짜 쿼리를 제거한 값입니다. 현재 운영 상태·고객 사진의 게시 동의 범위는 공개 전 확인하세요.

로고·작업 사진·색상·서비스명은 D:\work\GANCE_ 자료를 반영했습니다. 공개 사이트에 직접 접속하지 못해 원격 최신 상태와 로컬 자료가 동일한지는 확인하지 못했습니다. 이전 초안은 archive/에 보관되어 있습니다.

## 검증

node scripts/verify.mjs --production / node scripts/verify.mjs --production --dist는 JSON-LD, canonical·OG·사이트맵 일치, 내부 앵커, 정적 파일, 이미지 설명과 크기, 외부 링크 속성, 404 및 배포 제외 파일을 검사합니다. 브라우저 시각 검사·Lighthouse·실제 Netlify 응답 헤더·검색 색인은 별도 확인이 필요합니다.
