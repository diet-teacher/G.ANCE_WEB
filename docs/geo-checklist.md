# GEO / Technical SEO 점검

목표는 정확하고 접근 가능한 업체 정보를 제공하는 것입니다. AI의 언급·인용·순위는 보장할 수 없습니다. 숨은 키워드·가짜 후기·허위 경력·대량 검색용 페이지를 사용하지 않습니다.

2026-11-01: 현재 배포 준비 대상은 Netlify입니다. 기존 Cloudflare 전용 항목은 향후 Cloudflare 사용 시에만 적용합니다. Netlify에서는 프로젝트의 접근 보호·봇 보안·리디렉션 및 실제 robots 응답을 확인하세요. 배포 준비와 실제 공개는 별개이며 현재 원격 사이트는 변경하지 않았습니다.

## 배포 전

- [ ] 실제 도메인 설정 및 `node scripts/verify.mjs --production` 통과
- [ ] HTML 제목·설명·H1·주소와 JSON-LD 상호·주소 일치
- [ ] 외부 공식 프로필의 상호·주소·전화 등 대조 및 수정
- [ ] 전화·영업시간·좌표·가격·사진은 확인된 경우만 추가
- [ ] canonical / og:url / JSON-LD url / sitemap / robots Sitemap 동일 도메인
- [ ] 주요 콘텐츠가 JS 없이 표시되고 앵커로 이동 가능
- [ ] 실제 사진 확보 시 SNS 공유 이미지도 실제 절대 URL로 추가(현재 이미지 메타 생략)

## 크롤러 정책

현재 `User-agent: * Allow: /`는 Googlebot, Bingbot, Yeti, OAI-SearchBot, PerplexityBot 및 Claude-SearchBot 등을 포함한 기본 검색 접근을 허용합니다. GPTBot만 별도 `Disallow: /`로 설정했습니다. GPTBot은 학습 목적 크롤러로 OAI-SearchBot과 별개입니다. 소유자가 학습 수집을 허용하려면 해당 GPTBot 블록을 `Allow: /`로 바꾸세요. 다른 사업자의 학습 수집 정책까지 이 설정 하나로 제어되지는 않습니다. 각 공식 문서를 확인해 개별 정책을 결정합니다.

공식 OpenAI 크롤러 구분: https://developers.openai.com/api/docs/bots

robots.txt는 협조적인 크롤러에게 전달하는 규칙이며 보안 설정을 해제하지 않습니다. User-Agent를 흉내 낸 요청이 성공해도 실제 검증된 봇의 접근 성공을 증명하지는 않습니다.

## Cloudflare 배포 후

- [ ] 실제 `/robots.txt` 응답을 원본 파일과 대조. 관리형 robots.txt가 추가한 규칙·content signal 확인
- [ ] AI Crawl Control에서 검색용 봇이 차단/과금/챌린지 대상인지 확인
- [ ] WAF 커스텀·관리형 규칙, 봇 차단, Bot Fight Mode, 국가/IP 제한, 레이트 제한, Access 인증 확인
- [ ] OAI-SearchBot 등 공식 봇 식별 기준/IP·검증 봇 정보를 대조. UA 문자열만으로 보안 예외를 만들지 않음
- [ ] Cloudflare 보안 이벤트/가능한 트래픽 로그에서 실제 검색 봇의 403·429·챌린지를 점검
- [ ] Google URL 검사 및 Bing 검사에서 렌더링/접근 확인. 원본 HTML 200과 CSS 접근도 확인
- [ ] X-Robots-Tag, meta robots, 로그인·챌린지·리디렉션 루프가 색인을 막지 않는지 확인
- [ ] robots/sitemap 변경 후 캐시된 응답을 재확인. 정책 변경 날짜 기록

공식 Cloudflare 문서: https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/ · https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/

## 전후 측정

`geo-measurement.csv`에 배포 전 기준선을 먼저 기록하고 배포 후 같은 질문·서비스·모델·검색 모드·지역·로그인 조건으로 반복합니다. 질문별 3회 이상 측정하되 각 결과를 따로 기록합니다. 가능하면 새 대화로 테스트하고, 사전 대화에서 브랜드를 알려주는 유도를 피합니다.

언급과 인용을 구분하고 실제 인용 URL과 응답 공유 링크(가능한 경우)를 남깁니다. 실험하지 않은 결과는 미측정으로 둡니다. 경쟁 업체명도 실제 응답에 있는 경우만 기록합니다. 월별 언급률·홈페이지 인용률은 측정 완료 건수만 분모로 집계합니다. 개인화·모델·검색 인덱스 변경에 따른 변동이 있으므로 전후 변화만으로 홈페이지의 인과 효과를 단정하지 않습니다.
