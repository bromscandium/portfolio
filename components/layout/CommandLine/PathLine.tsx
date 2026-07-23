import { TERMINAL_ROOT } from '@/lib/config';

export const PathLine = () => {
  return (
    <div className="text-[13px]">
      <span className="font-bold text-cyan">{TERMINAL_ROOT}</span>
      <span className="text-fg-6"> on </span>
      <span className="text-green">main</span>
    </div>
  );
}
