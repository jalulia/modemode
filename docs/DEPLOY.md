# MODE MODE — deploying (push → live)

How code actually gets from an edit to the live site. Read this before trying to push.

## Short version
GitHub Pages serves the **repo root on the `main` branch**. Pushing to `main` deploys — Pages rebuilds in ~1 minute, then hard-refresh (⌘⇧R). No build step, no CI.

## Where push works — and where it doesn't
- **Push works from Julia's Mac.** `gh` is signed in as `jalulia` with `repo` scope, and git uses those credentials via the gh helper. The remote is **HTTPS**: `https://github.com/jalulia/modemode.git`. There is **no SSH key** on the machine — use the HTTPS remote, not `git@github.com:…`.
- **Push does NOT work from a Cowork / cloud session.** The cloud sandbox's git proxy isn't authorized for `jalulia/modemode`, so `git push` there fails with `403 … not in this session's authorized repository set`. A cloud session can *clone* (read) and *commit locally*, but those commits have to reach the Mac to be pushed.

## The working clone
There is a persistent clone on the Mac at **`~/modemode-deploy`** (HTTPS remote, gh auth). Reuse it. If it's missing, recreate it:
```bash
git clone https://github.com/jalulia/modemode.git ~/modemode-deploy
cd ~/modemode-deploy && gh auth setup-git   # once: makes git use the gh login
```

## Deploy from the Mac — the normal path
From `~/modemode-deploy`, on `main`, changes committed:
```bash
cd ~/modemode-deploy
git pull --ff-only        # take whatever's already on origin first
# ...commit your changes...
git push origin main      # → Pages redeploys automatically
```
Give Pages ~1 minute, then hard-refresh the live URL.

## Moving a cloud session's commits onto the Mac
Work is often built and headless-tested in a cloud session that can't push. Get its commits to `~/modemode-deploy`, then push from there. Two reliable ways:

**1. git bundle (preserves the exact commits).** The session writes a bundle of the new commits; it lands on the Mac (e.g. decoded to `/tmp/mm.bundle`). Verify the checksum, then:
```bash
cd ~/modemode-deploy
git fetch /tmp/mm.bundle <branch>:<branch>
git merge --ff-only <branch>
git push origin main
```

**2. Direct edits on the Mac clone.** For small changes, edit the files in `~/modemode-deploy` directly (by hand or via a session with device access), then `git commit && git push origin main`.

## Rules of thumb
- **Nothing is live until it's pushed to `main`.**
- Feature branches don't deploy — only `main` is served. Push a branch to review a diff; merge to `main` to ship.
- Deploying ships **code + the `content/*.json` fallback only**. Live project/About content lives in **Supabase** and is edited through `editor/` — a repo push does not touch it.
- Always `git pull --ff-only` before committing on the Mac so you don't fork `main`.
