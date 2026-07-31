import { autocomplete, displayPwd, runCommand, type CmdContext, type CmdLine, type CompletionOption, type Seg } from '@/lib/commands';
import { mailto, openUrl } from '@/lib/helpers';
import { HIRE_COPY } from '@/lib/i18n';
import { STORAGE_KEYS, readLS, writeLS } from '@/lib/storage';
import { useTerminal } from '@/store/terminal';
import { useEffect, useRef, useState } from 'react';

interface Menu {
  base: string;
  options: CompletionOption[];
  index: number;
}

export interface Row extends CmdLine {
  id: number;
  prompt?: boolean;
  path?: string;
}

export const useCommandLine = (open: boolean, onClose: () => void, actions: Omit<CmdContext, 'clear' | 'close' | 'pwd' | 'setPwd'>) => {
  const [rows, setRows] = useState<Row[]>([{ id: 0, text: "type 'help' to get started", tone: 'muted' }]);
  const [input, setInput] = useState('');
  const [pwd, setPwd] = useState<Seg>(['portfolio']);
  const [height, setHeight] = useState(280);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [treeOpen, setTreeOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const resizing = useRef(false);

  useEffect(() => {
    try {
      const saved = readLS(STORAGE_KEYS.history);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [rows, open, menu]);

  const nextId = () => idRef.current++;
  const append = (newRows: Row[]) => setRows((r) => [...r, ...newRows]);

  const suggestion = input ? [...history].reverse().find((h) => h.startsWith(input) && h !== input) : undefined;

  const run = (raw: string) => {
    let cmd = raw.trim();
    if (!cmd) return;
    if (cmd === '!!') cmd = history[history.length - 1] ?? '';
    if (!cmd) {
      append([
        { id: nextId(), text: raw, prompt: true },
        { id: nextId(), text: '!!: no previous command', tone: 'error' },
      ]);
      return;
    }

    const parts = cmd.split(/\s+/);
    const head = parts[0];
    const echo: Row = { id: nextId(), text: cmd, prompt: true, path: displayPwd(pwd) };
    if (head === 'clear') {
      setRows([]);
    } else if (head === 'tree') {
      append([echo]);
      setTreeOpen(true);
    } else if (head === 'cmatrix') {
      append([echo]);
      useTerminal.getState().setMatrix(true);
    } else if (head === 'crt') {
      const on = !useTerminal.getState().crtOn;
      useTerminal.getState().setCrt(on);
      append([echo, { id: nextId(), text: on ? 'CRT mode on — retro phosphor engaged' : 'CRT mode off', tone: on ? 'green' : 'muted' }]);
    } else if (head === 'sudo' && parts[1] === 'reject-me') {
      append([echo]);
      setBusy(true);
      const c = HIRE_COPY[actions.lang];
      const { baited, hireAttempts } = useTerminal.getState();
      let delay = 300;
      const line = (text: string, tone: CmdLine['tone'], gap: number) => {
        setTimeout(() => append([{ id: nextId(), text, tone }]), delay);
        delay += gap;
      };
      line('[sudo] password for recruiter: ********', 'muted', 500);
      if (hireAttempts > 0) line(`${c.attempts(hireAttempts)} logged.`, 'muted', 550);
      c.steps.forEach((s, i) => line(s, i === c.steps.length - 1 ? 'error' : 'muted', 650));
      if (baited) c.baited.forEach((s) => line(s, 'yellow', 700));
      setTimeout(() => {
        openUrl(mailto(baited ? 'reject-me (baited)' : 'reject-me', actions.lang));
        setBusy(false);
      }, delay);
    } else if (head === 'history') {
      append([echo, ...history.map((h, i) => ({ id: nextId(), text: `${String(i + 1).padStart(3, ' ')}  ${h}` }))]);
    } else {
      const ctx: CmdContext = { ...actions, clear: () => setRows([]), close: onClose, pwd, setPwd };
      append([echo, ...runCommand(cmd, ctx).map((l) => ({ ...l, id: nextId() }))]);
    }

    setHistory((h) => {
      if (h[h.length - 1] === cmd) return h;
      const nh = [...h, cmd].slice(-100);
      writeLS(STORAGE_KEYS.history, JSON.stringify(nh));
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
    const { base, options } = autocomplete(input, pwd);
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

  return {
    rows,
    input,
    setInput,
    onInputChange,
    height,
    inputRef,
    bodyRef,
    suggestion,
    menu,
    treeOpen,
    closeTree,
    busy,
    onKeyDown,
    startResize,
    pwd,
  };
};
