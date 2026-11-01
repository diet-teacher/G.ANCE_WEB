import { cpSync, existsSync, lstatSync, mkdirSync, realpathSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const output = resolve(root, 'dist');
function verify(args) {
  const result = spawnSync(process.execPath, [join(root, 'scripts/verify.mjs'), '--production', ...args], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
verify([]);
// Only replace the dedicated generated directory, never a linked directory.
if (existsSync(output)) {
  if (lstatSync(output).isSymbolicLink() || realpathSync(output) !== join(root, 'dist')) throw new Error('dist 경로 확인 실패');
  rmSync(output, { recursive: true });
}
mkdirSync(output);
for (const name of ['index.html', '404.html', 'css', 'js', 'assets', '_headers', 'robots.txt', 'sitemap.xml']) {
  cpSync(join(root, name), join(output, name), { recursive: true });
}
verify(['--dist']);
console.log('Netlify 업로드 폴더 준비 완료: ' + output);
