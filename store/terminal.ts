import { create } from 'zustand';
import { createSessionSlice, type SessionSlice } from './slices/session';
import { createNavSlice, type NavSlice } from './slices/navigation';
import { createProjectsSlice, type ProjectsSlice } from './slices/projects';
import { createOverlaySlice, type OverlaySlice } from './slices/overlays';

export type TerminalState = SessionSlice & NavSlice & ProjectsSlice & OverlaySlice;

export const useTerminal = create<TerminalState>()((...a) => ({
  ...createSessionSlice(...a),
  ...createNavSlice(...a),
  ...createProjectsSlice(...a),
  ...createOverlaySlice(...a),
}));

export { CMD, PRE_DELAY, EXPAND_DELAY } from './constants';
export { setSectionEl, activeFromViewport } from './slices/navigation';
