import type { Job } from '../types';

export const experience: Job[] = [
  {
    hash: 'b6e2c11',
    period: 'Jun 2026 — Present',
    role: 'Software Support Engineer',
    org: 'UVIK Software',
    orgLink: 'https://www.linkedin.com/company/uvik-software/',
    loc: 'Remote',
    summary: 'Delivered technical system diagnostics, production issue resolution, and system integrity operations for a B2B E-commerce platform.',
    points: [
      'Production Diagnostics & Hotfixing: Investigated backend anomalies within Django and Python services, analyzing AWS CloudWatch log traces to identify code level issues and deploy production hotfixes.',
      'System Integrity & Data Validation: Ensured platform stability by monitoring system health in Grafana and running SQL queries in Redash to verify data parity across PostgreSQL and Redis caching layers.',
      'Cross-Functional Collaboration & Support: Partnered with core dev teams, product managers, and operations via Jira and Intercom to clarify L3 requirements, communicate technical context, and align cross-department workflows.',
    ],
  },
  {
    hash: 'f8ad40e',
    period: 'May 2025 — Present',
    role: 'Full-Stack Engineer',
    org: 'Self-employed & Open Source',
    orgLink: 'https://github.com/bromscandium',
    loc: 'Remote',
    summary: 'Delivered custom web platforms, AI systems, and framework-level tools across commercial, open-source, and academic initiatives.',
    points: [
      'Frontend Architecture & Tooling: Engineered a lightweight, signal-based reactive UI framework monorepo (TypeScript) featuring a custom JSX runtime, client-side router, and Vite plugin for fine-grained DOM reactivity.',
      'LLM Engineering & RAG Infrastructure: Designed an end-to-end LLM orchestration engine using FastAPI, PyTorch, and pgvector for a university initiative, implementing QLoRA fine-tuning on Gemma 3 4B using custom chat datasets for domain alignment.',
      'Platform Performance & Optimization: Spearheaded the migration of a legacy system to a Next.js and Headless WordPress architecture, doubling organic traffic from 500 to 1,000 monthly users through Core Web Vitals and SEO optimization.',
      'Asynchronous Backend Systems: Built high-throughput backend services using Python and FastAPI, leveraging ARQ and Redis for asynchronous task queues, caching, and real-time state management.',
    ],
    links: [
      { label: 'BromiumJS', href: 'https://github.com/bromscandium/bromiumjs' },
      { label: 'LLM engine', href: 'https://github.com/bromscandium/jan-diddy-llm' },
    ],
  },
  {
    hash: 'c76a1e2',
    period: 'Sep 2025 — Dec 2025',
    role: 'Full-Stack Engineer Intern',
    org: 'Meduzzen',
    orgLink: 'https://www.linkedin.com/company/meduzzen',
    loc: 'Remote',
    summary: 'Completed an intensive engineering program focused on building and shipping full-stack cloud applications under senior mentorship.',
    points: [
      'Frontend Engineering: Built a responsive, multi-language UI using Next.js 16, Redux Toolkit, and MUI, implementing dynamic quiz workflows, real-time analytics dashboards, and Auth0.',
      'Backend & Infrastructure: Architected a modular FastAPI service with PostgreSQL and Redis, implementing a Unit of Work pattern, Docker containerization, and automated AWS deployment pipelines via GitHub Actions.',
      'Engineering Process & Quality: Collaborated with senior engineers in Agile workflows, participating in code reviews and implementing Pytest and Jest suites to ensure reliability.',
    ],
    links: [
      { label: 'frontend', href: 'https://github.com/bromscandium/Quiz-App-FE' },
      { label: 'backend', href: 'https://github.com/bromscandium/Quiz-App-BE' },
    ],
  },
  {
    hash: '2f2022a',
    period: 'Feb 2022 — Jul 2026',
    role: 'Software Engineer',
    org: 'Promote Ukraine NGO',
    orgLink: 'https://www.promoteukraine.org/',
    loc: 'Brussels, Belgium',
    summary: 'Led digital transformation, web platform creation, and workflow automation for a major European NGO.',
    points: [
      'Web Architecture & Delivery: Managed the end-to-end development and deployment of key organizational platforms, including the active Promote Ukraine portal, Ukrainian Civil Society Hub, and Ukrainian Business Incubator in Belgium.',
      'Product Development & Support: Contributed to the development and ongoing maintenance of the Preventia health initiative web project, driving continuous platform improvements and community adoption.',
      'Internal Systems & Automation: Engineered a custom asset-tracking application and automated internal workflows via SharePoint and Power Platform, reducing manual administrative workload by ~30%.',
    ],
    links: [
      { label: 'Promote Ukraine portal', href: 'https://www.promoteukraine.org/' },
      { label: 'Ukrainian Civil Society Hub', href: 'https://www.ukrainianhub.eu/' },
      { label: 'Preventia', href: 'https://www.ukrainianhub.eu/preventia' },
    ],
  },
];
