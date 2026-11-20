import type { PromptTool } from '../types';

export const heroPrompt: PromptTool[] = [
  { icon: '🍞︎', name: 'next', version: '16.4', color: 'text-fg' },
  { icon: '🐍︎', name: 'py', version: '3.15.0', color: 'text-yellow' },
  { icon: '🐳︎', name: 'docker', version: '29.9', color: 'text-cyan-img' },
];

export const heroRole = ['Next.js', 'Python', 'Docker'];
