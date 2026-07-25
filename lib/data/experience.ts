import type { Job } from '../types';

export const experience: Job[] = [
  {
    hash: 'b6e2c11',
    period: 'Jun 2026 — Present',
    role: 'Software Support Engineer',
    org: 'UVIK Software',
    loc: 'Prague, Czech Republic (Remote)',
    points: [
      'System diagnostics and production issue resolution for a B2B E-commerce platform.',
      'Diagnosed and hotfixed anomalies in Django/Python services, tracing AWS CloudWatch logs to code-level issues.',
      'Verified data parity across PostgreSQL and Redis via Grafana monitoring and Redash SQL; aligned L3 support through Jira and Intercom.',
    ],
  },
  {
    hash: 'f8ad40e',
    period: 'May 2025 — Present',
    role: 'Full-Stack Engineer',
    org: 'Self-employed & Open Source',
    loc: 'Remote',
    points: [
      'Built BromiumJS — a signal-based reactive UI framework monorepo (TypeScript) with a custom JSX runtime, router and Vite plugin.',
      'Designed an end-to-end LLM orchestration engine (FastAPI, PyTorch, pgvector) with QLoRA fine-tuning of Gemma 3 4B.',
      'Migrated a legacy site to Next.js + Headless WordPress — 2× organic traffic (500 → 1,000 monthly) via Core Web Vitals & SEO.',
    ],
  },
  {
    hash: 'c76a1e2',
    period: 'Sep 2025 — Dec 2025',
    role: 'Full-Stack Engineer Intern',
    org: 'Meduzzen',
    loc: 'Prague, Czech Republic (Remote)',
    points: [
      'Built a responsive multi-language UI in Next.js 16, Redux Toolkit and MUI with dynamic quiz workflows and Auth0.',
      'Architected a modular FastAPI service (PostgreSQL, Redis) with a Unit of Work pattern, Docker and AWS deploys via GitHub Actions.',
      'Shipped Pytest and Jest suites in Agile workflows under senior code review.',
    ],
  },
  {
    hash: '2f2022a',
    period: 'Feb 2022 — Jul 2026',
    role: 'Software Engineer',
    org: 'Promote Ukraine NGO',
    loc: 'Brussels (Remote)',
    points: [
      'Led end-to-end delivery of key platforms: Promote Ukraine portal, Ukrainian Civil Society Hub and the Ukrainian Business Incubator in Belgium.',
      'Contributed to the Preventia health initiative, driving continuous improvements and community adoption.',
      'Automated internal workflows with SharePoint and Power Platform — ~30% less manual admin work.',
    ],
  },
];
