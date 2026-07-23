import type { Job } from '../types';

export const experience: Job[] = [
  {
    hash: 'f8ad40e',
    period: 'May 2025 — Present',
    role: 'Full-Stack Developer',
    org: 'Self-employed',
    loc: 'Remote',
    points: [
      'Web apps and bot solutions for education and business clients.',
      'Migrated a legacy platform to Next.js + Headless WordPress — 2× organic traffic (500 → 1,000 monthly users).',
      'Scalable backends with FastAPI, Celery and Redis, monitored in real time via Flower.',
    ],
  },
  {
    hash: 'c76a1e2',
    period: 'Sep 2025 — Dec 2025',
    role: 'Full-Stack Developer Intern',
    org: 'Meduzzen',
    loc: 'Košice, Slovakia (Remote)',
    points: [
      'Built a full-stack app from scratch: Next.js, FastAPI, PostgreSQL.',
      'Containerized with Docker; automated AWS deployments via GitHub Actions.',
      'Unit & integration testing with Pytest and Jest under senior code review.',
    ],
  },
  {
    hash: '2f2022a',
    period: 'Feb 2022 — Present',
    role: 'Software Developer',
    org: 'Promote Ukraine NGO',
    loc: 'Brussels (Remote)',
    points: [
      'Led digital transformation for a major European NGO.',
      'Shipped the Ukrainian Civil Society Hub and the Ukrainian Business Incubator in Belgium.',
      'Automated internal workflows with SharePoint + PowerApps — ~30% less manual admin work.',
    ],
  },
];
