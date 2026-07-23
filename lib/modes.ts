export const MODES = ['dev', 'human'] as const;
export const LANGS = ['en', 'uk'] as const;

export type Mode = (typeof MODES)[number];
export type Lang = (typeof LANGS)[number];
export type Combo = `${Mode}-${Lang}`;

export const COMBOS: Combo[] = MODES.flatMap((m) => LANGS.map((l) => `${m}-${l}` as Combo));

export const MODE_META: Record<Mode, { icon: string }> = {
  dev: { icon: '❯' },
  human: { icon: '✦' },
};

export const splitCombo = (c: Combo): [Mode, Lang] => c.split('-') as [Mode, Lang];
