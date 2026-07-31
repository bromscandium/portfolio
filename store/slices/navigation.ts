import { SECTION_LABELS } from '@/lib/config';
import type { StateCreator } from 'zustand';
import type { TerminalState } from '../terminal';

const sectionEls: (HTMLElement | null)[] = SECTION_LABELS.map(() => null);
let scrollEl: HTMLElement | null = null;

export const setSectionEl = (i: number, el: HTMLElement | null) => {
  sectionEls[i] = el;
};

export const setScrollEl = (el: HTMLElement | null) => {
  scrollEl = el;
};

export const getScrollEl = (): HTMLElement | null => scrollEl;

export const activeFromViewport = (): number => {
  const top = scrollEl ? scrollEl.getBoundingClientRect().top : 0;
  const mid = top + (window.innerHeight - top) * 0.35;
  let act = 0;
  sectionEls.forEach((el, i) => {
    if (el && el.getBoundingClientRect().top <= mid) act = i;
  });
  return act;
};

let prevSection = 0;

export interface NavSlice {
  active: number;
  setActive: (i: number) => void;
  goTo: (i: number) => void;
  goToPrev: () => void;
}

export const createNavSlice: StateCreator<TerminalState, [], [], NavSlice> = (set, get) => ({
  active: 0,
  setActive: (i) => set((st) => (st.active !== i ? { active: i } : {})),
  goTo: (i) => {
    const el = sectionEls[i];
    if (!el || !scrollEl) return;
    prevSection = get().active;
    const top = scrollEl.scrollTop + el.getBoundingClientRect().top - scrollEl.getBoundingClientRect().top - 12;
    scrollEl.scrollTo({ top, behavior: 'smooth' });
  },
  goToPrev: () => get().goTo(prevSection),
});
