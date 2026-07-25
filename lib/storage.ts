export const STORAGE_KEYS = {
  mode: 'brom_mode',
  lang: 'brom_lang',
  tabs: 'brom_tabs',
  history: 'brom_history',
} as const;

export const readLS = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeLS = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

export const removeLS = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {}
};
