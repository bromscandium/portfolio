import type { StateCreator } from 'zustand';
import type { TerminalState } from '../terminal';

const sectionEls: (HTMLElement | null)[] = [null, null, null, null, null];

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

export interface NavSlice {
  active: number;
  setActive: (i: number) => void;
  goTo: (i: number) => void;
}

export const createNavSlice: StateCreator<TerminalState, [], [], NavSlice> = (set) => ({
  active: 0,
  setActive: (i) => set((st) => (st.active !== i ? { active: i } : {})),
  goTo: (i) => {
    const el = sectionEls[i];
    if (!el) return;
    const extra = window.matchMedia('(min-width: 768px)').matches ? 0 : 44;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 38 - extra, behavior: 'smooth' });
  },
});
