import type { ReactNode } from 'react';

export const Panel = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4 rounded-card border border-line-2 bg-panel-0 px-5.5 py-5">{children}</div>;
}
