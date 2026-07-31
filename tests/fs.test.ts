import { describe, expect, test } from 'bun:test';
import { children, displayPwd, isDir, resolvePath } from '../lib/commands/fs';

describe('resolvePath', () => {
  test('home & root', () => {
    expect(resolvePath(['portfolio'], '~')).toEqual([]);
    expect(resolvePath(['portfolio'], '/')).toEqual([]);
    expect(resolvePath(['portfolio', 'skills'], '~')).toEqual([]);
  });
  test('relative descend / ascend', () => {
    expect(resolvePath([], 'portfolio')).toEqual(['portfolio']);
    expect(resolvePath(['portfolio'], 'projects')).toEqual(['portfolio', 'projects']);
    expect(resolvePath(['portfolio'], '..')).toEqual([]);
    expect(resolvePath(['portfolio', 'projects'], '..')).toEqual(['portfolio']);
    expect(resolvePath(['portfolio'], 'skills')).toEqual(['portfolio', 'skills']);
  });
  test('absolute paths', () => {
    expect(resolvePath([], '/portfolio/projects')).toEqual(['portfolio', 'projects']);
    expect(resolvePath(['x', 'y'], '~/portfolio')).toEqual(['portfolio']);
  });
  test('case-insensitive', () => {
    expect(resolvePath([], 'PORTFOLIO')).toEqual(['portfolio']);
    expect(resolvePath(['portfolio'], 'Skills')).toEqual(['portfolio', 'skills']);
  });
  test('invalid paths return null', () => {
    expect(resolvePath([], 'nope')).toBeNull();
    expect(resolvePath(['portfolio'], 'nope')).toBeNull();
    expect(resolvePath(['portfolio'], 'projects/deeper/than/allowed')).toBeNull();
  });
  test('a real project slug is a valid directory', () => {
    expect(resolvePath([], '/portfolio/projects/portfolio')).toEqual(['portfolio', 'projects', 'portfolio']);
  });
});

describe('isDir', () => {
  test('valid levels', () => {
    expect(isDir([])).toBe(true);
    expect(isDir(['portfolio'])).toBe(true);
    expect(isDir(['portfolio', 'skills'])).toBe(true);
    expect(isDir(['portfolio', 'projects', 'portfolio'])).toBe(true);
  });
  test('invalid', () => {
    expect(isDir(['x'])).toBe(false);
    expect(isDir(['portfolio', 'nope'])).toBe(false);
    expect(isDir(['portfolio', 'projects', 'nope'])).toBe(false);
    expect(isDir(['a', 'b', 'c', 'd'])).toBe(false);
  });
});

describe('children', () => {
  test('root lists portfolio/ and close.sh', () => {
    const names = children([]).map((e) => e.name);
    expect(names).toContain('portfolio');
    expect(names).toContain('close.sh');
    expect(children([]).find((e) => e.name === 'close.sh')?.dir).toBe(false);
  });
  test('portfolio lists sections (all dirs)', () => {
    const c = children(['portfolio']);
    expect(c.map((e) => e.name)).toContain('skills');
    expect(c.every((e) => e.dir)).toBe(true);
  });
  test('projects lists slugs; a leaf has no children', () => {
    expect(children(['portfolio', 'projects']).length).toBeGreaterThan(0);
    expect(children(['portfolio', 'skills'])).toEqual([]);
  });
});

describe('displayPwd', () => {
  test('formats the prompt path', () => {
    expect(displayPwd([])).toBe('~');
    expect(displayPwd(['portfolio'])).toBe('~/portfolio');
    expect(displayPwd(['portfolio', 'projects'])).toBe('~/portfolio/projects');
  });
});
