import { TERMINAL_ROOT } from './config';

export type Mode = 'dev' | 'human';
export type Lang = 'en' | 'uk';
export type Combo = `${Mode}-${Lang}`;

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
  roleWord: string;
  statement: string;
  stmtColor: string;
  counterLabels: Record<'years' | 'projects' | 'hackathons' | 'win', string>;
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
  catLabels: { key: string; label: string }[];
  catBadge: Record<string, string>;
  regionName: (region: string) => string;
  yLabel: (y: number) => string;
  regionStatus: (maxY: number) => string;
  projCount: (n: number) => string;
  modalPath: (title: string, slug: string) => string;
  langValue: (hovering: boolean) => string;
  viewValue: (hovering: boolean) => string;
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
    navRoot: human ? (uk ? 'Ярослав' : 'Yaroslav') : TERMINAL_ROOT,
    navNames: human && uk ? ['вступ', 'досвід', 'стек', 'проєкти', 'контакти'] : ['intro', 'experience', 'skills', 'projects', 'contact'],
    roleWord: uk ? 'FULL-STACK РОЗРОБНИК' : 'FULL-STACK DEVELOPER',
    statement:
      (human ? '' : '# ') +
      (uk
        ? 'Розробляю продукти від початку до кінця: бекенд-архітектура, API та автоматизовані DevOps-деплої. EdTech, НГО, бізнес-операції. Remote · EU.'
        : 'I ship end-to-end: backend architecture, APIs and automated DevOps deployments. EdTech, NGOs, business ops. Remote · EU.'),
    stmtColor: human ? '#c4c4c4' : '#6f7a68',
    counterLabels: {
      years: uk ? 'роки досвіду' : 'yrs experience',
      projects: uk ? 'проєктів' : 'projects',
      hackathons: uk ? 'хакатонів' : 'hackathons',
      win: uk ? 'перемога' : 'win',
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
        ? '5 контейнерів запущено · STATUS = роки практичного досвіду'
        : '5 containers running · STATUS = years of hands-on use',
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
