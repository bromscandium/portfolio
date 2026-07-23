import { useEffect, useState } from 'react';
import { ARCH_LOGO, TERMINAL_ROOT } from '@/lib/config';

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export const BootLoader = () => {
  const [f, setF] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setF((x) => (x + 1) % FRAMES.length), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[900] flex flex-col items-center justify-center gap-6 bg-bg font-mono">
      <pre className="m-0 select-none text-[10px] leading-[1.25] text-fg-11">{ARCH_LOGO}</pre>
      <div className="flex items-center gap-2 text-[13px] text-fg-3">
        <span className="text-orange">{FRAMES[f]}</span>
        <span>booting {TERMINAL_ROOT}…</span>
      </div>
      <div className="h-[3px] w-55 overflow-hidden rounded bg-panel-4">
        <div className="h-full bg-orange" style={{ animation: 'bootbar 1.5s ease-out forwards' }} />
      </div>
    </div>
  );
};
