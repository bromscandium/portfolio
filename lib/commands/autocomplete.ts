import { portfolio } from '../data';
import { slugify } from '../i18n';
import { COMMAND_NAMES, SECTIONS } from './constants';

export const autocomplete = (input: string): string | null => {
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
