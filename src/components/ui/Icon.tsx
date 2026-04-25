import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

type IconName =
  | `home/${string}`
  | `search-result/${string}`
  | `room-detail/${string}`
  | `footer/${string}`;

type Props = {
  name: IconName;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
};

export default async function Icon({ name, className, size, width, height }: Props) {
  const path = join(process.cwd(), 'public', 'icons', `${name}.svg`);
  let svg = await readFile(path, 'utf8');

  const w = width ?? size;
  const h = height ?? size;
  if (w !== undefined) svg = svg.replace(/width="[^"]*"/, `width="${w}"`);
  if (h !== undefined) svg = svg.replace(/height="[^"]*"/, `height="${h}"`);
  if (className) {
    if (svg.includes('class="')) {
      svg = svg.replace(/class="([^"]*)"/, `class="$1 ${className}"`);
    } else {
      svg = svg.replace(/<svg/, `<svg class="${className}"`);
    }
  }

  return <span aria-hidden className="inline-flex" dangerouslySetInnerHTML={{ __html: svg }} />;
}
