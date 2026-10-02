import { SECTION_LABELS, SHELL } from '@/lib/config';
import { PROJECT_COUNT } from '@/lib/data/projectCount';

export const SECTIONS: Record<string, number> = {
  ...Object.fromEntries(SECTION_LABELS.map((label, i) => [label.toLowerCase(), i])),
  home: 0,
  exp: 1,
  stack: 2,
  work: 3,
};

export const NEOFETCH = [
  '      /\\          yaroslav@bromscandium',
  '     /  \\         ----------------------',
  '    /    \\        OS: Arch Linux x86_64',
  `   /      \\       Shell: ${SHELL} + spaceship`,
  '  /   ..   \\      Role: Full-Stack Engineer',
  ' /   |  |   \\     Stack: Next.js · Python · Docker',
  `/_-\`\`    \`\`-_\\    Uptime: 4+ years · ${PROJECT_COUNT} projects`,
];
