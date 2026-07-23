import { COMMAND_NAMES, findCommand } from './registry';
import type { Completion } from './types';

export const autocomplete = (input: string): Completion => {
  const parts = input.split(' ');

  if (parts.length === 1) {
    return { base: '', options: COMMAND_NAMES.filter((c) => c.startsWith(parts[0])).map((value) => ({ value, dir: false })) };
  }

  const [cmd, ...rest] = parts;
  const frag = rest.join(' ');
  const pool = findCommand(cmd)?.options?.() ?? [];
  return { base: `${cmd} `, options: pool.filter((o) => o.value.startsWith(frag)) };
};
