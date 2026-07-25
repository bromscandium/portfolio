import { SHELL, TERMINAL_ROOT } from './config';
import { skillMap } from './data/skills';
import { LOCALE_LABEL } from './modes';
import type { Lang, Mode } from './modes';
import type { JobCopy, Option } from './types';

export type { Mode, Lang, Combo } from './modes';

export const comboLabel = (combo: string, short: boolean): string => {
  const map: Record<string, string> = short
    ? {
        'dev-en': `${SHELL} · english`,
        'dev-uk': `${SHELL} · українська`,
        'human-en': 'plain english',
        'human-uk': 'простою українською',
      }
    : {
        'dev-en': `${TERMINAL_ROOT} — ${SHELL}`,
        'dev-uk': `${TERMINAL_ROOT} — ${SHELL}`,
        'human-en': 'portfolio',
        'human-uk': 'портфоліо',
      };
  return map[combo];
}

export interface Strings {
  navRoot: string;
  navNames: string[];
  heroName: [string, string];
  roleWord: string;
  statement: string;
  stmtColor: string;
  counterLabels: Record<'years' | 'projects' | 'hackathons' | 'contributions', string>;
  btnWork: string;
  btnContact: string;
  hExp: string;
  hSkills: string;
  hWork: string;
  hContact: string;
  hEdu: string;
  hHacks: string;
  skillsNote: string;
  contactNote: string;
  privateNote: string;
  workHint: string;
  catLabels: Option[];
  catBadge: Record<string, string>;
  projectDesc: (id: number) => string[];
  jobCopy: (hash: string) => JobCopy;
  regionName: (region: string) => string;
  yLabel: (y: number) => string;
  regionStatus: (maxY: number) => string;
  projCount: (n: number) => string;
  modalPath: (title: string, slug: string) => string;
  langValue: (hovering: boolean) => string;
  viewValue: (hovering: boolean) => string;
  lastUpdated: (iso: string) => string;
}

const regionUk: Record<string, string> = {
  Frontend: 'Фронтенд',
  Backend: 'Бекенд',
  Data: 'Дані',
  DevOps: 'DevOps',
  Testing: 'Тестування',
};

export const getStrings = (mode: Mode, lang: Lang): Strings => {
  const human = mode === 'human';
  const uk = lang === 'uk';

  return {
    navRoot: human ? (uk ? 'Портфоліо' : 'Portfolio') : TERMINAL_ROOT,
    navNames: human && uk ? ['вступ', 'досвід', 'стек', 'проєкти', 'контакти'] : ['intro', 'experience', 'skills', 'projects', 'contact'],
    heroName: uk ? ['ЯРОСЛАВ', 'ЄРЬОМЕНКО'] : ['YAROSLAV', 'YEROMENKO'],
    roleWord: uk ? 'FULL-STACK ІНЖЕНЕР' : 'FULL-STACK ENGINEER',
    statement:
      (human ? '' : '# ') +
      (uk
        ? '4+ роки будую масштабовані продукти від початку до кінця: React/Next.js, Python/FastAPI, автоматизовані DevOps-деплої. B2B E-commerce, НГО, LLM-системи. Prague · Remote.'
        : '4+ years shipping scalable products end-to-end: React/Next.js, Python/FastAPI, automated DevOps. B2B E-commerce, NGOs, LLM systems. Prague · Remote.'),
    stmtColor: human ? '#c4c4c4' : '#6f7a68',
    counterLabels: {
      years: uk ? 'роки досвіду' : 'yrs experience',
      projects: uk ? 'проєктів' : 'projects',
      hackathons: uk ? 'хакатонів' : 'hackathons',
      contributions: uk ? 'контрибуцій' : 'contributions',
    },
    btnWork: human ? (uk ? 'Дивитись проєкти' : 'View projects') : 'cd ~/projects',
    btnContact: human ? (uk ? 'Звʼязатися' : 'Contact me') : 'contact --open',
    hExp: uk ? 'Досвід' : 'Experience',
    hSkills: uk ? 'Навички — роки досвіду' : 'Skills — years of use',
    hWork: uk ? 'Проєкти' : 'Projects',
    hContact: uk ? 'Контакти' : 'Contact',
    hEdu: uk ? 'ОСВІТА' : 'EDUCATION',
    hHacks: uk ? 'ХАКАТОНИ' : 'HACKATHONS',
    skillsNote: human
      ? uk
        ? 'Числа = роки практичного досвіду'
        : 'Numbers = years of hands-on use'
      : uk
        ? `${skillMap.length} контейнерів запущено · STATUS = роки практичного досвіду`
        : `${skillMap.length} containers running · STATUS = years of hands-on use`,
    contactNote:
      (human ? '' : uk ? 'Зʼєднання встановлено. ' : 'Connection established. ') +
      (uk ? 'Відкритий до full-time · remote.' : 'Available for full-time · remote.'),
    privateNote: uk ? '// приватний проєкт — без публічних лінків' : '// private build — no public links',
    workHint: human
      ? uk
        ? 'наведи курсор на вікно — воно відкриється'
        : 'hover a window to view more'
      : uk
        ? '// наведи курсор на вікно й потримай — воно відкриється'
        : '// hover a window to view more',
    catLabels: human
      ? uk
        ? [
            { key: 'all', label: 'Всі' },
            { key: 'professional', label: 'Комерційні' },
            { key: 'hackathon', label: 'Хакатони' },
            { key: 'university', label: 'Університет' },
            { key: 'pet', label: 'Пет-проєкти' },
          ]
        : [
            { key: 'all', label: 'All' },
            { key: 'professional', label: 'Professional' },
            { key: 'hackathon', label: 'Hackathons' },
            { key: 'university', label: 'University' },
            { key: 'pet', label: 'Pet projects' },
          ]
      : [
          { key: 'all', label: '--all' },
          { key: 'professional', label: '--professional' },
          { key: 'hackathon', label: '--hackathons' },
          { key: 'university', label: '--university' },
          { key: 'pet', label: '--pet' },
        ],
    catBadge: uk
      ? { pet: 'пет', hackathon: 'хакатон', university: 'універ', professional: 'комерційний' }
      : { pet: 'pet', hackathon: 'hackathon', university: 'university', professional: 'professional' },
    projectDesc: (id: number) => PROJECT_DESC[id]?.[uk ? 'uk' : 'en'] ?? [],
    jobCopy: (hash: string) => JOB_COPY[hash]?.[uk ? 'uk' : 'en'] ?? { role: '', loc: '', summary: '', points: [] },
    regionName: (region: string) => (human ? (uk ? regionUk[region] ?? region : region) : `stack/${region.toLowerCase()}:latest`),
    yLabel: (y: number) => (human ? (uk ? `${y} р.` : `${y} y`) : `Up ${y.toFixed(1)}y`),
    regionStatus: (maxY: number) =>
      human
        ? uk
          ? `${maxY} ${maxY === 1 ? 'рік' : 'роки'}`
          : `${maxY} ${maxY === 1 ? 'year' : 'years'}`
        : `Up ${maxY} ${maxY === 1 ? 'year' : 'years'}`,
    projCount: (n: number) => (human ? `${n}${uk ? ' проєктів' : ' projects'}` : `${n} entries`),
    modalPath: (title: string, slug: string) => (human ? `${title}${uk ? ' — деталі' : ' — details'}` : `~/projects/${slug} — maximized`),
    langValue: (hovering: boolean) => LOCALE_LABEL[hovering ? (uk ? 'en' : 'uk') : uk ? 'uk' : 'en'],
    lastUpdated: (iso: string) => {
      const d = iso ? new Date(iso) : new Date(0);
      if (!human) return `updated ${Math.floor(d.getTime() / 1000)}`;
      const date = d.toLocaleDateString(uk ? 'uk-UA' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
      return `${uk ? 'оновлено' : 'updated'} ${date}`;
    },
    viewValue: (hovering: boolean) =>
      hovering
        ? human
          ? uk
            ? 'розробник'
            : 'developer'
          : uk
            ? 'людина'
            : 'human'
        : human
          ? uk
            ? 'людина'
            : 'human'
          : uk
            ? 'розробник'
            : 'developer',
  };
}

export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const PROJECT_DESC: Record<number, { en: string[]; uk: string[] }> = {
  21: {
    en: [
      'The full-stack quiz platform built during the Meduzzen engineering internship — a multi-language quiz system with real-time analytics.',
      'The Next.js 16 frontend uses Redux Toolkit and MUI for dynamic quiz workflows, analytics dashboards and Auth0 authentication.',
      'The FastAPI backend follows a Unit of Work pattern over PostgreSQL and Redis, containerized with Docker and deployed to AWS via GitHub Actions, covered by Pytest and Jest.',
    ],
    uk: [
      'Full-stack платформа для квізів, створена під час інженерного стажування в Meduzzen — багатомовна система квізів з аналітикою в реальному часі.',
      'Фронтенд на Next.js 16 використовує Redux Toolkit і MUI для динамічних сценаріїв квізів, аналітичних дашбордів та автентифікації через Auth0.',
      'Бекенд на FastAPI побудований за патерном Unit of Work поверх PostgreSQL і Redis, контейнеризований у Docker і задеплоєний на AWS через GitHub Actions, покритий Pytest і Jest.',
    ],
  },
  19: {
    en: [
      'BromiumJS is a modern JavaScript/TypeScript UI framework built for a bachelor thesis, unifying design patterns drawn from Vue, React, and Next.js into a single toolkit.',
      'It offers proxy-based reactivity (ref, reactive, computed, watch), JSX with a virtual DOM and efficient diffing, and dual hook systems supporting both React-style and Vue-style lifecycle hooks.',
      'It adds Next.js-style file-based routing with dynamic segments and ships a first-class Vite plugin with HMR, organized as a modular monorepo. The same demo site is rebuilt across React, Vue, Angular and BromiumJS for a direct comparison.',
    ],
    uk: [
      'BromiumJS — сучасний UI-фреймворк на JavaScript/TypeScript, створений для бакалаврської роботи, що поєднує підходи з Vue, React і Next.js в єдиному інструментарії.',
      'Пропонує реактивність на основі проксі (ref, reactive, computed, watch), JSX з віртуальним DOM та ефективним дифінгом і подвійну систему хуків — у стилі React і Vue.',
      'Додає файлову маршрутизацію в стилі Next.js з динамічними сегментами й має власний Vite-плагін з HMR, організований як модульний монорепозиторій. Той самий демо-сайт переписано на React, Vue, Angular і BromiumJS для прямого порівняння.',
    ],
  },
  18: {
    en: [
      'Scrollix is a mobile game platform built in Godot that reimagines the TikTok feed as a vertical stack of short, swipeable mini-games instead of videos.',
      'Players swipe between six original games — Brick Breaker, Stack, TapTiming, SharkSurfer, Piano Tiles and Connect — while the app tracks best scores, play counts, likes and leaderboard rankings.',
      'It features a local account system, persistent likes, adjustable audio, and isolated per-game rendering via SubViewports to keep games from interfering with one another.',
    ],
    uk: [
      'Scrollix — мобільна ігрова платформа на Godot, що переосмислює стрічку TikTok як вертикальний стос коротких свайпабельних міні-ігор замість відео.',
      'Гравці гортають шість оригінальних ігор — Brick Breaker, Stack, TapTiming, SharkSurfer, Piano Tiles і Connect, — а застосунок відстежує рекорди, кількість запусків, лайки та позиції в рейтингу.',
      'Має локальну систему акаунтів, збережувані лайки, регульований звук та ізольований рендеринг кожної гри через SubViewports, щоб ігри не заважали одна одній.',
    ],
  },
  16: {
    en: [
      'An advanced OSINT and Market Analysis platform developed as a collaborative Data Science project to track blockchain activity and web-based intelligence.',
      'Built custom scrapers and analytical modules to process large datasets, enabling deep-dive forensics into holder behavior and trading patterns.',
      'Features a high-performance architecture using FastAPI and Next.js 15 to generate automated investigative reports and real-time market metrics.',
    ],
    uk: [
      'Просунута платформа OSINT та ринкового аналізу, розроблена як спільний Data Science проєкт для відстеження блокчейн-активності й веб-розвідки.',
      'Створено власні скрапери й аналітичні модулі для обробки великих датасетів, що дає змогу глибоко досліджувати поведінку холдерів і торгові патерни.',
      'Має високопродуктивну архітектуру на FastAPI та Next.js 15 для генерації автоматичних аналітичних звітів і ринкових метрик у реальному часі.',
    ],
  },
  15: {
    en: [
      'A legal consulting corporate website, completely rebuilt from a traditional WordPress builder into a high-performance Next.js application.',
      'The architecture utilizes WordPress strictly as a headless CMS, separating content management from the frontend presentation layer via GraphQL.',
      'The primary goal of this migration was to significantly boost loading speeds, optimize SEO rankings, and enhance the overall user experience.',
    ],
    uk: [
      'Корпоративний сайт юридичного консалтингу, повністю перебудований зі звичайного WordPress-білдера на високопродуктивний застосунок на Next.js.',
      'Архітектура використовує WordPress суто як headless CMS, відділяючи керування контентом від фронтенду через GraphQL.',
      'Головна мета міграції — суттєво пришвидшити завантаження, покращити SEO-позиції та загальний користувацький досвід.',
    ],
  },
  14: {
    en: [
      'A full-stack IoT monitoring platform for managing ESP32 and Raspberry Pi Pico devices.',
      'The system collects real-time sensor data (temperature, humidity, gas) via MQTT and visualizes it instantly using WebSocket updates.',
      'Designed for end-to-end device management, featuring automatic device registration, threshold-based email alerts, and local data buffering.',
    ],
    uk: [
      'Full-stack платформа моніторингу IoT для керування пристроями ESP32 та Raspberry Pi Pico.',
      'Система збирає дані з сенсорів у реальному часі (температура, вологість, газ) через MQTT і миттєво візуалізує їх через оновлення по WebSocket.',
      'Спроєктована для наскрізного керування пристроями: автоматична реєстрація, email-сповіщення за порогами та локальне буферування даних.',
    ],
  },
  13: {
    en: [
      'A platform built for small and medium-sized businesses to create, configure, and deploy AI-powered agents without complex development.',
      'Utilizes OpenAI models to handle natural language communications and automate workflows via integrations with WhatsApp, Instagram, and website chat bubbles.',
      'Aims to boost productivity and reduce operational costs by automating routine tasks like order processing and employee selection.',
    ],
    uk: [
      'Платформа для малого й середнього бізнесу, що дозволяє створювати, налаштовувати й розгортати AI-агентів без складної розробки.',
      'Використовує моделі OpenAI для обробки природної мови й автоматизації робочих процесів через інтеграції з WhatsApp, Instagram і чат-бульбашкою на сайті.',
      'Мета — підвищити продуктивність і зменшити операційні витрати, автоматизуючи рутинні задачі на кшталт обробки замовлень та відбору працівників.',
    ],
  },
  10: {
    en: [
      'A decentralized real estate marketplace and the winning project of the ETHBratislava hackathon on the EURØP Challenge track.',
      'It allows users to list, buy, and auction properties as NFTs, with transactions powered by Solidity smart contracts.',
      'The platform ensures transparency, reduces commission fees, and simplifies the property exchange process through blockchain technology.',
    ],
    uk: [
      'Децентралізований маркетплейс нерухомості й переможець хакатону ETHBratislava на треку EURØP Challenge.',
      'Дозволяє виставляти, купувати й продавати нерухомість з аукціону як NFT, з транзакціями на смартконтрактах Solidity.',
      'Платформа забезпечує прозорість, знижує комісії й спрощує процес обміну нерухомістю завдяки блокчейну.',
    ],
  },
  9: {
    en: [
      'Whelm is a project created for the Cassini Hackathon — a disaster response simulator powered by Copernicus data.',
      'It features an interactive React frontend and a Python backend with AI integration via the OpenAI API.',
      'The app is fully containerized with Docker, showcasing real-time map interactions, decision-making, and gamified UX.',
    ],
    uk: [
      'Whelm — проєкт для Cassini Hackathon: симулятор реагування на катастрофи на основі даних Copernicus.',
      'Має інтерактивний фронтенд на React і бекенд на Python з інтеграцією AI через OpenAI API.',
      'Застосунок повністю контейнеризовано в Docker; демонструє взаємодію з картою в реальному часі, прийняття рішень і гейміфікований UX.',
    ],
  },
  8: {
    en: [
      'This is my second university project, creating a game in Java, Spring, and part of the frontend.',
      'I chose Angular as the frontend because I wanted to kill two birds with one stone (Learn Java and Typescript)',
      'The game is small, but the biggest focus was the design.',
    ],
    uk: [
      'Мій другий університетський проєкт — гра на Java, Spring і частина фронтенду.',
      'Обрав Angular для фронтенду, щоб убити двох зайців одразу (вивчити Java і TypeScript).',
      'Гра невелика, але головний акцент був на дизайні.',
    ],
  },
  7: {
    en: [
      'At a hackathon in Žilina, Slovakia, my team and I developed a prototype of a web portal for community residents.',
      'We used the most available technologies and libraries to develop our project.',
      'My task was to create the front-end part together with my friend, where I took the main responsibility.',
    ],
    uk: [
      'На хакатоні в Жиліні (Словаччина) наша команда розробила прототип веб-порталу для мешканців громади.',
      'Ми використали найдоступніші технології та бібліотеки для розробки проєкту.',
      'Моїм завданням була фронтенд-частина разом із другом, де я взяв основну відповідальність.',
    ],
  },
  6: {
    en: [
      'A playful weather app that shows current conditions and a random tip based on your city.',
      'More of a developer sandbox: focused on API usage, data handling, and project structure rather than content relevance.',
      'Built to explore frontend–backend interaction and how external services integrate into modern web projects.',
    ],
    uk: [
      'Легкий погодний застосунок, що показує поточні умови й випадкову пораду залежно від міста.',
      'Радше пісочниця для розробника: акцент на роботі з API, обробці даних і структурі проєкту, а не на змісті.',
      'Створений, щоб дослідити взаємодію фронтенду й бекенду та інтеграцію зовнішніх сервісів у сучасні веб-проєкти.',
    ],
  },
  5: {
    en: [
      'An experimental project exploring visual design and user flow.',
      'Focuses on animated interfaces and modular components.',
      'This project was made in cooperation with backender, my role is frontend',
    ],
    uk: [
      'Експериментальний проєкт, що досліджує візуальний дизайн і користувацький флоу.',
      'Зосереджений на анімованих інтерфейсах і модульних компонентах.',
      'Проєкт зроблено у співпраці з бекендером, моя роль — фронтенд.',
    ],
  },
  4: {
    en: [
      'Personal website to showcase my projects, experiences, and skills.',
      'Fully built with Next.js and smooth UX in mind, styled as an authentic developer terminal.',
    ],
    uk: [
      'Персональний сайт для показу моїх проєктів, досвіду та навичок.',
      'Повністю зроблений на Next.js з увагою до плавного UX, стилізований під справжній термінал розробника.',
    ],
  },
  3: {
    en: [
      'Jan Diddy is an asynchronous Telegram bot built for a Ukrainian university community, combining group-management tooling with an AI chat persona.',
      'It provides administrative controls (bans, mutes, a multi-level warning system), content filtering with homoglyph/leetspeak normalization, and info services like schedules, rules and semester progress.',
      'Its AI persona passively follows the chat and generates in-character replies through a separate fine-tuned LLM engine (jan-diddy-llm), built with a QLoRA/ORPO dataset pipeline and served over FastAPI.',
    ],
    uk: [
      'Jan Diddy — асинхронний Telegram-бот для української університетської спільноти, що поєднує інструменти модерації груп з AI-персоною для чату.',
      'Надає адміністративні контролі (бани, мьюти, багаторівнева система попереджень), фільтрацію контенту з нормалізацією гомогліфів/leetspeak та інфосервіси: розклад, правила, прогрес семестру.',
      'Його AI-персона пасивно стежить за чатом і генерує відповіді в образі через окремий доточений LLM-рушій (jan-diddy-llm), побудований на пайплайні датасетів QLoRA/ORPO і поданий через FastAPI.',
    ],
  },
  2: {
    en: [
      'Astro Game was my first serious project during university.',
      'A runner-style game where a spaceship dodges comets and survives as long as possible.',
      'It also features an in-game economic system.',
    ],
    uk: [
      'Astro Game — мій перший серйозний проєкт в університеті.',
      'Гра в стилі раннер, де космічний корабель ухиляється від комет і виживає якомога довше.',
      'Також має внутрішньоігрову економічну систему.',
    ],
  },
  1: {
    en: [
      'A site for Promote Ukraine to showcase projects, cultural events, and advocacy efforts.',
      'Supports communication and outreach for an NGO.',
    ],
    uk: [
      'Сайт для Promote Ukraine для показу проєктів, культурних подій та адвокаційних ініціатив.',
      'Підтримує комунікацію й аутрич для НГО.',
    ],
  },
};

export const JOB_COPY: Record<string, { en: JobCopy; uk: JobCopy }> = {
  b6e2c11: {
    en: {
      role: 'Software Support Engineer',
      loc: 'Remote',
      summary: 'Delivered technical system diagnostics, production issue resolution, and system integrity operations for a B2B E-commerce platform.',
      points: [
        'Production Diagnostics & Hotfixing: Investigated backend anomalies within Django and Python services, analyzing AWS CloudWatch log traces to identify code level issues and deploy production hotfixes.',
        'System Integrity & Data Validation: Ensured platform stability by monitoring system health in Grafana and running SQL queries in Redash to verify data parity across PostgreSQL and Redis caching layers.',
        'Cross-Functional Collaboration & Support: Partnered with core dev teams, product managers, and operations via Jira and Intercom to clarify L3 requirements, communicate technical context, and align cross-department workflows.',
      ],
    },
    uk: {
      role: 'Інженер підтримки ПЗ',
      loc: 'Віддалено',
      summary: 'Технічна діагностика систем, усунення продакшн-проблем і підтримка цілісності системи для B2B E-commerce платформи.',
      points: [
        'Діагностика та хотфікси продакшену: досліджував бекенд-аномалії в сервісах на Django/Python, аналізував трейси логів AWS CloudWatch, щоб локалізувати проблеми на рівні коду й розгортати продакшн-виправлення.',
        'Цілісність системи та валідація даних: забезпечував стабільність платформи, моніторячи стан систем у Grafana і виконуючи SQL-запити в Redash для перевірки узгодженості даних між PostgreSQL і кешем Redis.',
        'Міжкомандна співпраця та підтримка: працював з командами розробки, продакт-менеджерами й операціями через Jira та Intercom — уточнював вимоги рівня L3, доносив технічний контекст і синхронізував процеси між відділами.',
      ],
    },
  },
  f8ad40e: {
    en: {
      role: 'Full-Stack Engineer',
      loc: 'Remote',
      summary: 'Delivered custom web platforms, AI systems, and framework-level tools across commercial, open-source, and academic initiatives.',
      points: [
        'Frontend Architecture & Tooling: Engineered a lightweight, signal-based reactive UI framework monorepo (TypeScript) featuring a custom JSX runtime, client-side router, and Vite plugin for fine-grained DOM reactivity.',
        'LLM Engineering & RAG Infrastructure: Designed an end-to-end LLM orchestration engine using FastAPI, PyTorch, and pgvector for a university initiative, implementing QLoRA fine-tuning on Gemma 3 4B using custom chat datasets for domain alignment.',
        'Platform Performance & Optimization: Spearheaded the migration of a legacy system to a Next.js and Headless WordPress architecture, doubling organic traffic from 500 to 1,000 monthly users through Core Web Vitals and SEO optimization.',
        'Asynchronous Backend Systems: Built high-throughput backend services using Python and FastAPI, leveraging ARQ and Redis for asynchronous task queues, caching, and real-time state management.',
      ],
    },
    uk: {
      role: 'Full-Stack інженер',
      loc: 'Віддалено',
      summary: 'Розробляв кастомні веб-платформи, AI-системи та інструменти рівня фреймворків для комерційних, опенсорс- та академічних ініціатив.',
      points: [
        'Архітектура та інструментарій фронтенду: створив легкий сигнал-орієнтований UI-фреймворк-монорепозиторій (TypeScript) з власним JSX-рантаймом, клієнтським роутером і Vite-плагіном для дрібнозернистої реактивності DOM.',
        'LLM-інженерія та RAG-інфраструктура: спроєктував наскрізний рушій оркестрації LLM на FastAPI, PyTorch і pgvector для університетської ініціативи, реалізувавши QLoRA-донавчання Gemma 3 4B на власних чат-датасетах для доменного вирівнювання.',
        'Продуктивність і оптимізація платформи: очолив міграцію legacy-системи на архітектуру Next.js + Headless WordPress, подвоївши органічний трафік з 500 до 1 000 користувачів на місяць через Core Web Vitals та SEO.',
        'Асинхронні бекенд-системи: побудував високонавантажені бекенд-сервіси на Python і FastAPI, використовуючи ARQ і Redis для асинхронних черг задач, кешування й керування станом у реальному часі.',
      ],
    },
  },
  c76a1e2: {
    en: {
      role: 'Full-Stack Engineer Intern',
      loc: 'Remote',
      summary: 'Completed an intensive engineering program focused on building and shipping full-stack cloud applications under senior mentorship.',
      points: [
        'Frontend Engineering: Built a responsive, multi-language UI using Next.js 16, Redux Toolkit, and MUI, implementing dynamic quiz workflows, real-time analytics dashboards, and Auth0.',
        'Backend & Infrastructure: Architected a modular FastAPI service with PostgreSQL and Redis, implementing a Unit of Work pattern, Docker containerization, and automated AWS deployment pipelines via GitHub Actions.',
        'Engineering Process & Quality: Collaborated with senior engineers in Agile workflows, participating in code reviews and implementing Pytest and Jest suites to ensure reliability.',
      ],
    },
    uk: {
      role: 'Full-Stack інженер (інтерн)',
      loc: 'Віддалено',
      summary: 'Пройшов інтенсивну інженерну програму, зосереджену на створенні й доставці full-stack хмарних застосунків під менторством сеньйорів.',
      points: [
        'Фронтенд-інженерія: створив адаптивний багатомовний UI на Next.js 16, Redux Toolkit і MUI з динамічними сценаріями квізів, аналітичними дашбордами в реальному часі та Auth0.',
        'Бекенд та інфраструктура: спроєктував модульний FastAPI-сервіс з PostgreSQL і Redis, реалізувавши патерн Unit of Work, контейнеризацію в Docker та автоматичні пайплайни деплою на AWS через GitHub Actions.',
        'Процес і якість розробки: працював із сеньйор-інженерами в Agile, брав участь у код-рев’ю і писав тести на Pytest та Jest для надійності.',
      ],
    },
  },
  '2f2022a': {
    en: {
      role: 'Software Engineer',
      loc: 'Brussels, Belgium',
      summary: 'Led digital transformation, web platform creation, and workflow automation for a major European NGO.',
      points: [
        'Web Architecture & Delivery: Managed the end-to-end development and deployment of key organizational platforms, including the active Promote Ukraine portal, Ukrainian Civil Society Hub, and Ukrainian Business Incubator in Belgium.',
        'Product Development & Support: Contributed to the development and ongoing maintenance of the Preventia health initiative web project, driving continuous platform improvements and community adoption.',
        'Internal Systems & Automation: Engineered a custom asset-tracking application and automated internal workflows via SharePoint and Power Platform, reducing manual administrative workload by ~30%.',
      ],
    },
    uk: {
      role: 'Інженер-програміст',
      loc: 'Брюссель, Бельгія',
      summary: 'Керував цифровою трансформацією, створенням веб-платформ і автоматизацією процесів для великої європейської НГО.',
      points: [
        'Веб-архітектура та доставка: керував наскрізною розробкою й розгортанням ключових платформ організації, зокрема чинного порталу Promote Ukraine, Ukrainian Civil Society Hub та Українського бізнес-інкубатора в Бельгії.',
        'Розробка продукту та підтримка: долучався до розробки й підтримки вебпроєкту ініціативи Preventia, стимулюючи постійні покращення та залучення спільноти.',
        'Внутрішні системи та автоматизація: розробив кастомний застосунок обліку активів і автоматизував внутрішні процеси через SharePoint і Power Platform, скоротивши ручну адмінроботу приблизно на 30%.',
      ],
    },
  },
};

export const CLOSE_COPY: Record<Lang, { title: string; q: string; desc: string; close: string; cancel: string }> = {
  en: {
    title: 'close session',
    q: 'are you sure you want to close this tab?',
    desc: 'This ends the session and asks you to pick a profile again.',
    close: 'close',
    cancel: 'cancel',
  },
  uk: {
    title: 'закрити сесію',
    q: 'справді закрити цю вкладку?',
    desc: 'Це завершить сесію і знову запропонує вибір профілю.',
    close: 'закрити',
    cancel: 'скасувати',
  },
};

export const PICKER_COPY: Record<
  Lang,
  { title: string; who: string; dev: string; devDesc: string; human: string; humanDesc: string; locale: string; note: string }
> = {
  en: {
    title: 'select session profile',
    who: 'who are you?',
    dev: 'developer',
    devDesc: 'full terminal UI — commands, containers, git log',
    human: 'visitor',
    humanDesc: 'plain language, no commands — same content',
    locale: 'locale',
    note: '// switch anytime with + in the tab bar',
  },
  uk: {
    title: 'вибір профілю сесії',
    who: 'хто ти?',
    dev: 'розробник',
    devDesc: 'повний термінал — команди, контейнери, git log',
    human: 'відвідувач',
    humanDesc: 'проста мова, без команд — той самий контент',
    locale: 'локаль',
    note: '// змінити будь-коли через + у таб-барі',
  },
};
