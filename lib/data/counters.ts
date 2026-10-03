import type { Counter } from '../types';
import { PROJECT_COUNT } from './projectCount';

export const counters: Counter[] = [
  { n: '4+', key: 'years' },
  { n: String(PROJECT_COUNT), key: 'projects' },
  { n: '10+', key: 'hackathons' },
  { n: '1.5k+', key: 'contributions' },
];
