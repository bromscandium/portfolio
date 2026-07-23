import { create } from 'zustand';
import type { Category } from '@/lib/types';
import type { Combo, Lang, Mode } from '@/lib/i18n';

export const CMD = 'whoami --verbose';
const ALL_COMBOS: Combo[] = ['dev-en', 'dev-uk', 'human-en', 'human-uk'];
const PRE_DELAY = 1;
export const EXPAND_DELAY = 0.55;

// non-reactive module state (timers, drag, section elements)
const sectionEls: (HTMLElement | null)[] = [null, null, null, null, null];
let preT: ReturnType<typeof setTimeout> | null = null;
let hoverT: ReturnType<typeof setTimeout> | null = null;
let toastT: ReturnType<typeof setTimeout> | null = null;
let overId: number | null = null;
let dragFrom: Combo | null = null;
let closing = false;

export const setSectionEl = (i: number, el: HTMLElement | null) => {
  sectionEls[i] = el;
};

export const activeFromViewport = (): number => {
  const mid = window.innerHeight * 0.4;
  let act = 0;
  sectionEls.forEach((el, i) => {
    if (el && el.getBoundingClientRect().top <= mid) act = i;
  });
  return act;
};

interface TerminalState {
  mode: Mode;
  lang: Lang;
  tabsOpen: Combo[];
  active: number;
  cat: Category | 'all';
  hoverId: number | null;
  expandedId: number | null;
  closingM: boolean;
  picker: boolean;
  plusOpen: boolean;
  langHover: boolean;
  viewHover: boolean;
  typedN: number;
  helpOpen: boolean;
  searchOpen: boolean;
  cmdOpen: boolean;
  crtOn: boolean;
  toast: string | null;

  restore: () => void;
  setCombo: (m: Mode, l: Lang, fromPicker?: boolean) => void;
  goTo: (i: number) => void;
  setActive: (i: number) => void;
  setTyped: (n: number) => void;

  startDrag: (t: Combo) => void;
  dragOver: (t: Combo) => void;
  endDrag: () => void;
  closeTab: (t: Combo) => void;
  cycleTab: (dir: number) => void;
  openNewTab: () => void;
  unopenedCombos: () => Combo[];

  setCat: (c: Category | 'all') => void;
  cardEnter: (id: number) => void;
  cardLeave: (id: number) => void;
  cardClick: (id: number) => void;
  openProject: (id: number) => void;
  closeModal: () => void;

  setPlusOpen: (v: boolean) => void;
  setLangHover: (v: boolean) => void;
  setViewHover: (v: boolean) => void;
  toggleHelp: () => void;
  closeHelp: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleCmd: () => void;
  openCmd: () => void;
  closeCmd: () => void;
  setCrt: (v: boolean) => void;
  showToast: (msg: string) => void;
}

export const useTerminal = create<TerminalState>((set, get) => ({
  mode: 'dev',
  lang: 'en',
  tabsOpen: ['dev-en'],
  active: 0,
  cat: 'all',
  hoverId: null,
  expandedId: null,
  closingM: false,
  picker: false,
  plusOpen: false,
  langHover: false,
  viewHover: false,
  typedN: 0,
  helpOpen: false,
  searchOpen: false,
  cmdOpen: false,
  crtOn: false,
  toast: null,

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

  goTo: (i) => {
    const el = sectionEls[i];
    if (!el) return;
    const extra = window.matchMedia('(min-width: 768px)').matches ? 0 : 44;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 38 - extra, behavior: 'smooth' });
  },

  setActive: (i) => set((st) => (st.active !== i ? { active: i } : {})),
  setTyped: (n) => set({ typedN: n }),

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
    if (tabsOpen.length < 2) return;
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

  setCat: (c) => set({ cat: c, expandedId: null, hoverId: null }),

  cardEnter: (id) => {
    if (get().expandedId === id) return;
    overId = id;
    if (preT) clearTimeout(preT);
    if (hoverT) clearTimeout(hoverT);
    preT = setTimeout(() => {
      if (overId !== id) return;
      set({ hoverId: id });
      hoverT = setTimeout(() => {
        if (overId === id) set({ expandedId: id, hoverId: null });
      }, EXPAND_DELAY * 1000);
    }, PRE_DELAY * 1000);
  },
  cardLeave: (id) => {
    overId = null;
    if (preT) clearTimeout(preT);
    if (hoverT) clearTimeout(hoverT);
    set((st) => (st.hoverId === id ? { hoverId: null } : {}));
  },
  cardClick: (id) => {
    if (preT) clearTimeout(preT);
    if (hoverT) clearTimeout(hoverT);
    set((st) => ({ expandedId: st.expandedId === id ? null : id, hoverId: null }));
  },
  openProject: (id) => set({ expandedId: id }),
  closeModal: () => {
    if (closing || get().expandedId === null) return;
    closing = true;
    set({ closingM: true });
    setTimeout(() => {
      closing = false;
      set({ expandedId: null, closingM: false });
    }, 240);
  },

  setPlusOpen: (v) => set({ plusOpen: v }),
  setLangHover: (v) => set({ langHover: v }),
  setViewHover: (v) => set({ viewHover: v }),
  toggleHelp: () => set((st) => ({ helpOpen: !st.helpOpen })),
  closeHelp: () => set({ helpOpen: false }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleCmd: () => set((st) => ({ cmdOpen: !st.cmdOpen })),
  openCmd: () => set({ cmdOpen: true }),
  closeCmd: () => set({ cmdOpen: false }),
  setCrt: (v) => set({ crtOn: v }),
  showToast: (msg) => {
    set({ toast: msg });
    if (toastT) clearTimeout(toastT);
    toastT = setTimeout(() => set({ toast: null }), 1800);
  },
}));
