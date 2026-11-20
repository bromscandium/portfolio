import { Icon } from '@/components/common/Icon';
import type { Row } from '@/hooks/useCommandLine';
import type { Tone } from '@/lib/commands';
import { PathLine } from './PathLine';

const TONE: Record<Tone, string> = {
  default: 'var(--color-fg-2)',
  muted: 'var(--color-ghost)',
  error: 'var(--color-red)',
  accent: 'var(--color-orange)',
  green: 'var(--color-green)',
  cyan: 'var(--color-cyan-img)',
  yellow: 'var(--color-yellow)',
  shimmer: 'var(--color-orange)',
};

const SHIMMER = {
  background: 'linear-gradient(90deg, var(--color-orange), var(--color-cyan-img), var(--color-orange))',
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'archShimmer 2s linear infinite',
} as const;

const ShimmerLine = ({ text }: { text?: string }) => (
  <div className="whitespace-pre-wrap break-words">
    <span style={SHIMMER}>{text}</span>
  </div>
);

export const CommandRow = ({ row }: { row: Row }) => {
  if (row.prompt) {
    return (
      <div className="mt-2 first:mt-0">
        <PathLine path={row.path} />
        <div className="whitespace-pre-wrap break-words">
          <span className="text-orange">❯</span> <span className="text-fg">{row.text}</span>
        </div>
      </div>
    );
  }

  if (row.row) {
    const r = row.row;
    if (r.head) {
      return (
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[1px] text-fg-6">
          <span className="inline-block w-3.5" />
          <span className="w-26">{r.perms}</span>
          <span className="w-16 pr-3 text-right">{r.size}</span>
          <span>{r.name}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Icon name="folder" size={14} className="text-cyan" />
        <span className="w-26 text-fg-4">{r.perms}</span>
        <span className="w-16 pr-3 text-right text-green tabular-nums">{r.size}</span>
        <span className="text-cyan">{r.name}</span>
      </div>
    );
  }

  if (row.tone === 'shimmer') return <ShimmerLine text={row.text} />;

  return (
    <div className="whitespace-pre-wrap break-words" style={{ color: TONE[row.tone ?? 'default'] }}>
      {row.text}
    </div>
  );
};
