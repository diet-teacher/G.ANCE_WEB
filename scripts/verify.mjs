import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const base = process.argv.includes('--dist') ? '../dist/' : '../';
const read = f => readFileSync(new URL(base + f, import.meta.url), 'utf8');
const html = read('index.html');
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@type'], 'BeautySalon');
assert(html.includes('lang="ko"'));
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.equal((html.match(/<details\b/g) || []).length, 6);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, '중복 ID');
for (const m of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(m[1]), `내부 링크: ${m[1]}`);
for (const m of html.matchAll(/(?:href|src)="((?:css|js|assets)\/[^"]+)"/g)) assert(existsSync(new URL(base + m[1], import.meta.url)), m[1]);
for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert(m[0].includes('rel="noopener noreferrer"'));
const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
assert.equal(schema.url, canonical);
assert.equal(html.match(/property="og:url" content="([^"]+)"/)[1], canonical);
for (const m of html.matchAll(/<img\b[^>]*>/g)) {
  assert(/alt="[^"]+"/.test(m[0]), '이미지 설명 누락');
  assert(/width="\d+"/.test(m[0]) && /height="\d+"/.test(m[0]), '이미지 크기 누락');
}
assert(read('404.html').includes('noindex'));
assert(read('_headers').includes('Content-Security-Policy:'));
if (process.argv.includes('--dist')) {
  for (const name of ['docs', 'scripts', 'archive', '.git', 'README.md', 'netlify.toml']) assert(!existsSync(new URL(base + name, import.meta.url)), `배포 제외 파일: ${name}`);
}
assert(read('sitemap.xml').includes(`<loc>${canonical}</loc>`));
assert(read('robots.txt').includes(`Sitemap: ${canonical}sitemap.xml`));
if (process.argv.includes('--production')) assert(!canonical.includes('example.invalid'), '배포 전 실제 도메인 설정 필요');
console.log('PASS: JSON-LD, 메타데이터 일관성, 내부 링크, 파일 참조, 외부 링크, FAQ.');
if (canonical.includes('example.invalid')) console.log('배포 대기: 실제 도메인을 설정하세요.');
