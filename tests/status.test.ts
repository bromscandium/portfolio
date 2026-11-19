import { describe, expect, test } from 'bun:test';
import status from '../lib/data/status.json';

const MONTH = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;

const filled = (value: unknown): boolean => typeof value === 'string' && value.trim().length > 0;

describe('status.json', () => {
  test('has exactly the known fields', () => {
    expect(Object.keys(status).sort()).toEqual(['en', 'org', 'orgLink', 'pr', 'seeking', 'since', 'uk']);
  });

  test('says since when, as a short month and a year', () => {
    expect(status.since).toMatch(MONTH);
  });

  test('names a company unless still looking', () => {
    expect(typeof status.seeking).toBe('boolean');
    if (!status.seeking) expect(filled(status.org)).toBe(true);
  });

  test('links the company over https or not at all', () => {
    expect(status.orgLink === '' || status.orgLink.startsWith('https://')).toBe(true);
  });

  test('points at a pull request number or none', () => {
    expect(status.pr === null || (Number.isInteger(status.pr) && status.pr > 0)).toBe(true);
  });

  test('fills role, location and summary in both languages', () => {
    for (const lang of [status.en, status.uk]) {
      expect(Object.keys(lang).sort()).toEqual(['loc', 'role', 'summary']);
      expect(filled(lang.role) && filled(lang.loc) && filled(lang.summary)).toBe(true);
      expect(lang.role.length).toBeLessThanOrEqual(60);
      expect(lang.summary.length).toBeLessThanOrEqual(400);
    }
  });
});
