import type { StateCreator } from 'zustand';
import type { Combo, Lang, Mode } from '@/lib/i18n';
import type { TerminalState } from '../terminal';
import { ALL_COMBOS } from '../constants';

let dragFrom: Combo | null = null;

export interface SessionSlice {
  mode: Mode;
  lang: Lang;
  tabsOpen: Combo[];
  closeConfirm: boolean;
  restore: () => void;
  setCombo: (m: Mode, l: Lang, fromPicker?: boolean) => void;
  startDrag: (t: Combo) => void;
  dragOver: (t: Combo) => void;
  endDrag: () => void;
  closeTab: (t: Combo) => void;
  cycleTab: (dir: number) => void;
  openNewTab: () => void;
  unopenedCombos: () => Combo[];
  confirmClose: () => void;
  cancelClose: () => void;
}

export const createSessionSlice: StateCreator<TerminalState, [], [], SessionSlice> = (set, get) => ({
  mode: 'dev',
  lang: 'en',
  tabsOpen: ['dev-en'],
  closeConfirm: false,

  restore: () => {
    try {
      const m = localStorage.getItem('brom_mode');
      const l = localStorage.getItem('brom_lang');
      const savedLang: Lang = l === 'uk' || l === 'en' ? l : 'en';
      if (m === 'dev' || m === 'human') set({ mode: m, lang: savedLang, tabsOpen: [`${m}-${savedLang}` as Combo] });
      else set({ lang: savedLang, picker: true });
    } catch {}
  },

  setCombo: (m, l, fromPicker = false) => {
    const combo = `${m}-${l}` as Combo;
    set((st) => ({
      mode: m,
      lang: l,
      plusOpen: false,
      picker: fromPicker ? false : st.picker,
      tabsOpen: fromPicker ? [combo] : st.tabsOpen.includes(combo) ? st.tabsOpen : [...st.tabsOpen, combo],
    }));
    try {
      localStorage.setItem('brom_mode', m);
      localStorage.setItem('brom_lang', l);
    } catch {}
  },

  startDrag: (t) => {
    dragFrom = t;
  },
  dragOver: (t) => {
    if (!dragFrom || dragFrom === t) return;
    const from = dragFrom;
    set((st) => {
      const arr = st.tabsOpen.filter((x) => x !== from);
      arr.splice(arr.indexOf(t) + (st.tabsOpen.indexOf(from) < st.tabsOpen.indexOf(t) ? 1 : 0), 0, from);
      return { tabsOpen: arr };
    });
  },
  endDrag: () => {
    dragFrom = null;
  },

  closeTab: (t) => {
    const { tabsOpen, mode, lang, setCombo } = get();
    if (tabsOpen.length < 2) {
      set({ closeConfirm: true });
      return;
    }
    const left = tabsOpen.filter((x) => x !== t);
    set({ tabsOpen: left });
    if (`${mode}-${lang}` === t) {
      const [m, l] = left[0].split('-') as [Mode, Lang];
      setCombo(m, l);
    }
  },
  cycleTab: (dir) => {
    const { tabsOpen, mode, lang, setCombo } = get();
    const i = tabsOpen.indexOf(`${mode}-${lang}` as Combo);
    const [m, l] = tabsOpen[(i + dir + tabsOpen.length) % tabsOpen.length].split('-') as [Mode, Lang];
    setCombo(m, l);
  },
  openNewTab: () => {
    const un = get().unopenedCombos();
    if (un.length) {
      const [m, l] = un[0].split('-') as [Mode, Lang];
      get().setCombo(m, l);
    }
  },
  unopenedCombos: () => ALL_COMBOS.filter((c) => !get().tabsOpen.includes(c)),

  confirmClose: () => {
    try {
      localStorage.removeItem('brom_mode');
      localStorage.removeItem('brom_lang');
    } catch {}
    set({ mode: 'dev', lang: 'en', tabsOpen: ['dev-en'], closeConfirm: false, picker: true });
  },
  cancelClose: () => set({ closeConfirm: false }),
});
