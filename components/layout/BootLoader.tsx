import { HOST } from '@/lib/config';
import { STORAGE_KEYS, readLS } from '@/lib/storage';
import { useEffect, useState } from 'react';

interface Line {
  text: string;
  ok?: boolean;
  tone?: 'muted' | 'yellow';
}

const buildLines = (): Line[] => {
  let mode: string | null = null;
  let lang: string | null = null;
  let tabs = 0;
  try {
    mode = readLS(STORAGE_KEYS.mode);
    lang = readLS(STORAGE_KEYS.lang);
    tabs = JSON.parse(readLS(STORAGE_KEYS.tabs) || '[]').length || 0;
  } catch {}
  const returning = mode === 'dev' || mode === 'human';

  return [
    { text: `ssh yaroslav@${HOST}`, tone: 'muted' },
    { text: `yaroslav@${HOST}'s password: ********`, tone: 'muted' },
    { ok: true, text: 'connection established · Arch Linux' },
    { ok: true, text: 'fonts loaded — JetBrains Mono · Jura' },
    { ok: true, text: 'sections mounted' },
    returning
      ? { ok: true, text: `session restored — ${mode} · ${lang ?? 'en'} · ${tabs || 1} tab(s)` }
      : { text: 'new user logged in — no saved session', tone: 'yellow' },
    { ok: true, text: 'reached target portfolio.target' },
  ];
};

export const BootLoader = ({ onDone }: { onDone: () => void }) => {
  const [lines, setLines] = useState<Line[]>([]);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const all = buildLines();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(all);
    const id = setInterval(() => setShown((x) => Math.min(x + 1, all.length)), 190);
    const done = setTimeout(onDone, all.length * 190 + 350);
    return () => {
      clearInterval(id);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[900] bg-bg font-mono text-[13px] leading-[1.7]">
      <div className="flex flex-col p-6">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className={l.tone === 'yellow' ? 'text-yellow' : l.tone === 'muted' ? 'text-fg-5' : 'text-fg-2'}>
            {l.ok && <span className="text-green">[ ok ] </span>}
            {l.text}
          </div>
        ))}
        <span className="blink mt-0.5 inline-block h-[1em] w-[7px] bg-orange" aria-hidden />
      </div>
    </div>
  );
};
