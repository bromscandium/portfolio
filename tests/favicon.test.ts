import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { faviconSvg } from '../lib/favicon';

const squash = (s: string) => s.replace(/>\s+</g, '><').trim();

describe('favicon', () => {
  test('default colors reproduce public/favicon.svg exactly', () => {
    const file = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
    expect(squash(faviconSvg('#0c0c0c', '#f8ad40'))).toBe(squash(file));
  });
  test('colors land on the background and both glyph shapes', () => {
    const svg = faviconSvg('#f2f1ec', '#1d4ed8');
    expect(svg).toContain('fill="#f2f1ec"');
    expect(svg.match(/#1d4ed8/g)?.length).toBe(2);
  });
});
