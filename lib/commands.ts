import { about, education, portfolio, skillMap } from './data';
import { slugify, type Lang, type Mode } from './i18n';

export type Tone = 'default' | 'muted' | 'error' | 'accent' | 'green' | 'cyan' | 'yellow';

export interface LsRow {
  perms: string;
  size: string;
  name: string;
  head?: boolean;
}

export interface CmdLine {
  text?: string;
  tone?: Tone;
  row?: LsRow;
  names?: string[];
}

export interface CmdContext {
  goTo: (i: number) => void;
  openProject: (id: number) => void;
  setMode: (m: Mode) => void;
  setLang: (l: Lang) => void;
  setCrt: (on: boolean) => void;
  clear: () => void;
  close: () => void;
}

const SECTIONS: Record<string, number> = {
  intro: 0,
  home: 0,
  experience: 1,
  exp: 1,
  skills: 2,
  stack: 2,
  projects: 3,
  work: 3,
  contact: 4,
};

export const COMMAND_NAMES = [
  'help',
  'clear',
  'cd',
  'ls',
  'la',
  'cat',
  'open',
  'theme',
  'view',
  'lang',
  'whoami',
  'neofetch',
  'echo',
  'sudo',
  'vim',
  'exit',
];

const NEOFETCH = [
  '      /\\          yaroslav@bromscandium',
  '     /  \\         ----------------------',
  '    /    \\        OS: Arch Linux x86_64',
  '   /      \\       Shell: zsh + spaceship',
  '  /   ..   \\      Role: Full-Stack Developer',
  ' /   |  |   \\     Stack: React · Next.js · Python',
  '/_-``    ``-_\\    Uptime: 2+ years · 19 projects',
];

function ok(text: string, tone: Tone = 'default'): CmdLine {
  return { text, tone };
}

function sizeOf(p: { description: string[]; technologies: string[] }): string {
  const chars = p.description.join(' ').length + p.technologies.join('').length;
  return `${(chars / 170).toFixed(1)}k`;
}

export function autocomplete(input: string): string | null {
  const parts = input.split(' ');
  if (parts.length === 1) {
    const m = COMMAND_NAMES.filter((c) => c.startsWith(parts[0]));
    return m.length === 1 ? m[0] + ' ' : null;
  }
  const [cmd, ...rest] = parts;
  const frag = rest.join(' ');
  let pool: string[] = [];
  if (cmd === 'cd') pool = Object.keys(SECTIONS);
  else if (cmd === 'open') pool = portfolio.map((p) => slugify(p.title));
  else if (cmd === 'cat') pool = ['about', 'education', 'skills'];
  else if (cmd === 'theme' || cmd === 'view') pool = ['dev', 'human'];
  else if (cmd === 'lang') pool = ['en', 'uk'];
  const m = pool.filter((c) => c.startsWith(frag));
  return m.length === 1 ? `${cmd} ${m[0]}` : null;
}

export function runCommand(raw: string, ctx: CmdContext): CmdLine[] {
  const input = raw.trim();
  if (!input) return [];
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(' ').toLowerCase();

  switch (cmd) {
    case 'help':
      return [
        ok('available commands:', 'muted'),
        ok('  cd <section>      jump to intro/experience/skills/projects/contact'),
        ok('  ls [category]     list projects (pet|hackathon|university|professional)'),
        ok('  cat <file>        about | education | skills'),
        ok('  open <project>    open a project window'),
        ok('  theme dev|human   switch view mode'),
        ok('  lang en|uk        switch language'),
        ok('  whoami · neofetch identity'),
        ok('  clear · exit      clear screen · close terminal'),
        ok('  type ? anywhere for keyboard shortcuts', 'muted'),
      ];

    case 'clear':
      ctx.clear();
      return [];

    case 'exit':
      ctx.close();
      return [];

    case 'cd': {
      if (!arg) return [ok('usage: cd <section>', 'muted')];
      const key = arg.replace(/^~\/?/, '');
      const i = SECTIONS[key];
      if (i === undefined) return [ok(`cd: no such section: ${arg}`, 'error')];
      ctx.goTo(i);
      return [ok(`→ ${key}`, 'cyan')];
    }

    case 'ls': {
      const list = arg ? portfolio.filter((p) => p.category === arg) : portfolio;
      if (!list.length) return [ok(`ls: no projects in "${arg}"`, 'error')];
      return [{ names: list.slice().sort((a, b) => b.id - a.id).map((p) => slugify(p.title)) }];
    }

    case 'l':
    case 'la':
    case 'll': {
      const list = arg ? portfolio.filter((p) => p.category === arg) : portfolio;
      if (!list.length) return [ok(`l: no projects in "${arg}"`, 'error')];
      const rows: CmdLine[] = [{ row: { head: true, perms: 'Permissions', size: 'Size', name: 'Name' } }];
      list
        .slice()
        .sort((a, b) => b.id - a.id)
        .forEach((p) => rows.push({ row: { perms: 'drwxr-xr-x', size: sizeOf(p), name: `${slugify(p.title)}/` } }));
      return rows;
    }

    case 'cat': {
      const f = arg.replace(/\.txt$/, '');
      if (f === 'about') return about.paragraphs.map((p) => ok(p));
      if (f === 'education') return education.map((e) => ok(`${e.period}  ${e.title} — ${e.detail}`));
      if (f === 'skills') return skillMap.map((r) => ok(`${r.region}: ${r.items.map((s) => s.name).join(', ')}`));
      return [ok(`cat: ${arg}: No such file`, 'error')];
    }

    case 'open': {
      if (!arg) return [ok('usage: open <project>', 'muted')];
      const p = portfolio.find((x) => slugify(x.title) === arg || x.title.toLowerCase() === arg) ?? portfolio.find((x) => slugify(x.title).includes(arg));
      if (!p) return [ok(`open: project not found: ${arg}`, 'error')];
      ctx.goTo(3);
      ctx.openProject(p.id);
      return [ok(`opening ${p.title}…`, 'cyan')];
    }

    case 'theme':
    case 'view':
      if (arg === 'dev' || arg === 'human') {
        ctx.setMode(arg);
        return [ok(`view → ${arg}`, 'green')];
      }
      return [ok('usage: theme dev|human', 'muted')];

    case 'lang':
      if (arg === 'en' || arg === 'uk') {
        ctx.setLang(arg);
        return [ok(`lang → ${arg}`, 'green')];
      }
      return [ok('usage: lang en|uk', 'muted')];

    case 'whoami':
      return [ok('yaroslav yeromenko · full-stack developer · remote · EU')];

    case 'neofetch':
      return NEOFETCH.map((t) => ok(t, 'accent'));

    case 'echo':
      return [ok(args.join(' '))];

    case 'crt':
      if (arg === 'on') {
        ctx.setCrt(true);
        return [ok('crt: enabled — welcome to 1984', 'green')];
      }
      if (arg === 'off') {
        ctx.setCrt(false);
        return [ok('crt: disabled', 'green')];
      }
      return [ok('usage: crt on|off', 'muted')];

    // easter eggs
    case 'sudo':
      if (arg.startsWith('hire-me') || arg.startsWith('hire')) {
        return [
          ok('[sudo] password for recruiter: ********', 'muted'),
          ok('✓ access granted. redirecting to contact…', 'green'),
        ];
      }
      return [ok(`${args[0] ?? ''}: Permission denied (nice try 😏)`, 'error')];

    case 'vim':
      return [ok("you're stuck in vim now. try :q! … just kidding. (Esc, then close)", 'yellow')];

    case 'rm':
      if (arg.includes('-rf') && arg.includes('/')) return [ok('rm: it is a good day to NOT delete everything. 🙂', 'yellow')];
      return [ok('rm: missing operand', 'error')];

    case 'git':
      if (args[0] === 'blame') return [ok('me. always me. 🫠', 'yellow')];
      if (args[0] === 'status') return [ok('On branch main · nothing to commit, working tree clean ✨', 'green')];
      return [ok(`git: '${args[0] ?? ''}' is not a git command`, 'error')];

    default:
      return [ok(`zsh: command not found: ${cmd}`, 'error')];
  }
}
