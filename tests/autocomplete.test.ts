import { describe, expect, test } from 'bun:test';
import { autocomplete } from '../lib/commands/autocomplete';
import { COMMAND_NAMES } from '../lib/commands/registry';

const values = (input: string, pwd: string[] = []) => autocomplete(input, pwd).options.map((o) => o.value);

describe('command-name completion', () => {
  test('empty input offers every visible command', () => {
    expect(autocomplete('').options.length).toBe(COMMAND_NAMES.length);
  });
  test('prefix narrows to matching commands', () => {
    expect(values('gi')).toContain('git');
    expect(values('do')).toContain('docker');
    expect(values('co')).toContain('contact');
  });
  test('hidden commands are not completed by name', () => {
    expect(values('reje')).not.toContain('reject-me');
    expect(values('vi')).not.toContain('vim');
  });
});

describe('path completion (cd / ls)', () => {
  test('cd completes directories in the current dir', () => {
    const v = values('cd ', ['portfolio']);
    expect(v).toContain('projects');
    expect(v).toContain('skills');
  });
  test('cd narrows by stub', () => {
    expect(values('cd sk', ['portfolio'])).toContain('skills');
    expect(values('cd sk', ['portfolio'])).not.toContain('projects');
  });
  test('ls completes from root', () => {
    expect(values('ls ', [])).toContain('portfolio');
  });
});

describe('word completion (git / docker / open)', () => {
  test('git subcommands', () => {
    const v = values('git ');
    expect(v).toContain('log');
    expect(v).toContain('status');
    expect(v).toContain('branch');
  });
  test('git narrows by stub', () => {
    expect(values('git lo')).toContain('log');
  });
  test('docker subcommands', () => {
    expect(values('docker ')).toEqual(expect.arrayContaining(['ps', 'images', 'inspect']));
  });
  test('open completes projects and marks them as files (no trailing slash)', () => {
    const opts = autocomplete('open portf', []).options;
    expect(opts.map((o) => o.value)).toContain('portfolio');
    expect(opts.every((o) => o.dir === false)).toBe(true);
  });
});
