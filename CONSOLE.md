# Using the terminal

The **developer** view of [bromscandium.com](https://bromscandium.com) is a real command line. Here's how to drive it.

## Opening it

- Press **`` ` ``** (backtick) or click **`❯ open terminal`** at the bottom of the screen.
- The command line exists only in the **developer** view. In **human-being** view there are no commands — switch views from the status bar (bottom-right) or with `git checkout developer`.
- Type **`help`** for the live command list, or **`man`** for keyboard shortcuts.

## Commands

### Filesystem
The terminal has a virtual filesystem rooted at `~` → `portfolio/` → the sections → `projects/<slug>`.

| Command | What it does |
|---|---|
| `help` · `help <cmd>` | list commands · details for one (works on easter eggs too) |
| `cd <dir>` · `cd ..` · `cd ~` | change directory (updates the prompt path; no scroll) |
| `ls` · `tree` | list the current directory · interactive site tree |
| `pwd` | print working directory |
| `open <project> [--live]` | open a project window · `--live` opens its live URL |
| `grep <term>` | search across projects & skills |
| `./close.sh` | close the terminal (run it from `~`) |
| `./hire-me` | jump to the hire form |

### Sections (these scroll the page)
| Command | Section |
|---|---|
| `git log [--graph]` | Experience (work history) |
| `git tag -l work/*` · `study/*` · `hackathons/*` | Experience, filtered |
| `git branch` · `git checkout <view>` | list / switch **view** (developer · human-being) |
| `docker ps` · `docker images` · `docker inspect <region>` | Skills (as containers) |
| `contact` · `contact --open` · `contact --close` | Contact (list · jump · hide) |

### Info
`whoami [-v]` · `neofetch` · `uname` · `uptime` · `date` · `history` · `echo` · `email` · `github` · `linkedin` · `man`

### Fun
- **`cmatrix`** — full-screen matrix rain (rare falling words). `Esc` exits, `f` toggles fullscreen.
- **`crt`** — retro CRT scanline mode (persists across visits; run `crt` again to turn off).
- `clear` · `exit` (`:q` also closes the panel)

## Git & Docker, in detail

`git` and `docker` validate their arguments — an unknown flag is ignored **with a warning** rather than silently, so `git log` and `git log --graph` (and `git log -whatever`) each do their own thing:

```
❯ git log -zzz
warning: ignoring unknown argument '-zzz'
commit f8ad40e (HEAD -> main)
  Full-Stack Engineer — Self-employed & Open Source
  …
```

`git` also understands `status · commit · push [--force] · pull · fetch · diff · stash · reset · rebase · remote · config · blame` (with the usual aliases `st`/`co`/`br`/`lg`). `docker ps` accepts `--filter label=<region>`.

## Easter eggs

Half the fun is undiscovered — a few pointers:

- **`git checkout human-being`** switches the whole site to the other view (branch = view).
- **`sudo pacman -Syu`**, `sudo hire`, `pacman`, `yay`/`paru` — Arch things.
- `mkdir`, `touch`, `rm -rf /`, `ps`, `top`, `ping`, `curl`, `vim` — try them.
- `git blame`, `git push --force`, `git commit` (with no message), `git reset` — cheeky replies.
- `cat cat.txt` 🐱 · and the hire gag: on the contact card **No** dodges — the terminal's `sudo reject-me` reveals why.
- `help <anything-hidden>` will confirm an easter egg exists without spoiling it.

## Keyboard shortcuts

| | |
|---|---|
| `j` / `k` · `↓` / `↑` | next / previous section |
| `g` / `G` | first / last section |
| `1 … 5` | jump to a section |
| `h` / `l` · `←` / `→` · `[` / `]` | previous / next tab |
| `⌥1 … ⌥4` | open a specific tab |
| `t` / `w` | open / close tab |
| `⌃K` / `⌘K` | command palette |
| `f` | toggle fullscreen |
| `/` | search projects |
| `?` | keyboard help (`man`) |
| `Esc` | close the topmost overlay / modal |

**In the command line:** `Tab` autocompletes (cycles the menu), `↑`/`↓` walk history, `→`/`End` accept the ghost suggestion, `⌃C` interrupts.

> Navigation/tab keys pause while you're typing or while the command line is open — but `Esc`, `⌃K`/`⌘K` and `` ` `` always work.
