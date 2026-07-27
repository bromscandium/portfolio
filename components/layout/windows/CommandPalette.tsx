import { Modal } from '@/components/common/Modal';
import { LINKS, SECTION_LABELS } from '@/lib/config';
import { portfolio } from '@/lib/data';
import { fuzzy, openUrl } from '@/lib/helpers';
import { MODES, MODE_META } from '@/lib/modes';
import { useTerminal } from '@/store/terminal';
import { useMemo, useRef, useState } from 'react';

interface Action {
  id: string;
  label: string;
  hint: string;
  shortcut?: string;
  run: () => void;
}

const Row = ({ action, active, onRun, onHover }: { action: Action; active: boolean; onRun: (a: Action) => void; onHover: () => void }) => (
  <button
    onMouseEnter={onHover}
    onMouseDown={(e) => {
      e.preventDefault();
      onRun(action);
    }}
    className="flex w-full items-baseline gap-3 rounded-btn border-none px-3 py-2 text-left font-mono text-[13px] transition-colors"
    style={{ background: active ? '#161616' : 'transparent', color: active ? 'var(--color-orange)' : '#b5b5b5' }}
  >
    <span className="min-w-0 flex-1 truncate">{action.label}</span>
    {action.shortcut ? (
      <span className="shrink-0 rounded-badge border border-line-4 px-1.5 py-0.5 text-[10px] text-fg-4">{action.shortcut}</span>
    ) : (
      <span className="shrink-0 text-[10px] uppercase tracking-[2px] text-fg-6">{action.hint}</span>
    )}
  </button>
);

const PaletteBody = ({ close }: { close: () => void }) => {
  const mode = useTerminal((s) => s.mode);
  const lang = useTerminal((s) => s.lang);
  const { goTo, openProject, setCombo, toggleHelp } = useTerminal.getState();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(
    () => [
      ...SECTION_LABELS.map((name, i) => ({ id: `go-${i}`, label: `Go to ${name}`, hint: 'section', shortcut: `${i + 1}`, run: () => goTo(i) })),
      ...MODES.filter((m) => m !== mode).map((m) => ({
        id: `view-${m}`,
        label: `Switch view: ${MODE_META[m].label[lang]}`,
        hint: 'view',
        run: () => setCombo(m, lang),
      })),
      { id: 'lang-en', label: 'Language: English', hint: 'lang', run: () => setCombo(mode, 'en') },
      { id: 'lang-uk', label: 'Language: Українська', hint: 'lang', run: () => setCombo(mode, 'uk') },
      ...portfolio.map((p) => ({
        id: `open-${p.id}`,
        label: `Open project: ${p.title}`,
        hint: p.category,
        run: () => {
          goTo(3);
          openProject(p.id);
        },
      })),
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
    close();
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

  return (
    <>
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
    </>
  );
};

export const CommandPalette = () => {
  const closePalette = useTerminal((s) => s.closePalette);
  return (
    <Modal
      onClose={closePalette}
      z={650}
      backdropClass="bg-black/[.8]"
      panelClassName="flex max-h-[60vh] w-[min(640px,94vw)] flex-col overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
    >
      {(close) => <PaletteBody close={close} />}
    </Modal>
  );
};
