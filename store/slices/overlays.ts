import { syncFavicon } from '@/lib/favicon';
import type { Accent, Theme } from '@/lib/modes';
import { STORAGE_KEYS, writeLS } from '@/lib/storage';
import type { StateCreator } from 'zustand';
import type { TerminalState } from '../terminal';

let toastT: ReturnType<typeof setTimeout> | null = null;

const applyTheme = (theme: Theme) => {
  writeLS(STORAGE_KEYS.theme, theme);
  if (theme === 'light') document.documentElement.dataset.theme = 'light';
  else delete document.documentElement.dataset.theme;
  syncFavicon();
};

const applyAccent = (accent: Accent) => {
  writeLS(STORAGE_KEYS.accent, accent);
  if (accent === 'default') delete document.documentElement.dataset.accent;
  else document.documentElement.dataset.accent = accent;
  syncFavicon();
};

export interface OverlaySlice {
  picker: boolean;
  plusOpen: boolean;
  langHover: boolean;
  viewHover: boolean;
  themeHover: boolean;
  theme: Theme;
  accent: Accent;
  typedN: number;
  session: number;
  phase: 'boot' | 'unload' | 'run';
  helpOpen: boolean;
  searchOpen: boolean;
  cmdOpen: boolean;
  toast: string | null;
  paletteOpen: boolean;
  contactClosed: boolean;
  baited: boolean;
  hireAttempts: number;
  crtOn: boolean;
  matrixOn: boolean;

  setTyped: (n: number) => void;
  setContactClosed: (v: boolean) => void;
  setBaited: (v: boolean) => void;
  bumpHireAttempts: () => void;
  setCrt: (v: boolean) => void;
  toggleCrt: () => void;
  setMatrix: (v: boolean) => void;
  setPlusOpen: (v: boolean) => void;
  setLangHover: (v: boolean) => void;
  setViewHover: (v: boolean) => void;
  setThemeHover: (v: boolean) => void;
  setTheme: (v: Theme) => void;
  toggleTheme: () => void;
  setAccent: (v: Accent) => void;
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
  bootDone: () => void;
  unloadDone: () => void;
}

export const createOverlaySlice: StateCreator<TerminalState, [], [], OverlaySlice> = (set) => ({
  picker: false,
  plusOpen: false,
  langHover: false,
  viewHover: false,
  themeHover: false,
  theme: 'dark',
  accent: 'default',
  typedN: 0,
  session: 0,
  phase: 'boot',
  helpOpen: false,
  searchOpen: false,
  cmdOpen: false,
  toast: null,
  paletteOpen: false,
  contactClosed: false,
  baited: false,
  hireAttempts: 0,
  crtOn: false,
  matrixOn: false,

  setTyped: (n) => set({ typedN: n }),
  setContactClosed: (v) => set({ contactClosed: v }),
  setBaited: (v) => set({ baited: v }),
  bumpHireAttempts: () =>
    set((s) => {
      const hireAttempts = s.hireAttempts + 1;
      writeLS(STORAGE_KEYS.hireAttempts, String(hireAttempts));
      return { hireAttempts };
    }),
  setCrt: (v) => {
    writeLS(STORAGE_KEYS.crt, v ? '1' : '0');
    set({ crtOn: v });
  },
  toggleCrt: () =>
    set((st) => {
      writeLS(STORAGE_KEYS.crt, st.crtOn ? '0' : '1');
      return { crtOn: !st.crtOn };
    }),
  setMatrix: (v) => set({ matrixOn: v }),
  setPlusOpen: (v) => set({ plusOpen: v }),
  setLangHover: (v) => set({ langHover: v }),
  setViewHover: (v) => set({ viewHover: v }),
  setThemeHover: (v) => set({ themeHover: v }),
  setTheme: (v) => {
    applyTheme(v);
    set({ theme: v });
  },
  toggleTheme: () =>
    set((st) => {
      const theme: Theme = st.theme === 'light' ? 'dark' : 'light';
      applyTheme(theme);
      return { theme };
    }),
  setAccent: (v) => {
    applyAccent(v);
    set({ accent: v });
  },
  toggleHelp: () => set((st) => ({ helpOpen: !st.helpOpen, paletteOpen: false })),
  openHelp: () => set({ helpOpen: true, paletteOpen: false }),
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
  openPalette: () => set({ paletteOpen: true, plusOpen: false, helpOpen: false }),
  closePalette: () => set({ paletteOpen: false }),
  togglePalette: () => set((st) => ({ paletteOpen: !st.paletteOpen, helpOpen: false })),
  bootDone: () => set({ phase: 'run' }),
  unloadDone: () => set({ phase: 'run', picker: true }),
});
