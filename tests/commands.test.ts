import { beforeEach, describe, expect, test } from 'bun:test';
import { COMMANDS } from '../lib/commands/registry';
import { runCommand } from '../lib/commands/run';
import type { CmdContext, CmdLine } from '../lib/commands/types';

type Calls = Record<string, unknown[][]>;

const makeCtx = (pwd: string[] = ['portfolio']) => {
  const calls: Calls = {};
  const rec =
    (name: string) =>
    (...args: unknown[]) => {
      (calls[name] ??= []).push(args);
    };
  const ctx: CmdContext = {
    goTo: rec('goTo'),
    goToPrev: rec('goToPrev'),
    openProject: rec('openProject'),
    openUrl: rec('openUrl'),
    openHelp: rec('openHelp'),
    clear: rec('clear'),
    close: rec('close'),
    exitSession: rec('exitSession'),
    setContactClosed: rec('setContactClosed'),
    requestClose: rec('requestClose'),
    checkout: rec('checkout'),
    lang: 'en',
    pwd,
    setPwd: rec('setPwd'),
  };
  return { ctx, calls };
};

const text = (lines: CmdLine[]) => lines.map((l) => l.text ?? '').join('\n');

let calls: Calls;
let ctx: CmdContext;
beforeEach(() => {
  const c = makeCtx();
  calls = c.calls;
  ctx = c.ctx;
});

const run = (input: string, c: CmdContext = ctx) => text(runCommand(input, c));
const WARN = 'warning: ignoring';
const NOTFOUND = 'command not found';

// ─────────────────────────────────────────────── basics
describe('basics', () => {
  test('empty / whitespace input returns nothing', () => {
    expect(runCommand('', ctx)).toEqual([]);
    expect(runCommand('   ', ctx)).toEqual([]);
  });
  test('unknown command → command not found', () => {
    expect(run('definitelynope')).toContain(NOTFOUND);
    expect(run('definitelynope')).toContain('definitelynope');
  });
  test('help lists commands, resolves specific + hidden, errors on unknown', () => {
    expect(run('help')).toContain('available commands');
    expect(run('help git')).toContain('git');
    expect(run('help :q')).not.toContain('no such command');
    expect(run('help sudo')).toContain('easter egg');
    expect(run('help nonsense')).toContain('no such command');
  });
});

// ─────────────────────────────────────────────── filesystem
describe('filesystem commands', () => {
  test('cd valid / .. / ~ / no-arg update pwd', () => {
    run('cd projects');
    expect(calls.setPwd?.[0]).toEqual([['portfolio', 'projects']]);
    const a = makeCtx(['portfolio']);
    run('cd ..', a.ctx);
    expect(a.calls.setPwd?.[0]).toEqual([[]]);
    const b = makeCtx(['portfolio']);
    run('cd ~', b.ctx);
    expect(b.calls.setPwd?.[0]).toEqual([[]]);
  });
  test('cd invalid path errors, no pwd change', () => {
    expect(run('cd nope')).toContain('no such file or directory');
    expect(calls.setPwd).toBeUndefined();
  });
  test('cd warns on extra positional, not on valid', () => {
    expect(run('cd projects extra')).toContain(WARN);
    expect(run('cd projects')).not.toContain(WARN);
  });
  test('ls lists dir, errors on bad path, flag rules', () => {
    const out = runCommand('ls', ctx);
    expect(out.some((l) => l.row?.head)).toBe(true);
    expect(runCommand('ls ~', ctx).map((l) => l.row?.name)).toContain('portfolio/');
    expect(run('ls nope')).toContain('no such directory');
    expect(run('ls -la')).not.toContain(WARN);
    expect(run('ls -Z')).toContain(WARN);
  });
  test('pwd prints path, warns on args', () => {
    expect(run('pwd')).toContain('/home/yaroslav');
    expect(run('pwd -x')).toContain(WARN);
  });
  test('cat easter egg + error', () => {
    expect(run('cat cat.txt')).toContain('meow');
    expect(run('cat foo')).toContain('No such file');
  });
  test('ls projects/ lists project slugs with sizes', () => {
    const rows = runCommand('ls projects', ctx).filter((l) => l.row && !l.row.head);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((l) => !!l.row?.size)).toBe(true);
  });
});

// ─────────────────────────────────────────────── open / grep
describe('open', () => {
  test('resolves a project by slug and opens it', () => {
    expect(run('open portfolio')).toContain('opening');
    expect(calls.goTo?.[0]).toEqual([3]);
    expect(calls.openProject?.length).toBe(1);
  });
  test('fuzzy partial match resolves', () => {
    expect(run('open portfol')).toContain('opening');
  });
  test('no arg → usage; not found → error', () => {
    expect(run('open')).toContain('usage');
    expect(run('open zzzznope')).toContain('not found');
  });
  test('unknown flag warns, --live does not', () => {
    expect(run('open --bogus portfolio')).toContain(WARN);
    expect(run('open --live portfolio')).not.toContain(WARN);
  });
  test('--live opens the project live URL', () => {
    expect(run('open --live ua-consulting')).toContain('live');
    expect(calls.openUrl?.length).toBe(1);
  });
});

describe('grep', () => {
  test('match / no-match / usage', () => {
    expect(run('grep react').toLowerCase()).toContain('react');
    expect(run('grep zzzznomatch')).toContain('no matches');
    expect(run('grep')).toContain('usage');
  });
});

// ─────────────────────────────────────────────── git
describe('git', () => {
  test('bare git / --help → usage', () => {
    expect(run('git')).toContain('usage: git');
    expect(run('git --help')).toContain('usage: git');
  });
  test('unknown subcommand errors', () => {
    expect(run('git frobnicate')).toContain('is not a git command');
  });
  test('log scrolls to Experience; --graph differs from log', () => {
    run('git log');
    expect(calls.goTo?.[0]).toEqual([1]);
    expect(run('git log --graph')).not.toBe(run('git log'));
    expect(run('git lg')).not.toBe(run('git log'));
  });
  test('log garbage flags warn, valid do not', () => {
    expect(run('git log -kdsfnks')).toContain(WARN);
    expect(run('git log zzz')).toContain(WARN);
    expect(run('git log')).not.toContain(WARN);
    expect(run('git log --graph')).not.toContain(WARN);
  });
  test('checkout switches view; aliases and branch names', () => {
    run('git checkout developer');
    expect(calls.checkout?.[0]).toEqual(['dev']);
    const a = makeCtx();
    run('git checkout human-being', a.ctx);
    expect(a.calls.checkout?.[0]).toEqual(['human']);
    const b = makeCtx();
    run('git co main', b.ctx);
    expect(b.calls.checkout?.[0]).toEqual(['human']);
  });
  test('checkout missing / invalid branch errors', () => {
    expect(run('git checkout')).toContain('missing branch');
    expect(run('git checkout nope')).toContain('did not match');
  });
  test('tag lists namespaces + glob filter + bad glob', () => {
    expect(run('git tag -l work/*')).toContain('work/');
    expect(run('git tag -l study/*')).toContain('study/');
    expect(run('git tag -l hackathons/*')).toContain('hackathons/');
    expect(run('git tag -l zzz/*')).toContain('no tags matching');
  });
  test('all other subcommands + aliases resolve (no "not a git command")', () => {
    for (const sub of [
      'status',
      'st',
      'branch',
      'br',
      'commit',
      'commit -m hi',
      'push',
      'push --force',
      'pull',
      'fetch',
      'diff',
      'stash',
      'reset',
      'rebase',
      'remote',
      'config',
      'blame',
    ]) {
      expect(run(`git ${sub}`), sub).not.toContain('is not a git command');
    }
  });
  test('subcommands warn on trailing junk but not when clean', () => {
    expect(run('git status junk')).toContain(WARN);
    expect(run('git branch whatever')).toContain(WARN);
    expect(run('git checkout developer extra')).toContain(WARN);
    expect(run('git status')).not.toContain(WARN);
    expect(run('git push origin main')).not.toContain(WARN);
    expect(run('git commit -m hi')).not.toContain(WARN);
    expect(run('git reset --hard')).not.toContain(WARN);
  });
});

// ─────────────────────────────────────────────── docker
describe('docker', () => {
  test('bare / unknown sub', () => {
    expect(run('docker')).toContain('usage: docker');
    expect(run('docker frob')).toContain('is not a docker command');
  });
  test('ps / images / inspect scroll to Skills and render', () => {
    run('docker ps');
    expect(calls.goTo?.[0]).toEqual([2]);
    expect(run('docker ps')).toContain('CONTAINER ID');
    expect(run('docker images')).toContain('REPOSITORY');
    expect(run('docker inspect frontend')).toContain('stack/frontend');
  });
  test('inspect bad container / ps bad filter error', () => {
    expect(run('docker inspect zzz')).toContain('no such container');
    expect(run('docker ps --filter label=zzz')).toContain('no containers matching');
  });
  test('positional garbage warns, valid filter/flags do not', () => {
    expect(run('docker ps foo')).toContain(WARN);
    expect(run('docker images x')).toContain(WARN);
    expect(run('docker ps --filter label=frontend')).not.toContain(WARN);
    expect(run('docker ps -a')).not.toContain(WARN);
    expect(run('docker ps')).not.toContain(WARN);
  });
});

// ─────────────────────────────────────────────── contact / links
describe('contact & links', () => {
  test('contact list / --open / --close', () => {
    expect(run('contact')).toContain('email');
    const a = makeCtx();
    run('contact --open', a.ctx);
    expect(a.calls.setContactClosed?.[0]).toEqual([false]);
    expect(a.calls.goTo?.[0]).toEqual([4]);
    const b = makeCtx();
    run('contact --close', b.ctx);
    expect(b.calls.setContactClosed?.[0]).toEqual([true]);
  });
  test('contact unknown flag warns', () => {
    expect(run('contact --nonsense')).toContain(WARN);
  });
  test('email / github / linkedin open a url', () => {
    run('email');
    run('github');
    run('linkedin');
    expect(calls.openUrl?.length).toBe(3);
  });
  test('man opens help overlay', () => {
    run('man');
    expect(calls.openHelp?.length).toBe(1);
  });
});

// ─────────────────────────────────────────────── identity / info
describe('info commands', () => {
  test('whoami plain / verbose / bad flag', () => {
    expect(run('whoami')).toBe('yaroslav');
    expect(run('whoami -v')).toContain('full-stack engineer');
    expect(run('whoami --verbose')).toContain('full-stack engineer');
    expect(run('whoami --bogus')).toContain(WARN);
  });
  test('echo prints text and expands $vars', () => {
    expect(run('echo hi there')).toBe('hi there');
    expect(run('echo $USER')).toBe('yaroslav');
  });
  test('date / uname / uptime / neofetch return output', () => {
    for (const c of ['date', 'uname', 'uptime', 'neofetch']) {
      expect(run(c), c).not.toBe('');
      expect(run(c), c).not.toContain(NOTFOUND);
    }
    expect(run('uname -x')).toContain(WARN);
  });
});

// ─────────────────────────────────────────────── session / scripts
describe('session & scripts', () => {
  test('exit logs out; :q variants close the panel', () => {
    run('exit');
    expect(calls.exitSession?.length).toBe(1);
    for (const q of [':q', ':q!', ':wq']) {
      const c = makeCtx();
      run(q, c.ctx);
      expect(c.calls.close?.length, q).toBe(1);
    }
  });
  test('clear clears; ./close.sh needs root; ./hire-me redirects', () => {
    run('clear');
    expect(calls.clear?.length).toBe(1);

    expect(run('./close.sh')).toContain('no such file or directory'); // from ~/portfolio
    const root = makeCtx([]);
    run('./close.sh', root.ctx);
    expect(root.calls.requestClose?.length).toBe(1);

    const h = makeCtx();
    run('./hire-me', h.ctx);
    expect(h.calls.setContactClosed?.[0]).toEqual([false]);
    expect(h.calls.goTo?.[0]).toEqual([4]);
  });
});

// ─────────────────────────────────────────────── easter eggs
describe('easter eggs', () => {
  test('sudo variants', () => {
    const a = makeCtx();
    run('sudo hire', a.ctx);
    expect(a.calls.openUrl?.length).toBe(1);
    expect(run('sudo pacman -Syu')).toContain('Synchronizing');
    expect(run('sudo pacman')).toContain('no operation specified');
    expect(run('sudo whatever')).toContain('Permission denied');
  });
  test('arch package managers', () => {
    expect(run('pacman')).toContain('unless you are root');
    expect(run('yay')).toContain('AUR');
    expect(run('paru')).toContain('AUR');
  });
  test('reject-me needs sudo', () => {
    expect(run('reject-me')).toContain('try with sudo');
  });
  test('read-only fs jokes + missing operands', () => {
    expect(run('mkdir foo')).toContain('Read-only');
    expect(run('mkdir')).toContain('missing operand');
    expect(run('mkdir -Z foo')).toContain(WARN);
    expect(run('touch foo')).toContain('Read-only');
    expect(run('rm -rf /')).toContain('NOT delete');
    expect(run('rm')).toContain('missing operand');
  });
  test('fake process / net tools return output', () => {
    for (const c of ['ps', 'top', 'htop', 'ping', 'ping google.com', 'curl x', 'wget x', 'vim']) {
      expect(run(c), c).not.toContain(NOTFOUND);
      expect(run(c), c).not.toBe('');
    }
    expect(run('ping -c 4 localhost')).not.toContain(WARN);
  });
});

// ─────────────────────────────────────────────── registry ↔ behavior
describe('registry ↔ behavior sync', () => {
  const INTERCEPTED = new Set(['clear', 'tree', 'cmatrix', 'crt', 'history']);
  test('every non-hidden command has a behavior (no "command not found")', () => {
    for (const c of COMMANDS) {
      if (c.hidden || INTERCEPTED.has(c.name)) continue;
      expect(run(c.name), c.name).not.toContain(NOTFOUND);
    }
  });
  test('intercepted commands are registered but intentionally not in run.ts', () => {
    for (const name of INTERCEPTED) {
      expect(
        COMMANDS.some((c) => c.name === name),
        name,
      ).toBe(true);
    }
  });
});
