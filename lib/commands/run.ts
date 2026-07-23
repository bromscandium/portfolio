import { about, education, experience, hackathons, portfolio, skillMap } from '../data';
import { slugify } from '../i18n';
import { LINKS, NEOFETCH, SECTIONS } from './constants';
import type { CmdContext, CmdLine, Tone } from './types';

const CATEGORIES = ['pet', 'hackathon', 'university', 'professional'];

const ok = (text: string, tone: Tone = 'default'): CmdLine => {
  return { text, tone };
}

const sizeOf = (p: { description: string[]; technologies: string[] }): string => {
  const chars = p.description.join(' ').length + p.technologies.join('').length;
  return `${(chars / 170).toFixed(1)}k`;
}

export const runCommand = (raw: string, ctx: CmdContext): CmdLine[] => {
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
        ok('  pwd               print working directory'),
        ok('  git log           work history as commits'),
        ok('  git tag           hackathons'),
        ok('  docker ps         skill stack as running containers'),
        ok('  contact           jump to contact'),
        ok('  email · github · linkedin   open my links'),
        ok('  whoami · neofetch identity'),
        ok('  man               keyboard shortcuts'),
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
      const catArg = args.map((a) => a.toLowerCase()).find((a) => CATEGORIES.includes(a));
      const list = catArg ? portfolio.filter((p) => p.category === catArg) : portfolio;
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
      const p =
        portfolio.find((x) => slugify(x.title) === arg || x.title.toLowerCase() === arg) ??
        portfolio.find((x) => slugify(x.title).includes(arg));
      if (!p) return [ok(`open: project not found: ${arg}`, 'error')];
      ctx.goTo(3);
      ctx.openProject(p.id);
      return [ok(`opening ${p.title}…`, 'cyan')];
    }

    case 'docker': {
      if (args[0] !== 'ps') return [ok('usage: docker ps', 'muted')];
      ctx.goTo(2);
      const out: CmdLine[] = [ok('CONTAINER ID   IMAGE                          STATUS          NAMES', 'muted')];
      skillMap.forEach((r) => {
        const maxY = Math.max(...r.items.map((s) => s.y));
        const image = `stack/${r.region.toLowerCase()}:latest`;
        out.push(ok(`${r.cid}   ${image.padEnd(30)} ${`Up ${maxY} years`.padEnd(15)} ${r.region.toLowerCase()}_1`));
      });
      return out;
    }

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

    case 'contact':
      ctx.goTo(4);
      return [ok('Connection established. Available for full-time · remote.', 'green')];

    case 'email':
      ctx.openUrl(LINKS.email);
      return [ok('opening mail client…', 'cyan')];

    case 'github':
      ctx.openUrl(LINKS.github);
      return [ok('opening github.com/bromscandium…', 'cyan')];

    case 'linkedin':
      ctx.openUrl(LINKS.linkedin);
      return [ok('opening linkedin.com/in/yaroslav-yeromenko…', 'cyan')];

    case 'man':
      ctx.openHelp();
      return [ok('opening keybindings…', 'cyan')];

    case 'whoami':
      return [ok('yaroslav yeromenko · full-stack developer · remote · EU')];

    case 'neofetch':
      return NEOFETCH.map((t) => ok(t, 'accent'));

    case 'echo':
      return [ok(args.join(' '))];

    case 'sudo':
      if (arg.startsWith('hire')) {
        ctx.openUrl(`${LINKS.email}?subject=${encodeURIComponent("Let's work together")}&body=${encodeURIComponent('Hi Yaroslav,\n\n')}`);
        return [ok('[sudo] password for recruiter: ********', 'muted'), ok('✓ access granted. opening mail draft…', 'green')];
      }
      return [ok(`${args[0] ?? ''}: Permission denied (nice try 😏)`, 'error')];

    case 'vim':
      return [ok("you're stuck in vim now. try :q! … just kidding. (Esc, then close)", 'yellow')];

    case 'rm':
      if (arg.includes('-rf') && arg.includes('/')) return [ok('rm: it is a good day to NOT delete everything. 🙂', 'yellow')];
      return [ok('rm: missing operand', 'error')];

    default:
      return [ok(`zsh: command not found: ${cmd}`, 'error')];
  }
}
