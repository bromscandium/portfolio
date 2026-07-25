import { education, experience, hackathons, portfolio, skillMap } from '../data';
import { JOB_COPY, PROJECT_DESC, slugify } from '../i18n';
import { projectPath } from '../helpers';
import { LINKS, SHELL } from '../config';
import { NEOFETCH } from './constants';
import { COMMANDS, findCommand } from './registry';
import { children, displayPwd, resolvePath } from './fs';
import type { CmdContext, CmdLine, Tone } from './types';

const ok = (text: string, tone: Tone = 'default'): CmdLine => {
  return { text, tone };
}

const sizeOf = (p: { id: number; technologies: string[] }): string => {
  const chars = (PROJECT_DESC[p.id]?.en.join(' ').length ?? 0) + p.technologies.join('').length;
  return `${(chars / 170).toFixed(1)}k`;
}

export const runCommand = (raw: string, ctx: CmdContext): CmdLine[] => {
  const input = raw.trim();
  if (!input) return [];
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(' ').toLowerCase();

  const script = cmd.replace(/^\.\//, '');
  if (script === 'close.sh' || script.endsWith('/close.sh')) {
    const dirArg = script.slice(0, -'close.sh'.length).replace(/\/+$/, '');
    const dir = dirArg ? resolvePath(ctx.pwd, dirArg) : ctx.pwd;
    if (!dir || dir.length !== 0) return [ok(`${cmd}: no such file or directory`, 'error')];
    ctx.requestClose();
    return [ok('❯ closing terminal…', 'yellow')];
  }

  switch (cmd) {
    case 'help': {
      if (arg) {
        const spec = findCommand(arg);
        return spec && !spec.hidden ? [ok(`${spec.name.padEnd(10)} ${spec.usage}`)] : [ok(`help: no such command: ${arg}`, 'error')];
      }
      return [
        ok('available commands:', 'muted'),
        ...COMMANDS.filter((c) => !c.hidden).map((c) => ok(`  ${c.name.padEnd(10)} ${c.usage}`)),
        ok('  help <command> for details · ? for shortcuts', 'muted'),
      ];
    }

    case 'clear':
      ctx.clear();
      return [];

    case 'exit':
      ctx.exitSession();
      return [ok('logout', 'muted')];

    case ':q':
    case ':q!':
    case ':wq':
      ctx.close();
      return [];

    case 'cd': {
      const dest = resolvePath(ctx.pwd, arg.trim() || '~');
      if (!dest) return [ok(`cd: no such file or directory: ${arg}`, 'error')];
      ctx.setPwd(dest);
      return [ok(`❯ ${displayPwd(dest)}`, 'cyan')];
    }

    case 'ls':
    case 'l':
    case 'la':
    case 'll': {
      const raw = args.find((a) => !a.startsWith('-')) ?? '';
      const dir = resolvePath(ctx.pwd, raw || '.');
      if (!dir) return [ok(`ls: cannot access '${raw}': no such directory`, 'error')];
      const entries = children(dir);
      if (!entries.length) return [ok('total 0', 'muted')];
      const inProjects = dir.length === 2 && dir[0] === 'portfolio' && dir[1] === 'projects';
      const head: CmdLine = { row: { head: true, perms: 'Permissions', size: 'Size', name: 'Name' } };
      const rows = entries.map((e) => {
        const proj = e.dir && inProjects ? portfolio.find((x) => slugify(x.title) === e.name) : undefined;
        return {
          row: {
            perms: e.dir ? 'drwxr-xr-x' : '-rwxr-xr-x',
            size: proj ? sizeOf(proj) : e.dir ? '—' : '0.1k',
            name: e.dir ? `${e.name}/` : e.name,
          },
        };
      });
      return [head, ...rows];
    }

    case 'pwd':
      return [ok(`/home/yaroslav${ctx.pwd.length ? '/' + ctx.pwd.join('/') : ''}`)];

    case 'cat': {
      const f = arg.replace(/\.txt$/, '');
      if (f === 'cat') {
        return [
          ok('   /\\_/\\', 'yellow'),
          ok('  ( o.o )', 'yellow'),
          ok('   > ^ <', 'yellow'),
          ok('  meow — nothing to see here. try `ls`, `git log` or `git tag`.', 'muted'),
        ];
      }
      return [ok(`cat: ${arg || 'cat.txt'}: No such file (hint: cat cat.txt)`, 'error')];
    }

    case 'open': {
      const live = args.includes('--live');
      const q = args.filter((a) => !a.startsWith('-')).join(' ').toLowerCase();
      if (!q) return [ok('usage: open [--live] <project>', 'muted')];
      const p =
        portfolio.find((x) => slugify(x.title) === q || x.title.toLowerCase() === q) ??
        portfolio.find((x) => slugify(x.title).includes(q));
      if (!p) return [ok(`open: project not found: ${q}`, 'error')];
      if (live) {
        if (!p.live) return [ok(`open: ${p.title} has no live URL`, 'error')];
        ctx.openUrl(p.live);
        return [ok(`opening ${p.title} (live)…`, 'cyan')];
      }
      ctx.goTo(3);
      ctx.openProject(p.id);
      return [ok(`opening ${p.title}…`, 'cyan')];
    }

    case 'grep': {
      if (!arg) return [ok('usage: grep <term>', 'muted')];
      const term = arg;
      const hits: CmdLine[] = [];
      portfolio.forEach((p) => {
        if (`${p.title} ${p.technologies.join(' ')} ${p.category} ${PROJECT_DESC[p.id]?.en.join(' ') ?? ''}`.toLowerCase().includes(term)) {
          hits.push(ok(`${projectPath(p.title)}: ${p.technologies.slice(0, 4).join(', ')}`));
        }
      });
      skillMap.forEach((r) => {
        const m = r.items.filter((s) => s.name.toLowerCase().includes(term));
        if (m.length) hits.push(ok(`stack/${r.region.toLowerCase()}: ${m.map((s) => s.name).join(', ')}`, 'cyan'));
      });
      return hits.length ? hits : [ok(`grep: no matches for "${term}"`, 'muted')];
    }

    case 'date':
      return [ok(new Date().toString())];

    case 'uname':
      return [ok('Linux bromscandium 6.6.0-arch x86_64 GNU/Linux')];

    case 'uptime':
      return [ok('up 4+ years,  1 user,  load average: 0.19, 0.42, 0.69', 'muted')];

    case 'docker': {
      const sub = args[0];
      if (!sub) return [ok('usage: docker <ps|images|inspect> [--filter label=<region>]', 'muted')];

      if (sub === 'inspect') {
        const target = (args[1] ?? '').replace(/^stack\//, '').replace(/:latest$/, '').toLowerCase();
        const r = skillMap.find((x) => x.region.toLowerCase() === target);
        if (!r) return [ok(`docker inspect: no such container (try: ${skillMap.map((x) => x.region.toLowerCase()).join(', ')})`, 'error')];
        ctx.goTo(2);
        const maxY = Math.max(...r.items.map((s) => s.y));
        return [
          ok(`stack/${r.region.toLowerCase()}:latest`, 'cyan'),
          ok(`  Id:      ${r.cid}`, 'muted'),
          ok(`  Status:  Up ${maxY} years`, 'muted'),
          ok(`  Names:   ${r.region.toLowerCase()}_1`, 'muted'),
          ok('  Layers:'),
          ...r.items.map((s, i) => ok(`  ${i === r.items.length - 1 ? '└─' : '├─'} ${s.name.padEnd(28)} ${s.y.toFixed(1)}y`)),
        ];
      }

      if (sub === 'ps') {
        const fi = args.findIndex((a) => a === '--filter');
        const raw = fi >= 0 ? (args[fi + 1] ?? '') : '';
        const label = raw.replace(/^['"]?label=/, '').replace(/['"]$/, '').toLowerCase();
        let regions = skillMap;
        if (label && label !== 'stack') regions = skillMap.filter((r) => r.region.toLowerCase() === label);
        if (!regions.length) {
          return [ok(`docker: no containers matching label "${label}" (try: ${skillMap.map((r) => r.region.toLowerCase()).join(', ')})`, 'error')];
        }
        ctx.goTo(2);
        const out: CmdLine[] = [ok('CONTAINER ID   IMAGE                          STATUS          NAMES', 'muted')];
        regions.forEach((r) => {
          const maxY = Math.max(...r.items.map((s) => s.y));
          const image = `stack/${r.region.toLowerCase()}:latest`;
          out.push(ok(`${r.cid}   ${image.padEnd(30)} ${`Up ${maxY} years`.padEnd(15)} ${r.region.toLowerCase()}_1`));
        });
        return out;
      }

      if (sub === 'images') {
        ctx.goTo(2);
        const out: CmdLine[] = [ok('REPOSITORY            TAG       IMAGE ID       SIZE', 'muted')];
        skillMap.forEach((r) => {
          out.push(ok(`${`stack/${r.region.toLowerCase()}`.padEnd(21)} ${'latest'.padEnd(9)} ${r.cid.slice(0, 12)}   ${r.items.length * 37}MB`));
        });
        return out;
      }

      return [ok(`docker: '${sub}' is not a docker command`, 'error')];
    }

    case 'git':
      if (args[0] === 'log') {
        ctx.goTo(1);
        const out: CmdLine[] = [];
        experience.forEach((j, i) => {
          const jc = JOB_COPY[j.hash]?.en;
          out.push(ok(`* ${j.hash}${i === 0 ? ' (HEAD -> main)' : ''} ${jc?.role ?? ''} — ${j.org}`, i === 0 ? 'accent' : 'default'));
          out.push(ok(`|   ${j.period} · ${jc?.loc ?? ''}`, 'muted'));
        });
        return out;
      }
      if (args[0] === 'tag') {
        ctx.goTo(1);
        const tags: { name: string; line: CmdLine }[] = [
          ...experience.map((j) => {
            const jc = JOB_COPY[j.hash]?.en;
            const name = `work/${slugify(j.org)}`;
            return { name, line: ok(`${name}   ${jc?.role ?? ''} · ${j.period}`, 'accent') };
          }),
          ...education.map((e) => {
            const name = `study/${slugify(e.title)}`;
            return { name, line: ok(`${name}   ${e.title} · ${e.period}`, 'cyan') };
          }),
          ...hackathons.map((h) => {
            const name = `hackathons/${slugify(h.event)}`;
            return { name, line: ok(`${name}   ${h.project}${h.win ? ' (WINNER)' : ''} · ${h.place}`, h.win ? 'green' : 'default') };
          }),
        ];
        const pattern = args.slice(1).find((a) => !a.startsWith('-'));
        const rx = pattern ? new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`) : null;
        const shown = rx ? tags.filter((t) => rx.test(t.name)) : tags;
        if (!shown.length) return [ok(`git tag: no tags matching '${pattern}'`, 'muted')];
        return shown.map((t) => t.line);
      }
      if (args[0] === 'blame') return [ok('me. always me. 🫠', 'yellow')];
      if (args[0] === 'status') return [ok('On branch main · nothing to commit, working tree clean ✨', 'green')];
      return [ok(`git: '${args[0] ?? ''}' is not a git command`, 'error')];

    case 'contact': {
      if (args.includes('--open')) {
        ctx.setContactClosed(false);
        ctx.goTo(4);
        return [ok('Connection established. Available for full-time · remote.', 'green')];
      }
      if (args.includes('--close')) {
        ctx.setContactClosed(true);
        return [ok('Connection closed — contact section unmounted. (run `contact --open` to reconnect)', 'yellow')];
      }
      return [
        ok(`email      ${LINKS.email.replace('mailto:', '')}`, 'cyan'),
        ok(`github     ${LINKS.github.replace('https://', '')}`, 'cyan'),
        ok(`linkedin   ${LINKS.linkedin.replace('https://', '')}`, 'cyan'),
        ok('❯ contact --open to jump to the section · --close to hang up', 'muted'),
      ];
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

    case 'man':
      ctx.openHelp();
      return [ok('opening keybindings…', 'cyan')];

    case 'whoami':
      if (args.includes('--verbose') || args.includes('-v')) {
        return [
          ok('yaroslav yeromenko · full-stack engineer'),
          ok('prague · remote · open to full-time', 'muted'),
          ok('stack: React · Next.js · Python · FastAPI · Docker', 'muted'),
          ok('4+ yrs · 17 projects · 10+ hackathons · 1.5k+ commits', 'muted'),
        ];
      }
      return [ok('yaroslav')];

    case 'neofetch':
      return NEOFETCH.map((t) => ok(t, 'accent'));

    case 'echo': {
      const vars: Record<string, string> = { $USER: 'yaroslav', $SHELL: `/bin/${SHELL}`, $HOME: '/home/yaroslav', $PWD: '/home/yaroslav/portfolio' };
      return [ok(args.map((a) => vars[a] ?? a).join(' '))];
    }

    case 'sudo':
      if (arg.startsWith('hire')) {
        ctx.openUrl(`${LINKS.email}?subject=${encodeURIComponent("Let's work together")}&body=${encodeURIComponent('Hi Yaroslav,\n\n')}`);
        return [ok('[sudo] password for recruiter: ********', 'muted'), ok('✓ access granted. opening mail draft…', 'green')];
      }
      return [ok(`${args[0] ?? ''}: Permission denied (nice try)`, 'error')];

    case 'vim':
      return [ok("you're stuck in vim now. try :q! … just kidding. (Esc, then close)", 'yellow')];

    case 'rm':
      if (arg.includes('-rf') && arg.includes('/')) return [ok('rm: it is a good day to NOT delete everything. 🙂', 'yellow')];
      return [ok('rm: missing operand', 'error')];

    default:
      return [ok(`${SHELL}: command not found: ${cmd}`, 'error')];
  }
}
