import { execSync } from 'child_process';
import type { NextConfig } from 'next';

let buildTime = new Date().toISOString();
try {
  buildTime = execSync('git log -1 --format=%cI').toString().trim() || buildTime;
} catch {}

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
};

export default nextConfig;
