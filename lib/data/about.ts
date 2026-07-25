import type { InfoItem } from '../types';

export const about = {
  paragraphs: [
    "I'm a Full-Stack Engineer with 4+ years of experience building and optimizing scalable web applications across B2B E-commerce and NGO domains. On the frontend I work in JavaScript/TypeScript with React and Next.js, building responsive multi-language UIs, real-time analytics dashboards, and dynamic workflows with Redux Toolkit and MUI.",
    'On the backend I architect modular services in Python with FastAPI and Django, designing REST and GraphQL APIs, WebSockets, and async task queues with ARQ, Celery and Redis. I work extensively with PostgreSQL (TimescaleDB, pgvector), Redis, MariaDB and SQLite, and modern ORMs like SQLAlchemy, Alembic and Tortoise ORM.',
    'I own the full DevOps lifecycle — Docker containerization, GitHub Actions CI/CD, and automated AWS deployments — and handle production diagnostics with Grafana, Sentry, Redash and CloudWatch. On the side I build LLM systems (RAG, QLoRA fine-tuning, pgvector) and framework-level tooling.',
  ],
  info: [
    { label: 'Name:', value: 'Yaroslav Yeromenko' },
    { label: 'Email:', value: 'kkmshbiu@protonmail.com', link: 'mailto:kkmshbiu@protonmail.com' },
    { label: 'Location:', value: 'Prague, Czech Republic · Remote' },
    { label: 'Languages:', value: 'Ukrainian (Native) | English (B2) | Slovak (B2) | Czech (B1)' },
  ] as InfoItem[],
};
