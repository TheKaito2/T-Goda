// One-time asset copy: assets/ -> public/ with kebab-case filenames.
// Run: node scripts/copy-assets.mjs

import { readdir, mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { join, basename, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'assets');
const PUB = join(ROOT, 'public');

function kebab(name) {
  const base = basename(name, extname(name))
    .replace(/[\s_]+/g, '-')
    .replace(/\(([^)]+)\)/g, '-$1')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return base + extname(name).toLowerCase();
}

async function ensureDir(d) {
  await mkdir(d, { recursive: true });
}

async function copyTree(srcDir, dstDir, transform) {
  await ensureDir(dstDir);
  const entries = await readdir(srcDir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) continue;
    const srcPath = join(srcDir, e.name);
    const dstPath = join(dstDir, kebab(e.name));
    if (transform) {
      const content = await readFile(srcPath, 'utf8');
      await writeFile(dstPath, transform(content));
    } else {
      await copyFile(srcPath, dstPath);
    }
  }
}

// Strip hard-coded fill/stroke from icons that should accept currentColor.
// We KEEP fills on multi-color brand icons (Facebook, Instagram, Twitter).
function makeCurrentColor(svg) {
  return svg
    .replace(/(stroke|fill)="#[0-9a-fA-F]{3,8}"/g, '$1="currentColor"')
    .replace(/(stroke|fill)="(black|red|blue|green)"/gi, '$1="currentColor"');
}

async function main() {
  // Icons
  await copyTree(join(SRC, 'Icons', 'Footer'), join(PUB, 'icons', 'footer'));
  await copyTree(join(SRC, 'Icons', 'HomePage'), join(PUB, 'icons', 'home'), makeCurrentColor);
  await copyTree(join(SRC, 'Icons', 'RoomDetail'), join(PUB, 'icons', 'room-detail'), makeCurrentColor);
  await copyTree(join(SRC, 'Icons', 'SearchResult'), join(PUB, 'icons', 'search-result'), makeCurrentColor);

  // Images (no transform)
  await copyTree(join(SRC, 'Pics', 'PNG', 'HomePage'), join(PUB, 'images', 'home'));
  await copyTree(join(SRC, 'Pics', 'PNG', 'RoomDetail'), join(PUB, 'images', 'room-detail'));
  await copyTree(join(SRC, 'Pics', 'PNG', 'SearchResult'), join(PUB, 'images', 'search-result'));

  console.log('✓ assets copied to public/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
