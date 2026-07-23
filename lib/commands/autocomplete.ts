import { portfolio } from '../data';
import { slugify } from '../i18n';
import { COMMAND_NAMES, SECTIONS } from './constants';

export interface CompletionOption {
  value: string;
  dir: boolean;
}

export interface Completion {
  base: string;
  options: CompletionOption[];
}

const asOptions = (values: string[], dir: boolean): CompletionOption[] => values.map((value) => ({ value, dir }));

export const autocomplete = (input: string): Completion => {
  const parts = input.split(' ');

  if (parts.length === 1) {
    return { base: '', options: asOptions(COMMAND_NAMES.filter((c) => c.startsWith(parts[0])), false) };
  }

  const [cmd, ...rest] = parts;
  const frag = rest.join(' ');
  let pool: CompletionOption[] = [];
  if (cmd === 'cd') pool = asOptions(Object.keys(SECTIONS), true);
  else if (cmd === 'open') pool = asOptions(portfolio.map((p) => slugify(p.title)), true);
  else if (cmd === 'cat') pool = asOptions(['about', 'education', 'skills'], false);
  else if (cmd === 'docker') pool = asOptions(['ps'], false);
  else if (cmd === 'git') pool = asOptions(['log', 'tag', 'status', 'blame'], false);

  return { base: `${cmd} `, options: pool.filter((o) => o.value.startsWith(frag)) };
};
