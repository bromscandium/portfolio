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

  const run = (raw: string) => {
    if (raw.trim() === 'clear') {
      setRows([]);
    } else {
      const next: Row[] = [{ id: idRef.current++, text: raw, prompt: true }];
      const ctx: CmdContext = { ...actions, clear: () => setRows([]), close: onClose };
      runCommand(raw, ctx).forEach((l) => next.push({ ...l, id: idRef.current++ }));
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
      append([
        { id: idRef.current++, text: input, prompt: true },
        { id: idRef.current++, text: '^C', tone: 'muted' },
      ]);
      setInput('');
    }
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
}
