export type Direction = 'up' | 'down' | 'left' | 'right';

const DIRECTION: Record<string, Direction> = {
  ArrowUp: 'up',
  k: 'up',
  ArrowDown: 'down',
  j: 'down',
  ArrowLeft: 'left',
  h: 'left',
  ArrowRight: 'right',
  l: 'right',
};

export const arrowDirection = (key: string): Direction | null => DIRECTION[key] ?? null;
