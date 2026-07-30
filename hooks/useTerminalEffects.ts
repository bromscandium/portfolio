import { SECTION_LABELS } from '@/lib/config';
import { arrowDirection } from '@/lib/keys';
import { splitCombo } from '@/lib/modes';
import { ALL_COMBOS } from '@/store/constants';
import { activeFromViewport, CMD, getScrollEl, useTerminal } from '@/store/terminal';
import { useEffect } from 'react';

const LAST_SECTION = SECTION_LABELS.length - 1;

export const useTerminalEffects = () => {
  const session = useTerminal((s) => s.session);
  const running = useTerminal((s) => s.phase === 'run');

  useEffect(() => {
    useTerminal.getState().restore();
  }, []);

  useEffect(() => {
    if (!running) return;
    const { setTyped } = useTerminal.getState();
    setTyped(0);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= CMD.length) clearInterval(id);
    }, 65);
    const fb = setTimeout(() => {
      clearInterval(id);
      setTyped(CMD.length);
    }, 2500);
    return () => {
      clearInterval(id);
      clearTimeout(fb);
    };
  }, [session, running]);

  useEffect(() => {
    if (!running) return;
    const el = getScrollEl();
    if (!el) return;
    const { setActive } = useTerminal.getState();
    const onScroll = () => setActive(activeFromViewport());
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [running]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = useTerminal.getState();
      const el = document.activeElement as HTMLElement | null;
      const typing = !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        return st.togglePalette();
      }
      // Modal-based overlays own their own keys (Esc/close animate themselves)
      if (st.closeConfirm || st.helpOpen || st.paletteOpen || st.picker) return;
      if (e.key === '`' && st.mode !== 'human') {
        e.preventDefault();
        return st.toggleCmd();
      }
      // command line (input + tree) owns the keyboard while open
      if (st.cmdOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          return st.closeCmd();
        }
        return;
      }

      if (e.altKey && /^Digit[1-4]$/.test(e.code)) {
        e.preventDefault();
        const [m, l] = splitCombo(ALL_COMBOS[Number(e.code.slice(5)) - 1]);
        return st.setCombo(m, l);
      }
      if (e.key === 'Escape') {
        if (st.searchOpen) return st.closeSearch();
        if (st.expandedId !== null) return st.closeModal();
        if (st.plusOpen) return st.setPlusOpen(false);
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.();
        return;
      }

      const dir = arrowDirection(e.key);
      if (dir) {
        e.preventDefault();
        if (dir === 'down') return st.goTo(Math.min(st.active + 1, LAST_SECTION));
        if (dir === 'up') return st.goTo(Math.max(st.active - 1, 0));
        if (dir === 'right') return st.cycleTab(1);
        return st.cycleTab(-1);
      }

      if (/^[1-9]$/.test(e.key)) {
        const n = Number(e.key);
        if (n <= SECTION_LABELS.length) {
          e.preventDefault();
          return st.goTo(n - 1);
        }
        return;
      }

      switch (e.key) {
        case 'g':
          return st.goTo(0);
        case 'G':
          return st.goTo(LAST_SECTION);
        case ']':
          return st.cycleTab(1);
        case '[':
          return st.cycleTab(-1);
        case 't':
          return st.openNewTab();
        case 'w':
          return st.closeTab(`${st.mode}-${st.lang}`);
        case '/':
          e.preventDefault();
          st.goTo(3);
          return st.openSearch();
        case '?':
          return st.toggleHelp();
        default:
          return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
};
