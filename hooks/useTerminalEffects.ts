import { useEffect } from 'react';
import { activeFromViewport, CMD, useTerminal } from '@/store/terminal';
import { ALL_COMBOS } from '@/store/constants';
import type { Lang, Mode } from '@/lib/i18n';

export const useTerminalEffects = () => {
  const session = useTerminal((s) => s.session);

  useEffect(() => {
    useTerminal.getState().restore();
  }, []);

  useEffect(() => {
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
  }, [session]);

  useEffect(() => {
    const { setActive } = useTerminal.getState();
    const onScroll = () => setActive(activeFromViewport());
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = useTerminal.getState();
      const el = document.activeElement as HTMLElement | null;
      const typing = !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        return st.togglePalette();
      }
      if (e.altKey && /^Digit[1-4]$/.test(e.code)) {
        e.preventDefault();
        const [m, l] = ALL_COMBOS[Number(e.code.slice(5)) - 1].split('-') as [Mode, Lang];
        return st.setCombo(m, l);
      }
      if (st.closeConfirm) {
        if (e.key === 'Escape' || e.key.toLowerCase() === 'n') {
          e.preventDefault();
          return st.cancelClose();
        }
        if (e.key.toLowerCase() === 'y') {
          e.preventDefault();
          return st.confirmClose();
        }
        return;
      }
      if (e.key === 'Escape') {
        if (st.paletteOpen) return st.closePalette();
        if (st.helpOpen) return st.closeHelp();
        if (st.searchOpen) return st.closeSearch();
        if (st.expandedId !== null) return st.closeModal();
        if (st.cmdOpen) return st.closeCmd();
        if (st.plusOpen) return st.setPlusOpen(false);
        return;
      }
      if (e.key === '`' && st.mode !== 'human') {
        e.preventDefault();
        return st.toggleCmd();
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          e.preventDefault();
          return st.goTo(Math.min(st.active + 1, 4));
        case 'k':
        case 'ArrowUp':
          e.preventDefault();
          return st.goTo(Math.max(st.active - 1, 0));
        case 'g':
          return st.goTo(0);
        case 'G':
          return st.goTo(4);
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          return st.goTo(Number(e.key) - 1);
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
}
