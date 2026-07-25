import { COMMAND_NAMES, findCommand } from './registry';
import type { Completion, CompletionOption } from './types';

const PATH_PREFIXES = ['~/portfolio/', '~/'];

const pathComplete = (pool: CompletionOption[], frag: string): CompletionOption[] => {
  let prefix = '';
  let rel = frag;
  for (const p of PATH_PREFIXES) {
    if (frag.startsWith(p)) {
      prefix = p;
      rel = frag.slice(p.length);
      break;
    }
  }
  const slash = rel.lastIndexOf('/');
  const baseDir = slash >= 0 ? rel.slice(0, slash + 1) : '';
  const stub = slash >= 0 ? rel.slice(slash + 1) : rel;

  const seen = new Map<string, boolean>();
  for (const o of pool) {
    if (!o.value.startsWith(baseDir)) continue;
    const remainder = o.value.slice(baseDir.length);
    if (!remainder) continue;
    const next = remainder.indexOf('/');
    const seg = next >= 0 ? remainder.slice(0, next) : remainder;
    if (!seg.startsWith(stub)) continue;
    seen.set(seg, (seen.get(seg) ?? false) || next >= 0);
  }
  return [...seen].map(([seg, dir]) => ({ value: `${prefix}${baseDir}${seg}`, dir }));
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

export const autocomplete = (input: string): Completion => {
  const parts = input.split(' ');

  if (parts.length === 1) {
    return { base: '', options: COMMAND_NAMES.filter((c) => c.startsWith(parts[0])).map((value) => ({ value, dir: false })) };
  }

  const [cmd, ...rest] = parts;
  const frag = rest.join(' ');
  const spec = findCommand(cmd);
  const pool = spec?.options?.() ?? [];
  const options = spec?.path ? pathComplete(pool, frag) : wordComplete(pool, frag);
  return { base: `${cmd} `, options };
};
