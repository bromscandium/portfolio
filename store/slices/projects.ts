import type { Category } from '@/lib/types';
import type { StateCreator } from 'zustand';
import { EXPAND_DELAY, PRE_DELAY } from '../constants';
import type { TerminalState } from '../terminal';

let preT: ReturnType<typeof setTimeout> | null = null;
let hoverT: ReturnType<typeof setTimeout> | null = null;
let overId: number | null = null;
let closing = false;

export interface ProjectsSlice {
  cat: Category | 'all';
  hoverId: number | null;
  expandedId: number | null;
  closingM: boolean;
  setCat: (c: Category | 'all') => void;
  cardEnter: (id: number) => void;
  cardLeave: (id: number) => void;
  cardClick: (id: number) => void;
  openProject: (id: number) => void;
  closeModal: () => void;
}

export const createProjectsSlice: StateCreator<TerminalState, [], [], ProjectsSlice> = (set, get) => ({
  cat: 'all',
  hoverId: null,
  expandedId: null,
  closingM: false,

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
});
