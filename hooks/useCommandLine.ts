import { useEffect, useRef, useState } from 'react';
import { autocomplete, runCommand, type CmdContext, type CmdLine } from '@/lib/commands';

export interface Row extends CmdLine {
  id: number;
  prompt?: boolean;
}

export const useCommandLine = (open: boolean, onClose: () => void, actions: Omit<CmdContext, 'clear' | 'close'>) => {
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
  const nextId = () => idRef.current++;

  const run = (raw: string) => {
    if (raw.trim() === 'clear') {
      setRows([]);
    } else {
      const echo: Row = { id: nextId(), text: raw, prompt: true };
      const ctx: CmdContext = { ...actions, clear: () => setRows([]), close: onClose };
      const output = runCommand(raw, ctx).map((l) => ({ ...l, id: nextId() }));
      append([echo, ...output]);
    }
    if (raw.trim()) {
      setHistory((h) => [...h, raw]);
      setHistIdx(-1);
    }
  };

  const submit = () => {
    run(input);
    setInput('');
  };

  const complete = () => {
    const c = autocomplete(input);
    if (c) setInput(c);
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

  return { rows, input, setInput, height, inputRef, bodyRef, onKeyDown, startResize };
};
