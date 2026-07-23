import type { SkillRegion } from '../types';

export const skillMap: SkillRegion[] = [
  {
    region: 'Frontend',
    cid: 'f8ad40e2c76a',
    span: 5,
    items: [
      { name: 'JavaScript / TypeScript', y: 3 },
      { name: 'React', y: 3 },
      { name: 'Next.js', y: 2 },
      { name: 'SCSS', y: 3 },
      { name: 'Tailwind CSS / shadcn-ui', y: 2 },
      { name: 'Redux', y: 1 },
      { name: 'MUI', y: 1 },
    ],
  },
  {
    region: 'Backend',
    cid: 'a1b2c3d4e5f6',
    span: 4,
    items: [
      { name: 'Python', y: 3 },
      { name: 'FastAPI', y: 2 },
      { name: 'Node.js', y: 2 },
      { name: 'REST API', y: 3 },
      { name: 'GraphQL', y: 1 },
      { name: 'WebSockets', y: 1 },
      { name: 'Celery', y: 1 },
    ],
  },
  {
    region: 'Data',
    cid: '2f2022a9b8c7',
    span: 3,
    items: [
      { name: 'PostgreSQL', y: 2 },
      { name: 'Redis', y: 1 },
      { name: 'SQLite', y: 2 },
      { name: 'MariaDB', y: 1 },
      { name: 'SQLAlchemy', y: 1 },
      { name: 'Tortoise ORM', y: 2 },
    ],
  },
  {
    region: 'DevOps',
    cid: 'd0cke2926f01',
    span: 4,
    items: [
      { name: 'Docker', y: 2 },
      { name: 'GitHub Actions (CI/CD)', y: 2 },
      { name: 'AWS', y: 1 },
      { name: 'Linux (Arch/Debian)', y: 3 },
      { name: 'nginx', y: 1 },
      { name: 'Headless WordPress', y: 2 },
    ],
  },
  {
    region: 'Testing',
    cid: '7e57ab1e0042',
    span: 2,
    items: [
      { name: 'Pytest (Polyfactory)', y: 2 },
      { name: 'Jest', y: 1 },
    ],
  },
];
