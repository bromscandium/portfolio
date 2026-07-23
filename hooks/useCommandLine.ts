import { useEffect, useRef, useState } from 'react';
import { autocomplete, runCommand, type CmdContext, type CmdLine, type CompletionOption } from '@/lib/commands';

interface Menu {
  base: string;
  options: CompletionOption[];
  index: number;
}

export interface Row extends CmdLine {
  id: number;
  prompt?: boolean;
}

const HISTORY_KEY = 'brom_history';

export const useCommandLine = (open: boolean, onClose: () => void, actions: Omit<CmdContext, 'clear' | 'close'>) => {
  const [rows, setRows] = useState<Row[]>([{ id: 0, text: "type 'help' to get started", tone: 'muted' }]);
  const [input, setInput] = useState('');
  const [height, setHeight] = useState(280);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [treeOpen, setTreeOpen] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const resizing = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [rows, open]);

  const nextId = () => idRef.current++;
  const append = (newRows: Row[]) => setRows((r) => [...r, ...newRows]);

  const suggestion = input ? [...history].reverse().find((h) => h.startsWith(input) && h !== input) : undefined;

  const run = (raw: string) => {
    let cmd = raw.trim();
    if (!cmd) return;
    if (cmd === '!!') cmd = history[history.length - 1] ?? '';
    if (!cmd) {
      append([{ id: nextId(), text: raw, prompt: true }, { id: nextId(), text: '!!: no previous command', tone: 'error' }]);
      return;
    }

    const echo: Row = { id: nextId(), text: cmd, prompt: true };
    if (cmd === 'clear') {
      setRows([]);
    } else if (cmd === 'tree') {
      append([echo]);
      setTreeOpen(true);
    } else if (cmd === 'history') {
      append([echo, ...history.map((h, i) => ({ id: nextId(), text: `${String(i + 1).padStart(3, ' ')}  ${h}` }))]);
    } else {
      const ctx: CmdContext = { ...actions, clear: () => setRows([]), close: onClose };
      append([echo, ...runCommand(cmd, ctx).map((l) => ({ ...l, id: nextId() }))]);
    }

    setHistory((h) => {
      const nh = [...h, cmd];
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(nh.slice(-100)));
      } catch {}
      return nh;
    });
    setHistIdx(-1);
  };

  const submit = () => {
    setMenu(null);
    run(input);
    setInput('');
  };

  const onInputChange = (v: string) => {
    setMenu(null);
    setInput(v);
  };

  const complete = () => {
    if (menu) {
      const index = (menu.index + 1) % menu.options.length;
      setMenu({ ...menu, index });
      setInput(menu.base + menu.options[index].value);
      return;
    }
    const { base, options } = autocomplete(input);
    if (options.length === 0) return;
    if (options.length === 1) {
      const o = options[0];
      setInput(base + o.value + (o.dir ? '/' : ' '));
      return;
    }
    setMenu({ base, options, index: 0 });
    setInput(base + options[0].value);
  };

  const historyPrev = () => {
    if (!history.length) return;
    const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
    setHistIdx(idx);
    setInput(history[idx]);
  };

  const historyNext = () => {
    if (histIdx === -1) return;
    const idx = histIdx + 1;
    const atEnd = idx >= history.length;
    setHistIdx(atEnd ? -1 : idx);
    setInput(atEnd ? '' : history[idx]);
  };

  const interrupt = () => {
    append([
      { id: nextId(), text: input, prompt: true },
      { id: nextId(), text: '^C', tone: 'muted' },
    ]);
    setInput('');
  };

  const keyHandlers: Record<string, () => void> = {
    Enter: submit,
    Tab: complete,
    ArrowUp: historyPrev,
    ArrowDown: historyNext,
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      return interrupt();
    }
    if ((e.key === 'ArrowRight' || e.key === 'End') && suggestion && e.currentTarget.selectionStart === input.length) {
      e.preventDefault();
      return setInput(suggestion);
    }
    const handler = keyHandlers[e.key];
    if (!handler) return;
    e.preventDefault();
    handler();
  };

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    resizing.current = true;
    const onMove = (ev: PointerEvent) => {
      if (!resizing.current) return;
      setHeight(Math.max(140, Math.min(window.innerHeight - ev.clientY - 26, window.innerHeight * 0.8)));
    };
    const onUp = () => {
      resizing.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const closeTree = () => {
    setTreeOpen(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return { rows, input, setInput, onInputChange, height, inputRef, bodyRef, suggestion, menu, treeOpen, closeTree, onKeyDown, startResize };
};
