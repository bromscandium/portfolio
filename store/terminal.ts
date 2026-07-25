import { create } from 'zustand';
import { createNavSlice, type NavSlice } from './slices/navigation';
import { createOverlaySlice, type OverlaySlice } from './slices/overlays';
import { createProjectsSlice, type ProjectsSlice } from './slices/projects';
import { createSessionSlice, type SessionSlice } from './slices/session';

export type TerminalState = SessionSlice & NavSlice & ProjectsSlice & OverlaySlice;

export const useTerminal = create<TerminalState>()((...a) => ({
  ...createSessionSlice(...a),
  ...createNavSlice(...a),
  ...createProjectsSlice(...a),
  ...createOverlaySlice(...a),
}));

export { CMD, EXPAND_DELAY, PRE_DELAY } from './constants';
export { activeFromViewport, setSectionEl } from './slices/navigation';
