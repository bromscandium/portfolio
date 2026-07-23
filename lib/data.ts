export type Category = 'pet' | 'hackathon' | 'university' | 'professional';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  image: string;
  title: string;
  description: string[];
  technologies: string[];
  live: string | null;
  github: string | null;
  links?: ProjectLink[];
  category: Category;
}

export function projectLinks(p: Project): ProjectLink[] {
  const links: ProjectLink[] = [];
  if (p.live) links.push({ label: 'live', href: p.live });
  if (p.links) links.push(...p.links);
  else if (p.github) links.push({ label: 'github', href: p.github });
  return links;
}

export interface InfoItem {
  label: string;
  value: string;
  link?: string;
}

export interface Job {
  hash: string;
  period: string;
  role: string;
  org: string;
  loc: string;
  points: string[];
}

export interface Education {
  title: string;
  detail: string;
  period: string;
}

export interface Hackathon {
  event: string;
  project: string;
  role: string;
  place: string;
  win: boolean;
}

export interface Counter {
  n: string;
  key: 'years' | 'projects' | 'hackathons' | 'win';
}

export interface SkillRegion {
  region: string;
  cid: string;
  span: number;
  items: { name: string; y: number }[];
}

export interface ContactLink {
  href: string;
  icon: keyof typeof icons;
  label: string;
}

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

export const contacts: ContactLink[] = [
  { href: 'mailto:kkmshbiu@protonmail.com', icon: 'envelope', label: 'Email me' },
  { href: 'https://www.linkedin.com/in/yaroslav-yeromenko/', icon: 'linkedin', label: 'LinkedIn' },
  { href: 'https://github.com/bromscandium', icon: 'github', label: 'GitHub' },
];

export const portfolio: Project[] = [
  {
    id: 19,
    image: '/bromiumjs.webp',
    title: 'BromiumJS',
    description: [
      'BromiumJS is a modern JavaScript/TypeScript UI framework built for a bachelor thesis, unifying design patterns drawn from Vue, React, and Next.js into a single toolkit.',
      'It offers proxy-based reactivity (ref, reactive, computed, watch), JSX with a virtual DOM and efficient diffing, and dual hook systems supporting both React-style and Vue-style lifecycle hooks.',
      'It adds Next.js-style file-based routing with dynamic segments and ships a first-class Vite plugin with HMR, organized as a modular monorepo. The same demo site is rebuilt across React, Vue, Angular and BromiumJS for a direct comparison.',
    ],
    technologies: ['TypeScript', 'Vite', 'JSX', 'Virtual DOM'],
    live: null,
    github: null,
    links: [
      { label: 'bromiumjs: code', href: 'https://github.com/bromscandium/bromiumjs' },
      { label: 'bromiumjs demo', href: 'https://bromscandium.github.io/bromiumjs-website/' },
      { label: 'bromiumjs site: code', href: 'https://github.com/bromscandium/bromiumjs-website' },
      { label: 'react demo', href: 'https://bromscandium.github.io/react-website/' },
      { label: 'react site: code', href: 'https://github.com/bromscandium/react-website' },
      { label: 'vue demo', href: 'https://bromscandium.github.io/vue-website/' },
      { label: 'vue site: code', href: 'https://github.com/bromscandium/vue-website' },
      { label: 'angular demo', href: 'https://bromscandium.github.io/angular-website/' },
      { label: 'angular site: code', href: 'https://github.com/bromscandium/angular-website' },
    ],
    category: 'university',
  },
  {
    id: 18,
    image: '/scrollix.webp',
    title: 'Scrollix',
    description: [
      'Scrollix is a mobile game platform built in Godot that reimagines the TikTok feed as a vertical stack of short, swipeable mini-games instead of videos.',
      'Players swipe between six original games — Brick Breaker, Stack, TapTiming, SharkSurfer, Piano Tiles and Connect — while the app tracks best scores, play counts, likes and leaderboard rankings.',
      'It features a local account system, persistent likes, adjustable audio, and isolated per-game rendering via SubViewports to keep games from interfering with one another.',
    ],
    technologies: ['Godot 4.6', 'GDScript', 'Android'],
    live: null,
    github: 'https://github.com/bromscandium/scrollix',
    category: 'hackathon',
  },
  {
    id: 17,
    image: '/walletapp.webp',
    title: 'Wallet App',
    description: [
      'A streamlined, mobile-first wallet interface consisting of a main dashboard and a dedicated transaction details view, designed to demonstrate core React principles.',
      'Focused on clean code architecture and efficient state management, ensuring a seamless user experience across a high-performance two-page navigation flow.',
      'Prioritized precision in UI/UX implementation and comprehensive unit testing over unnecessary complexity, showcasing a production-ready approach to a focused feature set.',
    ],
    technologies: ['React', 'TypeScript', 'Jest', 'Tailwind CSS'],
    live: 'https://bromscandium.github.io/wallet-app/',
    github: 'https://github.com/bromscandium/wallet-app',
    category: 'pet',
  },
  {
    id: 16,
    image: '/intelmarket.webp',
    title: 'Vigil8',
    description: [
      'An advanced OSINT and Market Analysis platform developed as a collaborative Data Science project to track blockchain activity and web-based intelligence.',
      'Built custom scrapers and analytical modules to process large datasets, enabling deep-dive forensics into holder behavior and trading patterns.',
      'Features a high-performance architecture using FastAPI and Next.js 15 to generate automated investigative reports and real-time market metrics.',
    ],
    technologies: ['Next.js', 'FastAPI', 'Python', 'Celery', 'TimescaleDB', 'Redis', 'Tailwind CSS', 'pandas'],
    live: null,
    github: null,
    category: 'hackathon',
  },
  {
    id: 15,
    image: '/uaconsulting.webp',
    title: 'UA Consulting',
    description: [
      'A legal consulting corporate website, completely rebuilt from a traditional WordPress builder into a high-performance Next.js application.',
      'The architecture utilizes WordPress strictly as a headless CMS, separating content management from the frontend presentation layer via GraphQL.',
      'The primary goal of this migration was to significantly boost loading speeds, optimize SEO rankings, and enhance the overall user experience.',
    ],
    technologies: ['Next.js', 'GraphQL', 'Node.js', 'Docker', 'Headless WordPress'],
    live: 'https://www.uaconsulting.eu',
    github: null,
    category: 'professional',
  },
  {
    id: 14,
    image: '/sparrowiot.webp',
    title: 'Sparrow IoT',
    description: [
      'A full-stack IoT monitoring platform for managing ESP32 and Raspberry Pi Pico devices.',
      'The system collects real-time sensor data (temperature, humidity, gas) via MQTT and visualizes it instantly using WebSocket updates.',
      'Designed for end-to-end device management, featuring automatic device registration, threshold-based email alerts, and local data buffering.',
    ],
    technologies: ['Next.js', 'Python', 'FastAPI', 'Docker', 'CI/CD', 'nginx', 'PostgreSQL'],
    live: null,
    github: 'https://github.com/bromscandium/sparrow-iot',
    category: 'university',
  },
  {
    id: 13,
    image: '/sparrowai.webp',
    title: 'Sparrow AI Builder',
    description: [
      'A platform built for small and medium-sized businesses to create, configure, and deploy AI-powered agents without complex development.',
      'Utilizes OpenAI models to handle natural language communications and automate workflows via integrations with WhatsApp, Instagram, and website chat bubbles.',
      'Aims to boost productivity and reduce operational costs by automating routine tasks like order processing and employee selection.',
    ],
    technologies: ['Next.js', 'Python', 'FastAPI', 'Docker', 'OpenAI API', 'PostgreSQL'],
    live: null,
    github: 'https://github.com/NikStor03/prosto-telekom',
    category: 'hackathon',
  },
  {
    id: 12,
    image: '/strapinext.webp',
    title: 'Strapi+Next.js',
    description: [
      'Small pet project with combining Next and Strapi as CMS.',
      "Main Purpose of it is understanding how to create own CMS (it's popular tech).",
      'Basically, I was trying to understand how it works and how to create a connection between website and content system.',
    ],
    technologies: ['Next.js', 'Strapi', 'Tailwind', 'Vitest'],
    live: null,
    github: 'https://github.com/bromscandium/strapi-usage',
    category: 'pet',
  },
  {
    id: 11,
    image: '/tretiakovconsulting.webp',
    title: 'Tretiakov Consulting',
    description: [
      'This is a self-made site on the WordPress builder, and previous projects were in groups.',
      'The site itself provides legal consulting services in various fields.',
      'This project was built from the very beginning: from connecting the hosting to the design structure.',
    ],
    technologies: ['WordPress'],
    live: 'https://tretiakov.consulting/',
    github: null,
    category: 'professional',
  },
  {
    id: 10,
    image: '/dest.webp',
    title: 'dEST',
    description: [
      'A decentralized real estate marketplace and the winning project of the ETHBratislava hackathon on the EURØP Challenge track.',
      'It allows users to list, buy, and auction properties as NFTs, with transactions powered by Solidity smart contracts.',
      'The platform ensures transparency, reduces commission fees, and simplifies the property exchange process through blockchain technology.',
    ],
    technologies: ['React', 'Python', 'Solidity', 'MetaMask', 'Uvicorn', 'MapLibre', 'SCSS', 'Webpack'],
    live: null,
    github: null,
    category: 'hackathon',
  },
  {
    id: 9,
    image: '/whelm.webp',
    title: 'Whelm',
    description: [
      'Whelm is a project created for the Cassini Hackathon — a disaster response simulator powered by Copernicus data.',
      'It features an interactive React frontend and a Python backend with AI integration via the OpenAI API.',
      'The app is fully containerized with Docker, showcasing real-time map interactions, decision-making, and gamified UX.',
    ],
    technologies: ['React', 'Python', 'OpenAI', 'MapLibre', 'Docker', 'SCSS', 'FastAPI'],
    live: null,
    github: 'https://github.com/bromscandium/cassini-hackathon-komorebi',
    category: 'hackathon',
  },
  {
    id: 8,
    image: '/jigsawsudoku.webp',
    title: 'Jigsaw Sudoku',
    description: [
      'This is my second university project, creating a game in Java, Spring, and part of the frontend.',
      'I chose Angular as the frontend because I wanted to kill two birds with one stone (Learn Java and Typescript)',
      'The game is small, but the biggest focus was the design.',
    ],
    technologies: ['Java', 'Spring Boot', 'Angular', 'REST API', 'SCSS', 'NodeJS'],
    live: null,
    github: 'https://github.com/bromscandium/jigsawsudoku',
    category: 'university',
  },
  {
    id: 7,
    image: '/digitalkraj.webp',
    title: 'DigitalnyKraj (DigitalLand)',
    description: [
      'At a hackathon in Žilina, Slovakia, my team and I developed a prototype of a web portal for community residents.',
      'We used the most available technologies and libraries to develop our project.',
      'My task was to create the front-end part together with my friend, where I took the main responsibility.',
    ],
    technologies: ['React', 'SCSS', 'JSON-Server', 'Leaflet', 'Gemini API', 'FastAPI'],
    live: null,
    github: 'https://github.com/bromscandium/digitalny-kraj',
    category: 'hackathon',
  },
  {
    id: 6,
    image: '/weather-ai.webp',
    title: 'WeatherAI',
    description: [
      'A playful weather app that shows current conditions and a random tip based on your city.',
      'More of a developer sandbox: focused on API usage, data handling, and project structure rather than content relevance.',
      'Built to explore frontend–backend interaction and how external services integrate into modern web projects.',
    ],
    technologies: ['React', 'SASS', 'Node.js', 'OpenWeatherMap API', 'OpenAI API'],
    live: null,
    github: 'https://github.com/bromscandium/weather-ai',
    category: 'pet',
  },
  {
    id: 5,
    image: '/valli_cover.webp',
    title: 'Valli',
    description: [
      'An experimental project exploring visual design and user flow.',
      'Focuses on animated interfaces and modular components.',
      'This project was made in cooperation with backender, my role is frontend',
    ],
    technologies: ['React', 'SASS', 'Python', 'Docker', 'OpenAI API', 'Django', 'FastAPI'],
    live: null,
    github: 'https://github.com/bromscandium/BioGrow/tree/main',
    category: 'hackathon',
  },
  {
    id: 4,
    image: '/profile_cover.webp',
    title: 'Own Profile',
    description: [
      'Personal website to showcase my projects, experiences, and skills.',
      'Fully built with Next.js and smooth UX in mind, styled as an authentic developer terminal.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'UX/UI', 'Web Design'],
    live: null,
    github: 'https://github.com/bromscandium/portfolio/tree/main',
    category: 'professional',
  },
  {
    id: 3,
    image: '/bot_cover.webp',
    title: 'Jan Diddy',
    description: [
      'Jan Diddy is an asynchronous Telegram bot built for a Ukrainian university community, combining group-management tooling with an AI chat persona.',
      'It provides administrative controls (bans, mutes, a multi-level warning system), content filtering with homoglyph/leetspeak normalization, and info services like schedules, rules and semester progress.',
      'Its AI persona passively follows the chat and generates in-character replies through a separate fine-tuned LLM engine (jan-diddy-llm), built with a QLoRA/ORPO dataset pipeline and served over FastAPI.',
    ],
    technologies: ['Python', 'python-telegram-bot', 'FastAPI', 'PostgreSQL', 'Tortoise ORM', 'Redis', 'QLoRA', 'Docker'],
    live: null,
    github: null,
    links: [
      { label: 'github: jan-diddy', href: 'https://github.com/bromscandium/jan-diddy' },
      { label: 'github: jan-diddy-llm', href: 'https://github.com/bromscandium/jan-diddy-llm' },
    ],
    category: 'university',
  },
  {
    id: 2,
    image: '/astro_cover.webp',
    title: 'Astro',
    description: [
      'Astro Game was my first serious project during university.',
      'A runner-style game where a spaceship dodges comets and survives as long as possible.',
      'It also features an in-game economic system.',
    ],
    technologies: ['C', 'NCurses'],
    live: null,
    github: 'https://github.com/bromscandium/astro',
    category: 'university',
  },
  {
    id: 1,
    image: '/hub_cover.webp',
    title: 'Ukrainian Hub',
    description: [
      'A site for Promote Ukraine to showcase projects, cultural events, and advocacy efforts.',
      'Supports communication and outreach for an NGO.',
    ],
    technologies: ['Wix Studio'],
    live: 'https://ukrainianhub.eu',
    github: null,
    category: 'professional',
  },
];

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

export const education: Education[] = [
  { title: 'Technical University of Košice', detail: 'BSc Computer Science', period: '2023 — 2026' },
  { title: 'IT STEP Academy', detail: 'Professional Certificate, Software Development', period: '2019 — 2022' },
  { title: 'Medical Lyceum', detail: 'High School, Physics & Mathematics', period: '2022 — 2023' },
];

export const hackathons: Hackathon[] = [
  { event: 'ETH Bratislava', project: 'dEST', role: 'Frontend', place: 'Slovakia, 2025', win: true },
  { event: 'European Defense Hackathon', project: 'Vigil8', role: 'Full-Stack', place: 'Netherlands, 2026', win: false },
  { event: 'START Hack', project: 'Valli', role: 'Full-Stack', place: 'Switzerland, 2025', win: false },
];

export const counters: Counter[] = [
  { n: '2+', key: 'years' },
  { n: '19', key: 'projects' },
  { n: '6', key: 'hackathons' },
  { n: '1', key: 'win' },
];

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

export const icons = {
  envelope: {
    vb: '0 0 512 512',
    d: 'M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z',
  },
  linkedin: {
    vb: '0 0 448 512',
    d: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z',
  },
  github: {
    vb: '0 0 496 512',
    d: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z',
  },
};
