import type { Job, JobCopy } from '../types';
import status from './status.json';

export const STATUS_HASH = 'lfaj';

export const STATUS_PATH = 'lib/data/status.json';

const copyOf = (lang: 'en' | 'uk'): JobCopy => ({
  role: status[lang].role,
  loc: status[lang].loc,
  summary: status[lang].summary,
  points: [],
});

export const statusCopy = { en: copyOf('en'), uk: copyOf('uk') };

export const statusJob: Job = {
  hash: STATUS_HASH,
  period: `${status.since} — Present`,
  org: status.org,
  ...(status.orgLink ? { orgLink: status.orgLink } : {}),
  seeking: status.seeking,
  pr: status.pr,
};
