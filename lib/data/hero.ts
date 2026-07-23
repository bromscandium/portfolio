import type { PromptTool } from '../types';

export const heroPrompt: PromptTool[] = [
  { icon: '🍞', name: 'next', version: '16.2', color: 'text-fg' },
  { icon: '🐍', name: 'py', version: '3.14.6', color: 'text-yellow' },
  { icon: '🐳', name: 'docker', version: '29.6', color: 'text-cyan-img' },
];

export const heroRole = ['Next.js', 'Python', 'Docker'];
