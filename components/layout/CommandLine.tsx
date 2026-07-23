import { useEffect, useRef, useState } from 'react';
import { autocomplete, runCommand, type CmdContext, type CmdLine, type Tone } from '@/lib/commands';
import { Icon } from '@/components/common/Icon';

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  actions: Omit<CmdContext, 'clear' | 'close'>;
}

const TONE: Record<Tone, string> = {
  default: '#b5b5b5',
  muted: '#565f89',
  error: '#e06c75',
  accent: '#f8ad40',
  green: '#98c379',
  cyan: '#56b6c2',
  yellow: '#e5c07b',
};

interface Row extends CmdLine {
  id: number;
  prompt?: boolean;
}

function PathLine() {
  return (
    <div className="text-[13px]">
      <span className="font-bold text-cyan">~/portfolio</span>
      <span className="text-fg-6"> on </span>
      <span className="text-green">main</span>
    </div>
  );
}

export function CommandLine({ open, onOpen, onClose, actions }: Props) {
  const [rows, setRows] = useState<Row[]>([{ id: 0, text: "type 'help' to get started", tone: 'muted' }]);
  const [input, setInput] = useState('');
  const [height, setHeight] = useState(280);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const resizing = useRef(false);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [rows, open]);

  const append = (newRows: Row[]) => setRows((r) => [...r, ...newRows]);

  const run = (raw: string) => {
    const next: Row[] = [{ id: idRef.current++, text: raw, prompt: true }];
    const ctx: CmdContext = {
      ...actions,
      clear: () => setRows([]),
      close: onClose,
    };
    const out = runCommand(raw, ctx);
    out.forEach((l) => next.push({ ...l, id: idRef.current++ }));
    if (raw.trim() === 'clear') {
      setRows([]);
    } else {
      append(next);
    }
    if (raw.trim()) {
      setHistory((h) => [...h, raw]);
      setHistIdx(-1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const c = autocomplete(input);
      if (c) setInput(c);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      append([{ id: idRef.current++, text: input, prompt: true }, { id: idRef.current++, text: '^C', tone: 'muted' }]);
      setInput('');
    }
  };

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    resizing.current = true;
    const onMove = (ev: PointerEvent) => {
      if (!resizing.current) return;
      const h = window.innerHeight - ev.clientY - 26;
      setHeight(Math.max(140, Math.min(h, window.innerHeight * 0.8)));
    };
    const onUp = () => {
      resizing.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  if (!open) {
    return (
      <button
        onClick={onOpen}
        className="fixed inset-x-0 bottom-[26px] z-[150] flex h-[26px] w-full cursor-pointer items-center gap-2 border-t border-line-0 bg-panel-0 px-4 text-left font-mono text-[11px] text-fg-6 transition-colors hover:text-orange"
      >
        <span className="text-orange">❯</span>
        <span>open terminal</span>
        <span className="ml-auto text-fg-8">` or click</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-x-0 bottom-[26px] z-[150] flex flex-col border-t border-line-4 bg-[#0a0a0a]"
      style={{ height }}
    >
      <div
        onPointerDown={startResize}
        className="flex h-[24px] shrink-0 cursor-ns-resize items-center gap-2 border-b border-line-2 bg-panel-5 px-3 text-[11px] text-fg-6"
      >
        <span className="text-orange">❯</span>
        <span>zsh — ~/portfolio</span>
        <span className="mx-auto text-fg-9">⠿ drag to resize</span>
        <button
          onClick={onClose}
          className="cursor-pointer border-none bg-transparent text-fg-6 transition-colors hover:text-orange"
          aria-label="close terminal"
        >
          ✕
        </button>
      </div>
      <div ref={bodyRef} onClick={() => inputRef.current?.focus()} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-[1.55]">
        {rows.map((r) => {
          if (r.prompt) {
            return (
              <div key={r.id} className="mt-2 first:mt-0">
                <PathLine />
                <div className="whitespace-pre-wrap break-words">
                  <span className="text-orange">❯</span> <span className="text-[#eee]">{r.text}</span>
                </div>
              </div>
            );
          }
          if (r.row) {
            const { row } = r;
            if (row.head) {
              return (
                <div key={r.id} className="flex items-center gap-2 text-[11px] uppercase tracking-[1px] text-fg-6">
                  <span className="inline-block w-[14px]" />
                  <span className="w-[104px]">{row.perms}</span>
                  <span className="w-[64px] pr-3 text-right">{row.size}</span>
                  <span>{row.name}</span>
                </div>
              );
            }
            return (
              <div key={r.id} className="flex items-center gap-2">
                <Icon name="folder" size={14} className="text-cyan" />
                <span className="w-[104px] text-fg-4">{row.perms}</span>
                <span className="w-[64px] pr-3 text-right text-green tabular-nums">{row.size}</span>
                <span className="text-cyan">{row.name}</span>
              </div>
            );
          }
          return (
            <div key={r.id} className="whitespace-pre-wrap break-words" style={{ color: TONE[r.tone ?? 'default'] }}>
              {r.text}
            </div>
          );
        })}
        <div className="mt-2">
          <PathLine />
          <div className="flex items-center gap-2">
            <span className="text-orange">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="min-w-0 flex-1 border-none bg-transparent font-mono text-[13px] text-[#eee] outline-none"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
