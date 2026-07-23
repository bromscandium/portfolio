import { useEffect, useState } from 'react';

const LINES = [
  { text: '❯ exit', tone: 'muted' as const },
  { ok: true, text: 'saving session state' },
  { ok: true, text: 'stopping containers' },
  { ok: true, text: 'unmounting /dev/portfolio' },
  { text: 'logout', tone: 'muted' as const },
  { text: 'Connection to bromscandium.com closed.', tone: 'yellow' as const },
];

export const BootUnloader = ({ onDone }: { onDone: () => void }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setShown((x) => Math.min(x + 1, LINES.length)), 180);
    const done = setTimeout(onDone, LINES.length * 180 + 300);
    return () => {
      clearInterval(id);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[900] bg-bg font-mono text-[13px] leading-[1.7]">
      <div className="flex flex-col p-6">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={l.tone === 'yellow' ? 'text-yellow' : l.tone === 'muted' ? 'text-fg-5' : 'text-fg-2'}>
            {'ok' in l && l.ok && <span className="text-green">[ ok ] </span>}
            {l.text}
          </div>
        ))}
        <span className="blink mt-0.5 inline-block h-[1em] w-[7px] bg-orange" aria-hidden />
      </div>
    </div>
  );
};
