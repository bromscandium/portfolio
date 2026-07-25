# Portfolio — project conventions

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, static export (`output: 'export'`) → GitHub Pages (`bromscandium.com`).
- Runtime: **bun only** (`bun run dev|build|lint`). Dev binds `-H 0.0.0.0` (WSL localhost fix); ngrok/dev origins via `ALLOWED_ORIGINS` in `.env` → `allowedDevOrigins`.
- Single-page "terminal" UI: one `'use client'` tree under `app/page.tsx` → `components/layout/Terminal`. No routes (single session; splitting into pages would break the shell/scrollspy).
- `robots: noindex`. Build injects last git-commit time as `NEXT_PUBLIC_BUILD_TIME` (footer "last updated").

## State — Zustand (`store/`)
- `store/terminal.ts` combines slices into `useTerminal`; exports `CMD`, `EXPAND_DELAY`, `setSectionEl`, `activeFromViewport`.
- Slices: `session` (mode/lang/tabs/close/restore/requestClose), `navigation` (active/goTo/sectionEls), `projects` (cat/hover/expanded/modal + timers), `overlays` (picker/help/search/cmd/palette/toast/typing/`phase`/contactClosed).
- Timers/drag/sectionEls live as module-scope vars inside their slice (non-reactive).
- Components subscribe to slices; **actions via `useTerminal.getState()`** (stable). Effects live in `hooks/useTerminalEffects` (restore, typing, scrollspy, global keyboard).
- **Don't prop-drill `mode`/`lang`/derived copy.** Read from the store via `hooks/useStrings` — `useStrings()` (memoized `getStrings`) and `useHuman()`. Sections/cards/modals self-serve; `Terminal` only passes real data (project, cat, handlers).
- Boot is a `phase` machine: `boot` → BootLoader, `unload` → BootUnloader, `run` → app. `ProfilePicker` is a **full-screen gate before boot** (new user picks mode/lang → boot → app; no intro flashing behind). `exit`/`./close.sh` = logout confirm; close last tab → confirm → unload → picker → boot.

## Single source of truth (don't scatter / hardcode)
- Modes/langs: `lib/modes.ts` — `MODES`/`LANGS` derive `Mode`/`Lang`/`Combo` + `COMBOS`/`MODE_META`/`splitCombo`/`LOCALE_LABEL`.
- Config constants: `lib/config.ts` — `TERMINAL_ROOT`, `SHELL`, `GITHUB_USER`, `HOST`, `SITE_URL`, `ARCH_LOGO`, `LINKS`, `SECTION_LABELS`. (domain/shell live here — never hardcode `zsh`/`bromscandium.com`.)
- Data: `lib/types.ts` (interfaces only) + `lib/data/*.ts` (one export/file, barrel `@/lib/data`). Counters, sections, sizes derive from data.
- Translations: **all copy in `lib/i18n.ts`** — `getStrings(mode,lang)` + dictionaries `CLOSE_COPY`/`PICKER_COPY`/`PROJECT_DESC` (project descriptions, en/uk, keyed by id)/`JOB_COPY` (experience role/loc/summary/points, en/uk, keyed by hash). No prose in `lib/data` or components.
- Terminal commands: `lib/commands/` — `registry.ts` (`COMMANDS`: name + usage) is the single source for `help` + command names; `run.ts` = behavior; `fs.ts` = virtual filesystem (root `~` → `portfolio/` → sections → `projects/<slug>`; `resolvePath`/`children`/`isDir`/`displayPwd`); `autocomplete.ts` (pwd-relative for `cd`/`ls`, word-segment for others); `constants.ts` (SECTIONS/NEOFETCH); `types.ts`.
- Keyboard: `lib/keys.ts` — `arrowDirection()` maps hjkl ↔ arrows.
- GitHub contributions counter is live-fetched (`hooks/useContributions`, public API, no token) with a static fallback.

## Terminal FS model
- `cd` changes `pwd` only (updates prompt path, no scroll); `ls`/`cd` share `fs.ts` and complete pwd-relative. `open <project>` opens a modal; `./close.sh` (from `~`) closes the terminal. Section thematic commands (`git log`, `docker ps`, `contact --open`, …) do the scrolling.

## Components
- `components/layout/` — shell: `Terminal`, `TabBar/`, `Sidebar`, `StatusBar`, `CommandLine/` (+ `CommandRow`, `PathLine`, `TreeView`), `BootLoader`, `BootUnloader`, `windows/` (barrel `index.ts`; `ProjectModal`, `CommandPalette`, `HelpOverlay`, `ProfilePicker`, `CloseConfirm`).
- `components/sections/<Name>/` — one folder per section; barrel `components/sections/index.ts`. Section-local items live there (`Experience/Entries`, `Projects/ProjectCard` + `ProjectCover`, `Skills/SkillCard`).
- `components/common/` — shared: `Icon` (CSS-mask svg + currentColor), `Section`, `CommandHeader`, `Modal`, `Typography` (`Heading` variants + `Body`).
- Reuse `common/Modal` for any dialog. `ProjectCover` renders the cover with a generative terminal fallback when the image is missing.
- `public/covers/` — project images; `public/icons/*.svg` — mask icons; `public/favicon.svg`.

## Code style
- Components are `const` arrows, not `function`.
- No logic/markup inside JSX: extract named handlers above `return`; `.map` callbacks delegate to a component (no inline markup/logic).
- No comments in code unless asked.

## Tailwind: canonical classes
- Prefer scale over arbitrary px (spacing = 0.25rem/step → **px/4**): `mt-[26px]`→`mt-6.5`, `w-[220px]`→`w-55`, `py-[90px]`→`py-22.5`. Applies to margin/padding/gap/width/height/inset/top/right/bottom/left/size/space/translate.
- Font sizes (`text-[13px]`) have no spacing equivalent — keep arbitrary.
- Colors: theme tokens (`bg-panel-5`, `text-orange`, `border-line-2`); dynamic/computed colors as inline `style` referencing the token var (`var(--color-orange)`), not raw hex.

## Workflow
- Run `bun run format` (Prettier + organize-imports), then `bun run lint` and `bun run build` before committing; keep all clean.
- Prettier config in `.prettierrc.json` (single-quote, semi, printWidth 160, trailingComma all).
- Commits: no self-attribution / no Co-Authored-By. Work on `develop`.
