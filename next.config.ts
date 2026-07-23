import { execSync } from 'child_process';
import type { NextConfig } from 'next';

let buildTime = new Date().toISOString();
try {
  buildTime = execSync('git log -1 --format=%cI').toString().trim() || buildTime;
} catch {}

const allowedDevOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, ''))
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(allowedDevOrigins.length ? { allowedDevOrigins } : {}),
  env: {
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
};

export default nextConfig;
