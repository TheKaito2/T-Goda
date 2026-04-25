'use client';
import type { SVGProps } from 'react';
import { ICONS, type IconName } from '@/lib/icons.generated';

type AnyIconName =
  | IconName
  | `home/${string}`
  | `search-result/${string}`
  | `room-detail/${string}`
  | `footer/${string}`;

type Props = {
  name: AnyIconName;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'className'>;

export default function IconStatic({ name, className, size, width, height, ...rest }: Props) {
  const Comp = ICONS[name as IconName];
  if (!Comp) return null;
  const w = width ?? size;
  const h = height ?? size;
  return <Comp className={className} width={w} height={h} {...rest} />;
}
