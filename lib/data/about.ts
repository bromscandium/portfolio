import type { InfoItem } from '../types';

export const about = {
  paragraphs: [
    "I'm a Full-Stack Developer with solid experience in building modern web applications. On the frontend, I specialize in JavaScript/TypeScript using React and Next.js, focusing on creating fast, responsive UIs and modernizing legacy websites with Headless CMS architectures.",
    'On the backend, I work extensively with Python (FastAPI) and Node.js. I design robust APIs using REST and GraphQL, implement WebSockets for real-time features, and manage SQL/NoSQL databases including PostgreSQL, SQLite, Redis, and MariaDB. I also have experience building interactive chatbots and utilizing modern ORMs like SQLAlchemy and Tortoise ORM.',
    'I am highly proficient in the complete DevOps lifecycle, utilizing Docker for containerization and GitHub Actions for CI/CD pipelines. From deploying scalable applications on AWS and VPS/PaaS platforms to optimizing technical SEO and performance, I focus on delivering efficient, production-ready solutions.',
  ],
  info: [
    { label: 'Name:', value: 'Yaroslav Yeromenko' },
    { label: 'Email:', value: 'kkmshbiu@protonmail.com', link: 'mailto:kkmshbiu@protonmail.com' },
    { label: 'Location:', value: 'Remote' },
    { label: 'Languages:', value: 'Ukrainian (Native) | English (B2) | Slovak (B2)' },
  ] as InfoItem[],
};
