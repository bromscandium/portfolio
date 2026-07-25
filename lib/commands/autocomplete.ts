import { children, resolvePath } from './fs';
import { COMMAND_NAMES, findCommand } from './registry';
import type { Completion, CompletionOption, Seg } from './types';

const PATH_CMDS = new Set(['cd', 'ls', 'l', 'la', 'll']);

const fsComplete = (pwd: Seg, frag: string, dirsOnly: boolean): CompletionOption[] => {
  const slash = frag.lastIndexOf('/');
  const prefix = slash >= 0 ? frag.slice(0, slash + 1) : '';
  const stub = (slash >= 0 ? frag.slice(slash + 1) : frag).toLowerCase();
  const base = resolvePath(pwd, prefix === '' ? '.' : prefix);
  if (!base) return [];
  return children(base)
    .filter((e) => (!dirsOnly || e.dir) && e.name.toLowerCase().startsWith(stub))
    .map((e) => ({ value: `${prefix}${e.name}`, label: e.name, dir: e.dir }));
};

const wordComplete = (pool: CompletionOption[], frag: string): CompletionOption[] => {
  const sp = frag.lastIndexOf(' ');
  const base = sp >= 0 ? frag.slice(0, sp + 1) : '';
  const stub = sp >= 0 ? frag.slice(sp + 1) : frag;

  const seen = new Set<string>();
  const out: CompletionOption[] = [];
  for (const o of pool) {
    if (!o.value.startsWith(base)) continue;
    const remainder = o.value.slice(base.length);
    if (!remainder) continue;
    const next = remainder.indexOf(' ');
    const seg = next >= 0 ? remainder.slice(0, next) : remainder;
    if (!seg.startsWith(stub) || seen.has(seg)) continue;
    seen.add(seg);
    out.push({ value: base + seg, dir: next >= 0 ? false : o.dir });
  }
  return out;
};

export const autocomplete = (input: string, pwd: Seg = []): Completion => {
  const parts = input.split(' ');

  if (parts.length === 1) {
    return { base: '', options: COMMAND_NAMES.filter((c) => c.startsWith(parts[0])).map((value) => ({ value, dir: false })) };
  }

  const [cmd, ...rest] = parts;
  const frag = rest.join(' ');
  if (PATH_CMDS.has(cmd)) return { base: `${cmd} `, options: fsComplete(pwd, frag, cmd === 'cd') };

  const pool = findCommand(cmd)?.options?.() ?? [];
  return { base: `${cmd} `, options: wordComplete(pool, frag) };
};
