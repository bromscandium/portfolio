import { TERMINAL_ROOT } from './config';
import { skillMap } from './data/skills';
import type { Lang, Mode } from './modes';
import type { Option } from './types';

export type { Mode, Lang, Combo } from './modes';

export const comboLabel = (combo: string, short: boolean): string => {
  const map: Record<string, string> = short
    ? {
        'dev-en': 'zsh · english',
        'dev-uk': 'zsh · українська',
        'human-en': 'plain english',
        'human-uk': 'простою українською',
      }
    : {
        'dev-en': `${TERMINAL_ROOT} — zsh`,
        'dev-uk': `${TERMINAL_ROOT} — zsh`,
        'human-en': 'portfolio',
        'human-uk': 'портфоліо',
      };
  return map[combo];
}

export interface Strings {
  navRoot: string;
  navNames: string[];
  heroName: [string, string];
  roleWord: string;
  statement: string;
  stmtColor: string;
  counterLabels: Record<'years' | 'projects' | 'hackathons' | 'contributions', string>;
  btnWork: string;
  btnContact: string;
  hExp: string;
  hSkills: string;
  hWork: string;
  hContact: string;
  hEdu: string;
  hHacks: string;
  skillsNote: string;
  contactNote: string;
  privateNote: string;
  workHint: string;
  catLabels: Option[];
  catBadge: Record<string, string>;
  regionName: (region: string) => string;
  yLabel: (y: number) => string;
  regionStatus: (maxY: number) => string;
  projCount: (n: number) => string;
  modalPath: (title: string, slug: string) => string;
  langValue: (hovering: boolean) => string;
  viewValue: (hovering: boolean) => string;
  lastUpdated: (iso: string) => string;
}

const regionUk: Record<string, string> = {
  Frontend: 'Фронтенд',
  Backend: 'Бекенд',
  Data: 'Дані',
  DevOps: 'DevOps',
  Testing: 'Тестування',
};

export const getStrings = (mode: Mode, lang: Lang): Strings => {
  const human = mode === 'human';
  const uk = lang === 'uk';

  return {
    navRoot: human ? (uk ? 'Портфоліо' : 'Portfolio') : TERMINAL_ROOT,
    navNames: human && uk ? ['вступ', 'досвід', 'стек', 'проєкти', 'контакти'] : ['intro', 'experience', 'skills', 'projects', 'contact'],
    heroName: uk ? ['ЯРОСЛАВ', 'ЄРЬОМЕНКО'] : ['YAROSLAV', 'YEROMENKO'],
    roleWord: uk ? 'FULL-STACK ІНЖЕНЕР' : 'FULL-STACK ENGINEER',
    statement:
      (human ? '' : '# ') +
      (uk
        ? '4+ роки будую масштабовані продукти від початку до кінця: React/Next.js, Python/FastAPI, автоматизовані DevOps-деплої. B2B E-commerce, НГО, LLM-системи. Prague · Remote.'
        : '4+ years shipping scalable products end-to-end: React/Next.js, Python/FastAPI, automated DevOps. B2B E-commerce, NGOs, LLM systems. Prague · Remote.'),
    stmtColor: human ? '#c4c4c4' : '#6f7a68',
    counterLabels: {
      years: uk ? 'роки досвіду' : 'yrs experience',
      projects: uk ? 'проєктів' : 'projects',
      hackathons: uk ? 'хакатонів' : 'hackathons',
      contributions: uk ? 'контрибуцій' : 'contributions',
    },
    btnWork: human ? (uk ? 'Дивитись проєкти' : 'View projects') : 'cd ~/projects',
    btnContact: human ? (uk ? 'Звʼязатися' : 'Contact me') : 'contact --open',
    hExp: uk ? 'Досвід' : 'Experience',
    hSkills: uk ? 'Навички — роки досвіду' : 'Skills — years of use',
    hWork: uk ? 'Проєкти' : 'Projects',
    hContact: uk ? 'Контакти' : 'Contact',
    hEdu: uk ? 'ОСВІТА' : 'EDUCATION',
    hHacks: uk ? 'ХАКАТОНИ' : 'HACKATHONS',
    skillsNote: human
      ? uk
        ? 'Числа = роки практичного досвіду'
        : 'Numbers = years of hands-on use'
      : uk
        ? `${skillMap.length} контейнерів запущено · STATUS = роки практичного досвіду`
        : `${skillMap.length} containers running · STATUS = years of hands-on use`,
    contactNote:
      (human ? '' : uk ? 'Зʼєднання встановлено. ' : 'Connection established. ') +
      (uk ? 'Відкритий до full-time · remote.' : 'Available for full-time · remote.'),
    privateNote: uk ? '// приватний проєкт — без публічних лінків' : '// private build — no public links',
    workHint: human
      ? uk
        ? 'наведи курсор на вікно — воно відкриється'
        : 'hover a window to view more'
      : uk
        ? '// hover = view more · наведи і потримай'
        : '// hover a window to view more',
    catLabels: human
      ? uk
        ? [
            { key: 'all', label: 'Всі' },
            { key: 'professional', label: 'Комерційні' },
            { key: 'hackathon', label: 'Хакатони' },
            { key: 'university', label: 'Університет' },
            { key: 'pet', label: 'Пет-проєкти' },
          ]
        : [
            { key: 'all', label: 'All' },
            { key: 'professional', label: 'Professional' },
            { key: 'hackathon', label: 'Hackathons' },
            { key: 'university', label: 'University' },
            { key: 'pet', label: 'Pet projects' },
          ]
      : [
          { key: 'all', label: '--all' },
          { key: 'professional', label: '--professional' },
          { key: 'hackathon', label: '--hackathons' },
          { key: 'university', label: '--university' },
          { key: 'pet', label: '--pet' },
        ],
    catBadge: uk
      ? { pet: 'пет', hackathon: 'хакатон', university: 'універ', professional: 'комерційний' }
      : { pet: 'pet', hackathon: 'hackathon', university: 'university', professional: 'professional' },
    regionName: (region: string) => (human ? (uk ? regionUk[region] ?? region : region) : `stack/${region.toLowerCase()}:latest`),
    yLabel: (y: number) => (human ? (uk ? `${y} р.` : `${y} y`) : `Up ${y.toFixed(1)}y`),
    regionStatus: (maxY: number) =>
      human
        ? uk
          ? `${maxY} ${maxY === 1 ? 'рік' : 'роки'}`
          : `${maxY} ${maxY === 1 ? 'year' : 'years'}`
        : `Up ${maxY} ${maxY === 1 ? 'year' : 'years'}`,
    projCount: (n: number) => (human ? `${n}${uk ? ' проєктів' : ' projects'}` : `${n} entries`),
    modalPath: (title: string, slug: string) => (human ? `${title}${uk ? ' — деталі' : ' — details'}` : `~/projects/${slug} — maximized`),
    langValue: (hovering: boolean) => (hovering ? (uk ? 'en_US.UTF-8' : 'uk_UA.UTF-8') : uk ? 'uk_UA.UTF-8' : 'en_US.UTF-8'),
    lastUpdated: (iso: string) => {
      const d = iso ? new Date(iso) : new Date(0);
      if (!human) return `updated ${Math.floor(d.getTime() / 1000)}`;
      const date = d.toLocaleDateString(uk ? 'uk-UA' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
      return `${uk ? 'оновлено' : 'updated'} ${date}`;
    },
    viewValue: (hovering: boolean) =>
      hovering
        ? human
          ? uk
            ? 'розробник'
            : 'developer'
          : uk
            ? 'людина'
            : 'human'
        : human
          ? uk
            ? 'людина'
            : 'human'
          : uk
            ? 'розробник'
            : 'developer',
  };
}

export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const CLOSE_COPY: Record<Lang, { title: string; q: string; desc: string; close: string; cancel: string }> = {
  en: {
    title: 'close session',
    q: 'are you sure you want to close this tab?',
    desc: 'This ends the session and asks you to pick a profile again.',
    close: 'close',
    cancel: 'cancel',
  },
  uk: {
    title: 'закрити сесію',
    q: 'справді закрити цю вкладку?',
    desc: 'Це завершить сесію і знову запропонує вибір профілю.',
    close: 'закрити',
    cancel: 'скасувати',
  },
};

export const PICKER_COPY: Record<
  Lang,
  { title: string; who: string; dev: string; devDesc: string; human: string; humanDesc: string; locale: string; note: string }
> = {
  en: {
    title: 'select session profile',
    who: 'who are you?',
    dev: 'developer',
    devDesc: 'full terminal UI — commands, containers, git log',
    human: 'visitor',
    humanDesc: 'plain language, no commands — same content',
    locale: 'locale',
    note: '// switch anytime with + in the tab bar',
  },
  uk: {
    title: 'вибір профілю сесії',
    who: 'хто ти?',
    dev: 'розробник',
    devDesc: 'повний термінал — команди, контейнери, git log',
    human: 'відвідувач',
    humanDesc: 'проста мова, без команд — той самий контент',
    locale: 'локаль',
    note: '// змінити будь-коли через + у таб-барі',
  },
};
