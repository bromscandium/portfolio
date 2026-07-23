import { about, education, experience, hackathons, portfolio, skillMap } from './data';
import { slugify } from './i18n';

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
}

export interface CmdContext {
  goTo: (i: number) => void;
  openProject: (id: number) => void;
  openUrl: (url: string) => void;
  setCrt: (on: boolean) => void;
  clear: () => void;
  close: () => void;
}

const LINKS = {
  email: 'mailto:kkmshbiu@protonmail.com',
  linkedin: 'https://www.linkedin.com/in/yaroslav-yeromenko/',
  github: 'https://github.com/bromscandium',
};

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
  'pwd',
  'cat',
  'open',
  'git',
  'docker',
  'whoami',
  'neofetch',
  'echo',
  'email',
  'github',
  'linkedin',
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
  else if (cmd === 'docker') pool = ['ps'];
  else if (cmd === 'git') pool = ['log', 'tag', 'status', 'blame'];
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
        ok('  ls · l [cat]      list projects (pet|hackathon|university|professional)'),
        ok('  cat <file>        about | education | skills'),
        ok('  open <project>    open a project window'),
        ok('  pwd               print working directory'),
        ok('  git log           work history as commits'),
        ok('  git tag           hackathons'),
        ok('  docker ps         skill stack as running containers'),
        ok('  email · github · linkedin   open my links'),
        ok('  whoami · neofetch identity'),
        ok('  clear · exit      clear screen · close terminal'),
        ok('  switch view/lang from the status bar · ? for shortcuts', 'muted'),
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

    case 'ls':
    case 'l':
    case 'la':
    case 'll': {
      const catArg = args.find((a) => !a.startsWith('-'))?.toLowerCase();
      const list = catArg ? portfolio.filter((p) => p.category === catArg) : portfolio;
      if (!list.length) return [ok(`ls: cannot access '${catArg}': No such category`, 'error')];
      const rows: CmdLine[] = [{ row: { head: true, perms: 'Permissions', size: 'Size', name: 'Name' } }];
      list
        .slice()
        .sort((a, b) => b.id - a.id)
        .forEach((p) => rows.push({ row: { perms: 'drwxr-xr-x', size: sizeOf(p), name: `${slugify(p.title)}/` } }));
      return rows;
    }

    case 'pwd':
      return [ok('/home/yaroslav/portfolio')];

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

    case 'docker': {
      if (args[0] !== 'ps') return [ok("usage: docker ps", 'muted')];
      ctx.goTo(2);
      const out: CmdLine[] = [ok('CONTAINER ID   IMAGE                          STATUS          NAMES', 'muted')];
      skillMap.forEach((r) => {
        const maxY = Math.max(...r.items.map((s) => s.y));
        const image = `stack/${r.region.toLowerCase()}:latest`;
        out.push(ok(`${r.cid}   ${image.padEnd(30)} ${`Up ${maxY} years`.padEnd(15)} ${r.region.toLowerCase()}_1`));
      });
      return out;
    }

    case 'email':
      ctx.openUrl(LINKS.email);
      return [ok('opening mail client…', 'cyan')];

    case 'github':
      ctx.openUrl(LINKS.github);
      return [ok('opening github.com/bromscandium…', 'cyan')];

    case 'linkedin':
      ctx.openUrl(LINKS.linkedin);
      return [ok('opening linkedin.com/in/yaroslav-yeromenko…', 'cyan')];

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
        ctx.openUrl(`${LINKS.email}?subject=${encodeURIComponent("Let's work together")}&body=${encodeURIComponent('Hi Yaroslav,\n\n')}`);
        return [
          ok('[sudo] password for recruiter: ********', 'muted'),
          ok('✓ access granted. opening mail draft…', 'green'),
        ];
      }
      return [ok(`${args[0] ?? ''}: Permission denied (nice try 😏)`, 'error')];

    case 'vim':
      return [ok("you're stuck in vim now. try :q! … just kidding. (Esc, then close)", 'yellow')];

    case 'rm':
      if (arg.includes('-rf') && arg.includes('/')) return [ok('rm: it is a good day to NOT delete everything. 🙂', 'yellow')];
      return [ok('rm: missing operand', 'error')];

    case 'git':
      if (args[0] === 'log') {
        ctx.goTo(1);
        const out: CmdLine[] = [];
        experience.forEach((j, i) => {
          out.push(ok(`* ${j.hash}${i === 0 ? ' (HEAD -> main)' : ''} ${j.role} — ${j.org}`, i === 0 ? 'accent' : 'default'));
          out.push(ok(`|   ${j.period} · ${j.loc}`, 'muted'));
        });
        return out;
      }
      if (args[0] === 'tag') {
        ctx.goTo(1);
        return hackathons.map((h) => ok(`hackathons/${slugify(h.event)}   ${h.project}${h.win ? ' (WINNER)' : ''} · ${h.place}`, h.win ? 'green' : 'default'));
      }
      if (args[0] === 'blame') return [ok('me. always me. 🫠', 'yellow')];
      if (args[0] === 'status') return [ok('On branch main · nothing to commit, working tree clean ✨', 'green')];
      return [ok(`git: '${args[0] ?? ''}' is not a git command`, 'error')];

    default:
      return [ok(`zsh: command not found: ${cmd}`, 'error')];
  }
}
