import type { StateCreator } from 'zustand';
import type { TerminalState } from '../terminal';

let toastT: ReturnType<typeof setTimeout> | null = null;

export interface OverlaySlice {
  picker: boolean;
  plusOpen: boolean;
  langHover: boolean;
  viewHover: boolean;
  typedN: number;
  session: number;
  helpOpen: boolean;
  searchOpen: boolean;
  cmdOpen: boolean;
  toast: string | null;
  paletteOpen: boolean;

  setTyped: (n: number) => void;
  setPlusOpen: (v: boolean) => void;
  setLangHover: (v: boolean) => void;
  setViewHover: (v: boolean) => void;
  toggleHelp: () => void;
  openHelp: () => void;
  closeHelp: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleCmd: () => void;
  openCmd: () => void;
  closeCmd: () => void;
  showToast: (msg: string) => void;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
}

export const createOverlaySlice: StateCreator<TerminalState, [], [], OverlaySlice> = (set) => ({
  picker: false,
  plusOpen: false,
  langHover: false,
  viewHover: false,
  typedN: 0,
  session: 0,
  helpOpen: false,
  searchOpen: false,
  cmdOpen: false,
  toast: null,
  paletteOpen: false,

  setTyped: (n) => set({ typedN: n }),
  setPlusOpen: (v) => set({ plusOpen: v }),
  setLangHover: (v) => set({ langHover: v }),
  setViewHover: (v) => set({ viewHover: v }),
  toggleHelp: () => set((st) => ({ helpOpen: !st.helpOpen })),
  openHelp: () => set({ helpOpen: true }),
  closeHelp: () => set({ helpOpen: false }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleCmd: () => set((st) => ({ cmdOpen: !st.cmdOpen })),
  openCmd: () => set({ cmdOpen: true }),
  closeCmd: () => set({ cmdOpen: false }),
  showToast: (msg) => {
    set({ toast: msg });
    if (toastT) clearTimeout(toastT);
    toastT = setTimeout(() => set({ toast: null }), 1800);
  },
  openPalette: () => set({ paletteOpen: true, plusOpen: false }),
  closePalette: () => set({ paletteOpen: false }),
  togglePalette: () => set((st) => ({ paletteOpen: !st.paletteOpen })),
});
