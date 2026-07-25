import { portfolio } from '../data';
import { slugify } from '../i18n';
import type { CompletionOption } from './types';

export const CATEGORIES = ['pet', 'hackathon', 'university', 'professional'];

const opts = (values: string[], dir: boolean): CompletionOption[] => values.map((value) => ({ value, dir }));

export interface CommandSpec {
  name: string;
  usage: string;
  hidden?: boolean;
  options?: () => CompletionOption[];
}

export const COMMANDS: CommandSpec[] = [
  { name: 'help', usage: 'list commands · help <cmd> for one' },
  { name: 'cd', usage: 'change directory (cd <dir> · .. · ~)' },
  { name: 'ls', usage: 'list directory contents' },
  { name: './close.sh', usage: 'close the terminal (from ~)' },
  { name: 'pwd', usage: 'print working directory' },
  { name: 'cat', usage: 'cat cat.txt 🐱', options: () => opts(['cat.txt'], false) },
  {
    name: 'open',
    usage: 'open a project window [--live]',
    options: () =>
      opts(
        portfolio.map((p) => slugify(p.title)),
        true,
      ),
  },
  { name: 'tree', usage: 'interactive site tree' },
  { name: 'grep', usage: 'search projects & skills' },
  {
    name: 'git',
    usage: 'log · tag -l work/* | study/* | hackathons/* · status',
    options: () => opts(['log', 'tag', 'tag -l work/*', 'tag -l study/*', 'tag -l hackathons/*', 'status', 'blame'], false),
  },
  { name: 'docker', usage: 'ps | images | inspect <region>', options: () => opts(['ps', 'images', 'inspect'], false) },
  { name: 'contact', usage: 'list contacts · --open jumps to section · --close hangs up', options: () => opts(['--open', '--close'], false) },
  { name: 'whoami', usage: 'identity (-v for details)' },
  { name: 'neofetch', usage: 'system + stack summary' },
  { name: 'man', usage: 'keyboard shortcuts' },
  { name: 'date', usage: 'current date' },
  { name: 'uname', usage: 'system info' },
  { name: 'uptime', usage: 'session uptime' },
  { name: 'history', usage: 'command history' },
  { name: 'echo', usage: 'print text ($USER, $SHELL…)' },
  { name: 'email', usage: 'open email' },
  { name: 'github', usage: 'open GitHub' },
  { name: 'linkedin', usage: 'open LinkedIn' },
  { name: 'clear', usage: 'clear the screen' },
  { name: 'exit', usage: 'log out — back to profile picker (:q closes the panel)' },
  { name: 'sudo', usage: '', hidden: true },
  { name: 'vim', usage: '', hidden: true },
  { name: 'rm', usage: '', hidden: true },
  { name: 'l', usage: '', hidden: true },
  { name: 'la', usage: '', hidden: true },
  { name: 'll', usage: '', hidden: true },
];

export const COMMAND_NAMES = COMMANDS.filter((c) => !c.hidden).map((c) => c.name);
export const findCommand = (name: string) => COMMANDS.find((c) => c.name === name);
