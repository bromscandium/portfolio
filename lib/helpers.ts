import type { Project, ProjectLink } from './types';

export function projectLinks(p: Project): ProjectLink[] {
  const links: ProjectLink[] = [];
  if (p.live) links.push({ label: 'live', href: p.live });
  if (p.links) links.push(...p.links);
  else if (p.github) links.push({ label: 'github', href: p.github });
  return links;
}
