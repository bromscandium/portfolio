import { portfolio } from '../data';
import { slugify } from '../i18n';
import { SECTION_LABELS } from '../config';
import type { Seg } from './types';

export const SECTIONS_LOWER = SECTION_LABELS.map((l) => l.toLowerCase());
const slugs = (): string[] => portfolio.map((p) => slugify(p.title));

export const isDir = (segs: Seg): boolean => {
  if (segs.length === 0) return true; // ~
  if (segs.length === 1) return segs[0] === 'portfolio'; // ~/portfolio
  if (segs.length === 2) return segs[0] === 'portfolio' && SECTIONS_LOWER.includes(segs[1]);
  if (segs.length === 3) return segs[0] === 'portfolio' && segs[1] === 'projects' && slugs().includes(segs[2]);
  return false;
};

export const resolvePath = (pwd: Seg, arg: string): Seg | null => {
  const abs = /^(~|\/)/.test(arg);
  const rel = arg.replace(/^~/, '').replace(/^\//, '');
  const segs: Seg = abs ? [] : [...pwd];
  for (const part of rel.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      segs.pop();
      continue;
    }
    segs.push(part.toLowerCase());
  }
  return isDir(segs) ? segs : null;
};

export interface Entry {
  name: string;
  dir: boolean;
}

const CLOSE_SH: Entry = { name: 'close.sh', dir: false };

export const children = (segs: Seg): Entry[] => {
  if (segs.length === 0) return [{ name: 'portfolio', dir: true }, CLOSE_SH];
  if (segs.length === 1 && segs[0] === 'portfolio') return SECTIONS_LOWER.map((name) => ({ name, dir: true }));
  if (segs.length === 2 && segs[0] === 'portfolio' && segs[1] === 'projects') return slugs().map((name) => ({ name, dir: true }));
  return [];
};

export const displayPwd = (segs: Seg): string => `~${segs.length ? '/' + segs.join('/') : ''}`;
