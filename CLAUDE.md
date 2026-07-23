# Portfolio — project conventions

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, static export (`output: 'export'`) → GitHub Pages (`bromscandium.com`).
- Runtime: **bun only** (`bun run dev|build|lint`). Dev binds `-H 0.0.0.0` (WSL localhost fix).
- Single-page "terminal" UI: one client component tree under `app/page.tsx` → `components/layout/Terminal`.

## Tailwind: prefer canonical classes
Do NOT use arbitrary bracket values when a canonical spacing class exists.
The spacing scale is `0.25rem` per step, so **px / 4 = scale value** (`.5` steps allowed):
- `mt-[26px]` → `mt-6.5`, `p-[16px]` → `p-4`, `gap-[10px]` → `gap-2.5`, `h-[38px]` → `h-9.5`, `w-[220px]` → `w-55`, `top-[26px]` → `top-6.5`.
- Applies to margin/padding/gap/width/height/inset/top/right/bottom/left/size/space/translate.
- Font sizes (`text-[13px]`) have NO spacing equivalent — keep arbitrary.
- Colors: prefer theme tokens (`bg-panel-5`, `text-orange`, `border-line-2`) over hex; keep dynamic/computed colors as inline `style`.
Run `bun run lint` before committing; keep it clean.

## Structure
- `lib/types.ts` — all data interfaces (no values).
- `lib/data/*.ts` — one export per file, re-exported via `lib/data/index.ts` barrel. Import data from `@/lib/data`.
- `lib/i18n.ts` — translations/strings (en/uk). `lib/helpers.ts` — pure helpers. `lib/commands/` — terminal command engine (types/constants/autocomplete/run + index barrel).
- `components/layout/` — shell (Terminal, TabBar, Sidebar, StatusBar, CommandLine) + `windows/` (modal, picker, help).
- `components/sections/<Name>/` — one folder per section; section-local repeated bits live in that folder.
- `components/common/` — shared UI (Icon, Section, CommandHeader).
- `public/covers/` — project images; `public/icons/*.svg` — icons (rendered via CSS mask + currentColor).

## Conventions
- No comments in code unless asked.
- Commits: no self-attribution / no Co-Authored-By. Work on `develop`.
- Data is single-source: hero prompt/role, section headers, counts all derive from `lib/data`.
