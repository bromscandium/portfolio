import type { Combo, Lang, Mode } from '@/lib/i18n';
import { splitCombo } from '@/lib/modes';
import { STORAGE_KEYS, readLS, removeLS, writeLS } from '@/lib/storage';
import type { StateCreator } from 'zustand';
import { ALL_COMBOS } from '../constants';
import type { TerminalState } from '../terminal';

let dragFrom: Combo | null = null;

const persistTabs = (tabs: Combo[]) => writeLS(STORAGE_KEYS.tabs, JSON.stringify(tabs));

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
  activateNeighbor: (t: Combo) => void;
  removeTab: (t: Combo) => void;
  cycleTab: (dir: number) => void;
  openNewTab: () => void;
  checkout: (m: Mode) => void;
  unopenedCombos: () => Combo[];
  requestClose: () => void;
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
      const m = readLS(STORAGE_KEYS.mode);
      const l = readLS(STORAGE_KEYS.lang);
      const savedLang: Lang = l === 'uk' || l === 'en' ? l : 'en';
      if (readLS(STORAGE_KEYS.crt) === '1') set({ crtOn: true });
      const attempts = Number(readLS(STORAGE_KEYS.hireAttempts) || 0);
      if (attempts > 0) set({ hireAttempts: attempts, baited: true });
      if (m === 'dev' || m === 'human') {
        const combo = `${m}-${savedLang}` as Combo;
        const saved = JSON.parse(readLS(STORAGE_KEYS.tabs) || 'null');
        const tabs: Combo[] = Array.isArray(saved) && saved.length && saved.every((c) => ALL_COMBOS.includes(c)) && saved.includes(combo) ? saved : [combo];
        set({ mode: m, lang: savedLang, tabsOpen: tabs });
      } else {
        set({ lang: savedLang, picker: true });
      }
    } catch {}
  },

  setCombo: (m, l, fromPicker = false) => {
    const combo = `${m}-${l}` as Combo;
    set((st) => {
      const tabsOpen = fromPicker ? [combo] : st.tabsOpen.includes(combo) ? st.tabsOpen : [...st.tabsOpen, combo];
      persistTabs(tabsOpen);
      const reboot = fromPicker;
      return {
        mode: m,
        lang: l,
        plusOpen: false,
        picker: fromPicker ? false : st.picker,
        tabsOpen,
        ...(reboot ? { phase: 'boot' as const, session: st.session + 1 } : {}),
      };
    });
    writeLS(STORAGE_KEYS.mode, m);
    writeLS(STORAGE_KEYS.lang, l);
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
      persistTabs(arr);
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
    persistTabs(left);
    if (`${mode}-${lang}` === t) {
      const [m, l] = splitCombo(left[0]);
      setCombo(m, l);
    }
  },
  activateNeighbor: (t) => {
    const { tabsOpen, mode, lang, setCombo } = get();
    if (`${mode}-${lang}` !== t) return;
    const i = tabsOpen.indexOf(t);
    const neighbor = tabsOpen[i - 1] ?? tabsOpen[i + 1];
    if (neighbor) {
      const [m, l] = splitCombo(neighbor);
      setCombo(m, l);
    }
  },
  removeTab: (t) => {
    const left = get().tabsOpen.filter((x) => x !== t);
    set({ tabsOpen: left });
    persistTabs(left);
  },
  cycleTab: (dir) => {
    const { tabsOpen, mode, lang, setCombo } = get();
    const i = tabsOpen.indexOf(`${mode}-${lang}` as Combo);
    const [m, l] = splitCombo(tabsOpen[(i + dir + tabsOpen.length) % tabsOpen.length]);
    setCombo(m, l);
  },
  openNewTab: () => {
    const un = get().unopenedCombos();
    if (un.length) {
      const [m, l] = splitCombo(un[0]);
      get().setCombo(m, l);
    }
  },
  checkout: (m) => {
    const { mode, lang, tabsOpen } = get();
    if (m === mode) return;
    const from = `${mode}-${lang}` as Combo;
    const to = `${m}-${lang}` as Combo;
    const tabsOpen2 = tabsOpen.map((c) => (c === from ? to : c)).filter((c, i, a) => a.indexOf(c) === i);
    set({ mode: m, tabsOpen: tabsOpen2, plusOpen: false });
    persistTabs(tabsOpen2);
    writeLS(STORAGE_KEYS.mode, m);
  },
  unopenedCombos: () => ALL_COMBOS.filter((c) => !get().tabsOpen.includes(c)),

  confirmClose: () => {
    removeLS(STORAGE_KEYS.mode);
    removeLS(STORAGE_KEYS.lang);
    removeLS(STORAGE_KEYS.tabs);
    set({ mode: 'dev', lang: 'en', tabsOpen: ['dev-en'], closeConfirm: false, picker: false, typedN: 0, phase: 'unload' });
  },
  cancelClose: () => set({ closeConfirm: false }),
  requestClose: () => set({ closeConfirm: true }),
});
