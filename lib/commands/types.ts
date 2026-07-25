export type Tone = 'default' | 'muted' | 'error' | 'accent' | 'green' | 'cyan' | 'yellow';

export interface LsRow {
  perms: string;
  size: string;
  name: string;
  head?: boolean;
}

export interface CmdLine {
  text?: string;
  tone?: Tone;
  row?: LsRow;
}

export type Seg = string[];

export interface CompletionOption {
  value: string;
  label?: string;
  dir: boolean;
}

export interface Completion {
  base: string;
  options: CompletionOption[];
}

export interface CmdContext {
  goTo: (i: number) => void;
  goToPrev: () => void;
  openProject: (id: number) => void;
  openUrl: (url: string) => void;
  openHelp: () => void;
  clear: () => void;
  close: () => void;
  exitSession: () => void;
  setContactClosed: (v: boolean) => void;
  pwd: Seg;
  setPwd: (p: Seg) => void;
}
