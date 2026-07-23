import { Icon } from '@/components/common/Icon';
import type { Tone } from '@/lib/commands';
import type { Row } from '@/hooks/useCommandLine';
import { PathLine } from './PathLine';

const TONE: Record<Tone, string> = {
  default: '#b5b5b5',
  muted: '#565f89',
  error: '#e06c75',
  accent: 'var(--color-orange)',
  green: '#98c379',
  cyan: '#56b6c2',
  yellow: '#e5c07b',
};

export const CommandRow = ({ row }: { row: Row }) => {
  if (row.prompt) {
    return (
      <div className="mt-2 first:mt-0">
        <PathLine />
        <div className="whitespace-pre-wrap break-words">
          <span className="text-orange">❯</span> <span className="text-[#eee]">{row.text}</span>
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

  return (
    <div className="whitespace-pre-wrap break-words" style={{ color: TONE[row.tone ?? 'default'] }}>
      {row.text}
    </div>
  );
}
