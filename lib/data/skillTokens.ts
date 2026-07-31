// curated "child processes" shown under each skill in the dev-mode docker easter egg
export const SKILL_TOKENS: Record<string, string[]> = {
  'JavaScript / TypeScript': ['const', 'async', 'map()', 'Promise', 'type'],
  React: ['useState', 'useEffect', 'JSX', 'props', 'memo'],
  'Next.js': ['app/', 'SSR', 'route', 'next/image'],
  'Node.js': ['require', 'stream', 'Buffer', 'event'],
  Redux: ['store', 'action', 'reducer', 'dispatch'],
  'Tailwind CSS / shadcn/ui': ['flex', 'grid', 'variant', 'cn()'],

  Python: ['def', 'class', 'async', 'dict', '@decorator'],
  FastAPI: ['router', 'Depends', 'Pydantic', 'async def'],
  Django: ['models', 'ORM', 'admin', 'migrate'],
  'REST API': ['GET', 'POST', 'JSON', '2xx'],
  GraphQL: ['query', 'mutation', 'schema', 'resolver'],
  WebSockets: ['connect', 'send', 'onmessage', 'close'],
  'OAuth 2.0': ['token', 'scope', 'grant', 'refresh'],
  'ARQ / Celery': ['task', 'queue', 'worker', 'cron'],

  'PostgreSQL (TimescaleDB, pgvector)': ['SELECT', 'JOIN', 'index', 'CTE'],
  Redis: ['GET', 'SET', 'TTL', 'pub/sub'],
  MariaDB: ['table', 'JOIN', 'index'],
  SQLite: ['file', 'PRAGMA', 'query'],
  'SQLAlchemy / Alembic': ['session', 'Model', 'migrate'],
  'Tortoise ORM': ['Model', 'filter', 'prefetch'],

  PyTorch: ['tensor', 'autograd', 'nn.Module', 'cuda'],
  RAG: ['embed', 'retrieve', 'chunk', 'rerank'],
  'QLoRA fine-tuning': ['adapter', '4-bit', 'lora', 'train'],
  Ollama: ['pull', 'run', 'gguf'],

  Linux: ['bash', 'systemd', 'cron', 'grep'],
  Docker: ['build', 'exec', 'compose', 'layer'],
  'AWS (S3, CloudWatch, SQS)': ['bucket', 'queue', 'log', 'IAM'],
  'CI/CD (GitHub Actions)': ['job', 'step', 'runner', 'deploy'],
  Git: ['commit', 'branch', 'rebase', 'stash'],
  'Bun / uv / Poetry': ['install', 'lock', 'run'],
  'Grafana / Sentry / Redash': ['dashboard', 'alert', 'trace'],

  Pytest: ['fixture', 'assert', 'mark', 'mock'],
  Jest: ['describe', 'it()', 'expect', 'mock'],
};

const DEFAULT_TOKENS = ['init', 'run', 'call', 'exit'];

export const tokensFor = (name: string): string[] => SKILL_TOKENS[name] ?? DEFAULT_TOKENS;

// deterministic fake memory (MiB) for a skill, from its years-of-use
export const memOf = (y: number): number => Math.round(y * 40 + 48);

// stable fake PID from a skill name
export const pidFor = (name: string): number => {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) h = Math.imul(h ^ name.charCodeAt(i), 16777619);
  return 1000 + ((h >>> 0) % 8000);
};
