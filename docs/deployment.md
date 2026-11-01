# Netlify 배포 및 검색 등록

현재 기존 사이트 주소: https://beautiful-dasik-9523c8.netlify.app/
실제 배포는 아직 수행하지 않았습니다.

## 수동 업로드

1. 작업 폴더에서 node scripts/package.mjs 명령을 실행해 dist를 생성합니다.
2. Netlify에 기존 사이트 관리 계정으로 로그인하고 beautiful-dasik-9523c8 프로젝트를 선택합니다. 새 프로젝트를 만들면 다른 주소가 생깁니다.
3. Deploys 화면의 수동 업로드 영역에 dist 폴더를 끌어 놓습니다. 폴더 바로 아래 index.html과 _headers가 있어야 합니다. gance-netlify.zip 사용 시 압축을 먼저 풉니다.
4. 게시 완료 후 기존 공개 주소를 새로고침합니다. 이때 기존 랜딩페이지가 새 홈페이지로 바뀝니다.
5. 수정할 때마다 package 명령을 다시 실행하고 dist를 다시 올립니다.

## GitHub 자동 배포 (선택)

소스를 원하는 GitHub 저장소에 반영하고 Netlify 프로젝트에 저장소·운영 브랜치를 연결합니다. netlify.toml에 Node 22, 빌드 명령 node scripts/package.mjs, 게시 경로 dist가 설정되어 있습니다. 기존 대시보드 설정과 충돌하지 않는지 빌드 로그를 확인합니다.

수동 업로드는 빌드 명령을 실행하지 않으므로 로컬 dist를 먼저 만들어야 합니다. Git 연동은 빌드 성공 후 게시됩니다. 현재 방식은 프로젝트 설정에서 확인하세요.

## 주소·검색·보안

- 다른 주소로 옮기면 node scripts/configure.mjs https://실제주소 실행 후 package 명령을 실행합니다.
- netlify.app 주소는 DNS 소유권이 없으므로 Google Search Console에서는 URL 접두어 속성과 HTML 파일/태그 인증을 선택합니다. 확인 파일은 scripts/package.mjs의 복사 대상에 추가하거나 meta 태그는 원본 index.html에 넣어 빌드 후에도 유지합니다.
- _headers는 Netlify도 지원합니다. 배포 응답에서 CSP·Referrer-Policy·nosniff를 확인하세요.
- 전 경로를 index.html로 돌리는 SPA rewrite는 추가하지 않았습니다. 없는 URL은 404.html과 실제 404 상태를 반환해야 합니다.
- docs/scripts/archive 등은 dist에서 제외합니다. 소스 수정 후 ZIP과 dist는 자동 갱신되지 않습니다.
- 사진 게시 권한·고객 동의 범위와 실제 예약 정보를 공개 전 확인합니다.

## 업로드 후 확인

- /, CSS, JS, 이미지, /robots.txt, /sitemap.xml 200 응답과 올바른 MIME
- 없는 임의 경로 404, 홈 링크 정상 작동
- canonical / OG / JSON-LD / sitemap / robots 주소 일치
- Netlify 접근 보호·봇 보안·리디렉션이 검색용 봇을 막지 않는지 확인
- production에 noindex 또는 X-Robots-Tag: noindex가 없는지 확인. 미리보기 정책은 별도 확인
- 360/390/768/1440px, 확대 200%, Tab, FAQ, JavaScript 끈 상태, Lighthouse 확인
- 예약·인스타그램·지도 링크 실제 대상 확인

공식: https://docs.netlify.com/deploy/create-deploys/ · https://docs.netlify.com/manage/routing/headers/

## Google Search Console

1. https://search.google.com/search-console 에서 도메인 속성을 추가하고 제공된 DNS TXT로 소유권을 확인합니다. 또는 URL 접두어 속성의 HTML 파일/메타태그 방식을 사용합니다. 토큰은 계정에서 받은 실제 값만 쓰고 유지합니다.
2. Sitemaps에서 `https://실제도메인/sitemap.xml` 제출, 읽기 성공 확인.
3. URL 검사에서 홈페이지 실시간 테스트 → 접근 가능 확인 → 색인 생성 요청. 이후 페이지 색인 생성 보고서에서 제외 이유와 Google 선택 canonical을 확인합니다.

공식: https://support.google.com/webmasters/answer/9008080?hl=ko · https://support.google.com/webmasters/answer/9012289?hl=ko

## Bing Webmaster Tools

1. https://www.bing.com/webmasters 에서 사이트 추가. Search Console 가져오기 또는 제공된 XML 파일·메타태그·DNS 방식으로 소유권을 확인합니다.
2. Sitemaps에 실제 사이트맵 URL 제출, 처리 상태 확인.
3. URL Inspection과 Site Explorer에서 수집·색인 상태 및 차단 문제를 확인합니다. 등록은 색인·추천 보장이 아닙니다.

공식: https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b · https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed

## 네이버 서치어드바이저

1. https://searchadvisor.naver.com/ 웹마스터 도구 → 사이트 등록 → 정확한 HTTPS 주소 추가.
2. 제공된 HTML 확인 파일을 루트에 업로드하거나 메타태그를 head에 추가하고 소유확인을 완료합니다.
3. 요청 → 사이트맵 제출에서 실제 sitemap.xml URL을 제출합니다.
4. 사이트 간단 체크·웹 페이지 수집 요청 및 수집/색인 보고서를 확인합니다. 화면 명칭은 변경될 수 있습니다. 네이버 플레이스 사업자 등록은 사이트 등록과 별도입니다.

공식 안내: https://searchadvisor.naver.com/guide

## 수동 품질 확인

- 360/390/768/1440px, 확대 200%, 가로 스크롤·CTA 겹침 확인
- 키보드 Tab 순서, 포커스, 본문 바로가기, FAQ Enter/Space, JavaScript 끈 상태 확인
- Lighthouse 모바일 성능·접근성·SEO 검사, PageSpeed Insights에서 실제 지표 확인
- Schema.org Validator로 BeautySalon 문법 확인, Google Rich Results Test는 지원 항목만 판정함을 유의
- 실제 사진 도입 후 이미지 크기·alt·용량·LCP/CLS 재검사
