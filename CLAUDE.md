# Portfolio — project conventions

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, static export (`output: 'export'`) → GitHub Pages (`bromscandium.com`).
- Runtime: **bun only** (`bun run dev|build|lint`). Dev binds `-H 0.0.0.0` (WSL localhost fix); ngrok/dev origins via `ALLOWED_ORIGINS` in `.env` → `allowedDevOrigins`.
- Single-page "terminal" UI: one `'use client'` tree under `app/page.tsx` → `components/layout/Terminal`. No routes (single session; splitting into pages would break the shell/scrollspy).
- `robots: noindex`. Build injects last git-commit time as `NEXT_PUBLIC_BUILD_TIME` (footer "last updated").

## State — Zustand (`store/`)
- `store/terminal.ts` combines slices into `useTerminal`; exports `CMD`, `EXPAND_DELAY`, `setSectionEl`, `activeFromViewport`.
- Slices: `session` (mode/lang/tabs/close/restore/phase reboot), `navigation` (active/goTo/sectionEls), `projects` (cat/hover/expanded/modal + timers), `overlays` (picker/help/search/cmd/palette/toast/typing + `phase`).
- Timers/drag/sectionEls live as module-scope vars inside their slice (non-reactive).
- Components subscribe to slices; **actions via `useTerminal.getState()`** (stable) to avoid needless re-renders. Effects live in `hooks/useTerminalEffects` (restore, typing, scrollspy, global keyboard).
- Boot lifecycle is a `phase` machine: `boot` → BootLoader, `unload` → BootUnloader, `run` → app. `exit` = logout (→ unload → picker); close last tab → confirm → unload → picker → boot.

## Single source of truth (don't scatter / hardcode)
- Modes/langs: `lib/modes.ts` — `MODES`/`LANGS` arrays derive `Mode`/`Lang`/`Combo` types + `COMBOS` + `MODE_META`. Add a mode/lang here.
- Config constants: `lib/config.ts` — `TERMINAL_ROOT`, `ARCH_LOGO`, `LINKS`, `SECTION_LABELS`.
- Data: `lib/types.ts` (interfaces only) + `lib/data/*.ts` (one export/file, barrel `@/lib/data`). Hero prompt/role, counters, sections, sizes all derive from data.
- Translations: **all copy in `lib/i18n.ts`** — `getStrings(mode,lang)` for dynamic strings + `CLOSE_COPY`/`PICKER_COPY` dictionaries. Do NOT keep copy in components.
- Terminal commands: `lib/commands/registry.ts` (`COMMANDS`: name + usage + completion pool) is the single source for `help`, autocomplete, and command names. `run.ts` = behavior, `constants.ts` = SECTIONS/NEOFETCH, `autocomplete.ts`, `types.ts`.
- Keyboard: `lib/keys.ts` — `arrowDirection()` maps hjkl ↔ arrows; reuse for any keyboard nav.

## Components
- `components/layout/` — shell: `Terminal`, `TabBar/` (+ `Tab`), `Sidebar`, `StatusBar`, `CommandLine/` (+ `CommandRow`, `PathLine`, `TreeView`), `BootLoader`, `BootUnloader`, `windows/` (`Modal`, `ProjectModal`, `CommandPalette`, `HelpOverlay`, `ProfilePicker`, `CloseConfirm`).
- `components/sections/<Name>/` — one folder per section; section-local item components live there (e.g. `Experience/Entries`, `Projects/ProjectCard`, `Skills/SkillCard`).
- `components/common/` — shared: `Icon` (CSS-mask svg + currentColor), `Section`, `CommandHeader`, `Typography` (`Heading` variants + `Body`).
- Reuse `common/Modal` for any dialog (animated open/close, backdrop + Esc). Reuse `Heading`/`Body` for headings/paragraphs.
- `public/covers/` — project images; `public/icons/*.svg` — mask icons; `public/favicon.svg`.

## Code style
- Components are `const` arrows, not `function`.
- No logic/markup inside JSX: extract named handlers above `return`; `.map` callbacks delegate to a component (no inline markup/logic).
- No comments in code unless asked.

## Tailwind: canonical classes
- Prefer scale over arbitrary px (spacing = 0.25rem/step → **px/4**): `mt-[26px]`→`mt-6.5`, `w-[220px]`→`w-55`, `py-[90px]`→`py-22.5`. Applies to margin/padding/gap/width/height/inset/top/right/bottom/left/size/space/translate.
- Font sizes (`text-[13px]`) have no spacing equivalent — keep arbitrary.
- Colors: theme tokens (`bg-panel-5`, `text-orange`, `border-line-2`); dynamic/computed colors as inline `style`.

## Workflow
- Run `bun run lint` and `bun run build` before committing; keep both clean.
- Commits: no self-attribution / no Co-Authored-By. Work on `develop`.
