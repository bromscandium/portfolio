export const MODES = ['dev', 'human'] as const;
export const LANGS = ['en', 'uk'] as const;
export const THEMES = ['dark', 'light'] as const;
export const ACCENTS = ['default', 'red', 'blue', 'green'] as const;

export type Mode = (typeof MODES)[number];
export type Lang = (typeof LANGS)[number];
export type Theme = (typeof THEMES)[number];
export type Accent = (typeof ACCENTS)[number];
export type Combo = `${Mode}-${Lang}`;

export const COMBOS: Combo[] = MODES.flatMap((m) => LANGS.map((l) => `${m}-${l}` as Combo));

export interface ModeMeta {
  icon: string;
  branch: string;
  primary: boolean;
  label: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export const MODE_META: Record<Mode, ModeMeta> = {
  dev: {
    icon: '❯',
    branch: 'developer',
    primary: true,
    label: { en: 'developer', uk: 'розробник' },
    desc: { en: 'full terminal UI — commands, containers, git log', uk: 'повний термінал — команди, контейнери, git log' },
  },
  human: {
    icon: '✦',
    branch: 'human-being',
    primary: false,
    label: { en: 'human-being', uk: 'людина' },
    desc: { en: 'plain language, no commands — same content', uk: 'проста мова, без команд — той самий контент' },
  },
};

export const BRANCH_TO_MODE: Record<string, Mode> = MODES.reduce(
  (acc, m) => {
    acc[m] = m;
    acc[MODE_META[m].branch] = m;
    return acc;
  },
  { develop: 'dev', dev: 'dev', main: 'human', master: 'human', human: 'human' } as Record<string, Mode>,
);

export const splitCombo = (c: Combo): [Mode, Lang] => c.split('-') as [Mode, Lang];

export const LOCALE_LABEL: Record<Lang, string> = {
  en: 'en_US.UTF-8',
  uk: 'uk_UA.UTF-8',
};

export const THEME_LABEL: Record<Theme, Record<Lang, string>> = {
  dark: { en: 'dark', uk: 'темна' },
  light: { en: 'light', uk: 'світла' },
};

export const isTheme = (v: string | null): v is Theme => v !== null && (THEMES as readonly string[]).includes(v);

export const isAccent = (v: string | null): v is Accent => v !== null && (ACCENTS as readonly string[]).includes(v);
