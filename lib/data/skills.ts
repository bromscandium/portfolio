import type { SkillRegion } from '../types';

export const skillMap: SkillRegion[] = [
  {
    region: 'Frontend',
    cid: 'f8ad40e2c76a',
    span: 4,
    items: [
      { name: 'JavaScript / TypeScript', y: 3.5 },
      { name: 'React', y: 3.5 },
      { name: 'Next.js', y: 2.5 },
      { name: 'Node.js', y: 2 },
      { name: 'Redux', y: 3.5 },
      { name: 'Tailwind CSS / shadcn/ui', y: 2.5 },
    ],
  },
  {
    region: 'Backend',
    cid: 'a1b2c3d4e5f6',
    span: 4,
    items: [
      { name: 'Python', y: 3.5 },
      { name: 'FastAPI', y: 2.5 },
      { name: 'Django', y: 1 },
      { name: 'REST API', y: 3.5 },
      { name: 'GraphQL', y: 1.5 },
      { name: 'WebSockets', y: 1.5 },
      { name: 'OAuth 2.0', y: 1.5 },
      { name: 'ARQ / Celery', y: 1 },
    ],
  },
  {
    region: 'Data',
    cid: '2f2022a9b8c7',
    span: 3,
    items: [
      { name: 'PostgreSQL (TimescaleDB, pgvector)', y: 3 },
      { name: 'Redis', y: 2.5 },
      { name: 'MariaDB', y: 1.5 },
      { name: 'SQLite', y: 2.5 },
      { name: 'SQLAlchemy / Alembic', y: 2 },
      { name: 'Tortoise ORM', y: 2 },
    ],
  },
  {
    region: 'AI',
    cid: 'a11a9b0cae5f',
    span: 1,
    items: [
      { name: 'PyTorch', y: 0.5 },
      { name: 'RAG', y: 0.5 },
      { name: 'QLoRA fine-tuning', y: 0.5 },
      { name: 'Ollama', y: 0.5 },
    ],
  },
  {
    region: 'DevOps',
    cid: 'd0cke2926f01',
    span: 4,
    items: [
      { name: 'Linux', y: 3 },
      { name: 'Docker', y: 2 },
      { name: 'AWS (S3, CloudWatch, SQS)', y: 1 },
      { name: 'CI/CD (GitHub Actions)', y: 1 },
      { name: 'Git', y: 3.5 },
      { name: 'Bun / uv / Poetry', y: 1.5 },
      { name: 'Grafana / Sentry / Redash', y: 0.5 },
    ],
  },
  {
    region: 'Testing',
    cid: '7e57ab1e0042',
    span: 3,
    items: [
      { name: 'Pytest', y: 2.5 },
      { name: 'Jest', y: 2 },
    ],
  },
];
