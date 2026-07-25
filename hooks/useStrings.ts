import { getStrings, type Strings } from '@/lib/i18n';
import type { Lang, Mode } from '@/lib/modes';
import { useTerminal } from '@/store/terminal';

let cached: { key: string; val: Strings } | null = null;

const stringsFor = (mode: Mode, lang: Lang): Strings => {
  const key = `${mode}-${lang}`;
  if (!cached || cached.key !== key) cached = { key, val: getStrings(mode, lang) };
  return cached.val;
};

export const useStrings = (): Strings => {
  const mode = useTerminal((s) => s.mode);
  const lang = useTerminal((s) => s.lang);
  return stringsFor(mode, lang);
};

export const useHuman = (): boolean => useTerminal((s) => s.mode === 'human');
