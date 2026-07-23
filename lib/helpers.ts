import { portfolio } from './data/portfolio';
import { slugify } from './i18n';
import type { Category, Project, ProjectLink } from './types';

export const projectLinks = (p: Project): ProjectLink[] => {
  const links: ProjectLink[] = [];
  if (p.live) links.push({ label: 'live', href: p.live });
  if (p.links) links.push(...p.links);
  else if (p.github) links.push({ label: 'github', href: p.github });
  return links;
}

export const fuzzy = (q: string, text: string): boolean => {
  if (!q) return true;
  const query = q.toLowerCase();
  const hay = text.toLowerCase();
  let i = 0;
  for (const ch of hay) {
    if (ch === query[i]) i += 1;
    if (i === query.length) return true;
  }
  return false;
}

export const openUrl = (url: string): void => {
  if (url.startsWith('mailto:')) window.location.href = url;
  else window.open(url, '_blank', 'noopener,noreferrer');
}

export const projectPath = (title: string): string => `~/projects/${slugify(title)}`;

export const byCategory = (cat: Category | 'all'): Project[] =>
  cat === 'all' ? portfolio : portfolio.filter((p) => p.category === cat);
