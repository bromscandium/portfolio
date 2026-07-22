import { icons } from '@/lib/data';

export function Icon({ name, size = 20 }: { name: keyof typeof icons; size?: number }) {
  const ic = icons[name];
  return (
    <svg width={size} height={size} viewBox={ic.vb} fill="currentColor" aria-hidden>
      <path d={ic.d} />
    </svg>
  );
}
