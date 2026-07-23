import { useMemo, useRef, useState } from 'react';
import { portfolio } from '@/lib/data';
import { useTerminal } from '@/store/terminal';

interface Action {
  id: string;
  label: string;
  hint: string;
  shortcut?: string;
  run: () => void;
}

const LINKS = {
  email: 'mailto:kkmshbiu@protonmail.com',
  github: 'https://github.com/bromscandium',
  linkedin: 'https://www.linkedin.com/in/yaroslav-yeromenko/',
};

const openUrl = (url: string) => {
  if (url.startsWith('mailto:')) window.location.href = url;
  else window.open(url, '_blank', 'noopener,noreferrer');
};

const fuzzy = (q: string, text: string): boolean => {
  if (!q) return true;
  const query = q.toLowerCase();
  const hay = text.toLowerCase();
  let i = 0;
  for (const ch of hay) {
    if (ch === query[i]) i += 1;
    if (i === query.length) return true;
  }
  return false;
};

const SECTIONS = ['Intro', 'Experience', 'Skills', 'Projects', 'Contact'];

const Row = ({ action, active, onRun, onHover }: { action: Action; active: boolean; onRun: (a: Action) => void; onHover: () => void }) => (
  <button
    onMouseEnter={onHover}
    onMouseDown={(e) => {
      e.preventDefault();
      onRun(action);
    }}
    className="flex w-full items-baseline gap-3 rounded-btn border-none px-3 py-2 text-left font-mono text-[13px] transition-colors"
    style={{ background: active ? '#161616' : 'transparent', color: active ? '#f8ad40' : '#b5b5b5' }}
  >
    <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{action.label}</span>
    {action.shortcut ? (
      <span className="shrink-0 rounded-badge border border-line-4 px-1.5 py-0.5 text-[10px] text-fg-4">{action.shortcut}</span>
    ) : (
      <span className="shrink-0 text-[10px] uppercase tracking-[2px] text-fg-6">{action.hint}</span>
    )}
  </button>
);

export const CommandPalette = () => {
  const mode = useTerminal((s) => s.mode);
  const lang = useTerminal((s) => s.lang);
  const { goTo, openProject, setCombo, toggleHelp, closePalette } = useTerminal.getState();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(
    () => [
      ...SECTIONS.map((name, i) => ({ id: `go-${i}`, label: `Go to ${name}`, hint: 'section', shortcut: `${i + 1}`, run: () => goTo(i) })),
      { id: 'view-dev', label: 'Switch view: developer', hint: 'view', run: () => setCombo('dev', lang) },
      { id: 'view-human', label: 'Switch view: human', hint: 'view', run: () => setCombo('human', lang) },
      { id: 'lang-en', label: 'Language: English', hint: 'lang', run: () => setCombo(mode, 'en') },
      { id: 'lang-uk', label: 'Language: Українська', hint: 'lang', run: () => setCombo(mode, 'uk') },
      ...portfolio
        .slice()
        .sort((a, b) => b.id - a.id)
        .map((p) => ({ id: `open-${p.id}`, label: `Open project: ${p.title}`, hint: p.category, run: () => { goTo(3); openProject(p.id); } })),
      { id: 'email', label: 'Email me', hint: 'link', run: () => openUrl(LINKS.email) },
      { id: 'github', label: 'Open GitHub', hint: 'link', run: () => openUrl(LINKS.github) },
      { id: 'linkedin', label: 'Open LinkedIn', hint: 'link', run: () => openUrl(LINKS.linkedin) },
      { id: 'help', label: 'Show keyboard shortcuts', hint: 'help', shortcut: '?', run: () => toggleHelp() },
    ],
    [mode, lang, goTo, openProject, setCombo, toggleHelp],
  );

  const filtered = useMemo(() => actions.filter((a) => fuzzy(query, `${a.label} ${a.hint}`)), [actions, query]);
  const selClamped = Math.min(sel, Math.max(0, filtered.length - 1));

  const exec = (a: Action) => {
    a.run();
    closePalette();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel(Math.min(selClamped + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel(Math.max(selClamped - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const a = filtered[selClamped];
      if (a) exec(a);
    }
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={closePalette} className="fixed inset-0 z-[650] flex items-start justify-center bg-black/[.8] px-5 pt-[15vh]" style={{ animation: 'overlayIn .16s ease forwards' }}>
      <div
        onClick={stop}
        className="flex max-h-[60vh] w-[min(640px,94vw)] flex-col overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
        style={{ animation: 'modalPop .2s ease-out forwards' }}
      >
        <div className="flex items-center gap-2 border-b border-line-3 bg-panel-6 px-4 py-3">
          <span className="text-orange">❯</span>
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="type to filter actions… ↑↓ enter"
            className="min-w-0 flex-1 border-none bg-transparent font-mono text-[13px] text-fg outline-none placeholder:text-fg-6"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="shrink-0 text-[11px] text-fg-6">{filtered.length}</span>
        </div>
        <div className="flex flex-col gap-0.5 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            filtered.map((a, i) => <Row key={a.id} action={a} active={i === selClamped} onRun={exec} onHover={() => setSel(i)} />)
          ) : (
            <div className="px-3 py-4 text-[12px] text-fg-6">no matching actions</div>
          )}
        </div>
      </div>
    </div>
  );
};
