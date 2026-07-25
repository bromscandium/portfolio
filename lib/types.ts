export type Category = 'pet' | 'hackathon' | 'university' | 'professional';

export type Option<T = string> = { key: T; label: string };

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  image: string;
  title: string;
  technologies: string[];
  live: string | null;
  github: string | null;
  links?: ProjectLink[];
  category: Category;
}
export interface InfoItem {
  label: string;
  value: string;
  link?: string;
}

export interface Job {
  hash: string;
  period: string;
  role: string;
  org: string;
  orgLink?: string;
  loc: string;
  summary: string;
  points: string[];
  links?: ProjectLink[];
}

export interface Education {
  title: string;
  detail: string;
  period: string;
}

export interface Hackathon {
  event: string;
  project: string;
  role: string;
  place: string;
  win: boolean;
}

export interface Counter {
  n: string;
  key: 'years' | 'projects' | 'hackathons' | 'contributions';
}

export interface SkillRegion {
  region: string;
  cid: string;
  span: number;
  items: { name: string; y: number }[];
}

export interface ContactLink {
  href: string;
  icon: 'envelope' | 'linkedin' | 'github';
  label: string;
}

export type IconName = 'envelope' | 'linkedin' | 'github' | 'folder';

export interface PromptTool {
  icon: string;
  name: string;
  version: string;
  color: string;
}
