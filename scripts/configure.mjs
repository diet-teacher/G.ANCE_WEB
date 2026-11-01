import { readFileSync, writeFileSync } from 'node:fs';
const input = process.argv[2];
let url;
try { url = new URL(input); } catch { throw new Error('사용법: node scripts/configure.mjs https://실제도메인'); }
if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash || url.hostname.endsWith('.invalid')) throw new Error('경로 없는 실제 HTTPS 도메인을 입력하세요.');
for (const file of ['index.html', 'robots.txt', 'sitemap.xml']) {
  let source = readFileSync(new URL('../' + file, import.meta.url), 'utf8');
  const old = file === 'index.html' ? source.match(/rel="canonical" href="(https:\/\/[^/]+)\//)?.[1] : source.match(/https:\/\/[^/\s<]+/)?.[0];
  if (!old) throw new Error(`${file}: 기존 도메인 누락`);
  source = source.replaceAll(old, url.origin);
  writeFileSync(new URL('../' + file, import.meta.url), source);
}
console.log('canonical, OG, JSON-LD, robots, sitemap 도메인 설정 완료');
