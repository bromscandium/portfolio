# bromscandium.com — terminal portfolio

An interactive, single-page portfolio built as a **developer terminal** — a fake Arch Linux + zsh shell you can actually type commands into. Live at **[bromscandium.com](https://bromscandium.com)**.

It ships in **two views** and **two languages**, switchable at any time:

- **developer** — the full terminal UI: tab bar, file-tree sidebar, tmux-style status bar, and a real command line (`git log`, `docker ps`, `cd ~/projects`, …).
- **human-being** — the same content in plain language, no commands required.
- English · Українською.

## Highlights

- **Working command line** — a virtual filesystem (`cd`/`ls`/`tree`), themed section commands (`git log`, `docker ps`, `contact --open`), fuzzy `open <project>`, autocomplete, history, and a pile of easter eggs. See **[CONSOLE.md](./CONSOLE.md)** for the full guide.
- **Boot sequence** — profile picker → boot loader → app; `./close.sh` / `exit` logs out.
- **Tabs** — open/close with animation, drag-to-reorder, `git checkout developer|human-being` switches the view like a branch.
- **Fun** — `cmatrix` (full-screen matrix rain with rare falling words), `crt` (retro CRT scanline mode, persisted), Arch-logo flourish.
- **Skills = containers** — `docker ps` styling; in dev, click a skill to `docker top` its "processes" (pid · cpu · mem + tokens), with a live `docker info` host footer.
- **Contact gag** (human view) — a "hire me" check where **No** can't be clicked and the terminal `sudo reject-me` reveals the bait.
- **Live data** — all-time GitHub contributions fetched at runtime (public API, no token) with a static fallback.

## Stack

- **Next.js 16.2** (App Router) · **React 19.2** · **TypeScript 5** · **Tailwind CSS v4** · **Zustand 5**
- **Static export** (`output: 'export'`) → **GitHub Pages** (custom domain via `CNAME`, no `basePath`).
- Single `'use client'` tree under `app/page.tsx` → `components/layout/Terminal`. No routes (one session; the shell/scrollspy rely on a single page).
- `robots: noindex`; build injects the last git-commit time as `NEXT_PUBLIC_BUILD_TIME` (the "last updated" footer).

## Run it

Runtime is **bun only**:

```bash
bun install
bun run dev      # http://localhost:3000  (binds -H 0.0.0.0 for the WSL localhost fix)
bun run build    # static export → out/
bun run lint
bun run format   # Prettier + organize-imports
```

Dev/ngrok origins go in `.env` as `ALLOWED_ORIGINS` (comma-separated) → `allowedDevOrigins`.

## Deploy

- **Automatic:** `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push to `main` (repo **Settings → Pages → Source = GitHub Actions**).
- **Manual fallback:** `bun run deploy` (gh-pages).

## Architecture (short)

- **State** — Zustand slices (`session`, `navigation`, `projects`, `overlays`) combined in `store/terminal.ts`; components read copy via `hooks/useStrings` (`useStrings()` / `useHuman()`), effects live in `hooks/useTerminalEffects`.
- **Single sources of truth** — modes/langs in `lib/modes.ts`, constants in `lib/config.ts`, data in `lib/data/*` (one export per file), **all copy** in `lib/i18n.ts`, commands in `lib/commands/` (`registry.ts` = the single source for `help` + names, `run.ts` = behavior, `fs.ts` = virtual filesystem).
- Full conventions live in [CLAUDE.md](./CLAUDE.md).

## More

- **[CV.md](./CV.md)** — about the person behind it.
- **[CONSOLE.md](./CONSOLE.md)** — how to drive the terminal.
