import type { SkillRegion } from '../types';

export const skillMap: SkillRegion[] = [
  {
    region: 'Frontend',
    cid: 'f8ad40e2c76a',
    span: 4,
    items: [
      { name: 'JavaScript / TypeScript', y: 4 },
      { name: 'React', y: 4 },
      { name: 'Next.js', y: 3 },
      { name: 'Node.js', y: 3 },
      { name: 'Redux', y: 2 },
      { name: 'Tailwind CSS / shadcn/ui', y: 3 },
    ],
  },
  {
    region: 'Backend',
    cid: 'a1b2c3d4e5f6',
    span: 4,
    items: [
      { name: 'Python', y: 4 },
      { name: 'FastAPI', y: 3 },
      { name: 'Django', y: 2 },
      { name: 'REST API', y: 4 },
      { name: 'GraphQL', y: 2 },
      { name: 'WebSockets', y: 2 },
      { name: 'OAuth 2.0', y: 2 },
      { name: 'ARQ / Celery', y: 2 },
    ],
  },
  {
    region: 'Data',
    cid: '2f2022a9b8c7',
    span: 3,
    items: [
      { name: 'PostgreSQL (TimescaleDB, pgvector)', y: 3 },
      { name: 'Redis', y: 3 },
      { name: 'MariaDB', y: 2 },
      { name: 'SQLite', y: 3 },
      { name: 'SQLAlchemy / Alembic', y: 2 },
      { name: 'Tortoise ORM', y: 2 },
    ],
  },
  {
    region: 'AI',
    cid: 'a11a9b0cae5f',
    span: 1,
    items: [
      { name: 'PyTorch', y: 1 },
      { name: 'RAG', y: 1 },
      { name: 'QLoRA fine-tuning', y: 1 },
      { name: 'Ollama', y: 1 },
    ],
  },
  {
    region: 'DevOps',
    cid: 'd0cke2926f01',
    span: 4,
    items: [
      { name: 'Linux', y: 4 },
      { name: 'Docker', y: 3 },
      { name: 'AWS (S3, CloudWatch, SQS)', y: 2 },
      { name: 'CI/CD (GitHub Actions)', y: 3 },
      { name: 'Git', y: 4 },
      { name: 'Bun / uv / Poetry', y: 2 },
      { name: 'Grafana / Sentry / Redash', y: 2 },
    ],
  },
  {
    region: 'Testing',
    cid: '7e57ab1e0042',
    span: 3,
    items: [
      { name: 'Pytest', y: 3 },
      { name: 'Jest', y: 2 },
    ],
  },
];
