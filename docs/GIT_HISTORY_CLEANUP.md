# Git History Cleanup Guide — Removing the Old Large Media

**I have no GitHub connection, no repository access, and no push
permissions.** This sandbox has no `.git` directory (verified directly).
I cannot run any command here, cannot see your commit history, and will
not claim anything is "cleaned" unless you report back what you actually
saw after running these yourself.

This is a **guide**, not a record of anything already done.

## STEP 0 — Backup

```bash
git clone --mirror <YOUR_REPOSITORY_URL> backup-kumed-smart-howto.git
```
Replace `<YOUR_REPOSITORY_URL>` with your real remote URL (see Step 1) —
I don't know it and won't guess one. Restore later with:
```bash
cd backup-kumed-smart-howto.git && git push --mirror <YOUR_REPOSITORY_URL>
```

## STEP 1 — Check remote / branch / status

```bash
git remote -v
git branch --show-current
git status
```
Confirms what you're about to operate on, and that you have no
uncommitted work that would get lost (commit or stash it first if so).

## STEP 2 — Find large files in history

```bash
git rev-list --objects --all |
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
  awk '/^blob/ {print substr($0,6)}' |
  sort -k2 -n -r |
  head -30
```
Lists the 30 largest objects ever committed, size and path, largest
first.

## STEP 3 — Identify which of those are the old media

Look at the paths Step 2 returned. Note down the **exact paths** of the
files you actually want gone — not a whole directory, since after you
add the new (small, correctly-sized) media into these same folders,
those folders will contain files you want to *keep*. Write down
something like:
```
public/images/floor-5/jongrak/OLD-DRIVER-DEMO.gif
public/images/floor-5/jongrak/OLD-DONGLE-DEMO-2.GIF
```
(placeholders — substitute the real paths/filenames Step 2 showed you).

## STEP 4 — Confirm which commits touched those exact paths

```bash
git log --all --oneline -- "public/images/floor-5/jongrak/OLD-DRIVER-DEMO.gif"
```
Run once per path from Step 3. This is your scope of impact before you
rewrite anything.

## STEP 5 — Clean the current working tree first

```bash
git rm --cached "public/images/floor-5/jongrak/OLD-DRIVER-DEMO.gif"
git rm --cached "public/images/floor-5/jongrak/OLD-DONGLE-DEMO-2.GIF"
git commit -m "Remove old oversized media from current tree"
```
This clears HEAD. It does **not** remove the blobs from history — that's
Step 7.

## STEP 6 — Backup / safety check (again, before the irreversible part)

Before rewriting history — the one step that's genuinely hard to undo —
re-confirm:
```bash
ls -la backup-kumed-smart-howto.git   # your Step 0 mirror still exists?
git status                             # working tree clean?
git log --oneline -5                   # Step 5's commit is there?
```
Don't proceed until all three look right.

## STEP 7 — Rewrite history (per-file, not whole-folder)

Use [`git filter-repo`](https://github.com/newren/git-filter-repo)
(not the older `filter-branch`). Install it first, then target the
**exact files** from Step 3 — never `--path <whole-directory>
--invert-paths`, since that would also strip any legitimate new media
you add to that same folder later:

```bash
git filter-repo \
  --path "public/images/floor-5/jongrak/OLD-DRIVER-DEMO.gif" \
  --path "public/images/floor-5/jongrak/OLD-DONGLE-DEMO-2.GIF" \
  --invert-paths
```
Substitute your real paths from Step 3. Add one `--path` line per file.
This rewrites every commit that touched those specific paths; commit
hashes from that point forward will change — expected and necessary.

## STEP 8 — Verify history

```bash
git rev-list --objects --all |
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
  awk '/^blob/ {print substr($0,6)}' |
  sort -k2 -n -r |
  head -10
git reflog expire --expire=now --all
git gc --prune=now --aggressive
du -sh .git
```
The files from Step 3 should no longer appear; `.git` size should have
dropped.

## STEP 9 — Build / QA (before pushing anything)

```bash
npm install
npx tsc --noEmit
npm run build
```
If this fails, `filter-repo` likely caught something you needed —
restore from the Step 0 backup and narrow your `--path` list.

## STEP 10 — Force push (⚠️ changes what's on GitHub)

**Read before running.** History will genuinely differ on the remote
after this. If anyone else has cloned this repo, tell them first — their
clone will diverge and they'll need to re-clone or hard-reset (saving
any local work first).
```bash
git push origin --force --all
git push origin --force --tags
```

## STEP 11 — Verify GitHub + Vercel yourself

I cannot see either of these. Check yourself:
- GitHub: commit history looks right, repository size dropped
  (Settings → General / sidebar widget), old commits don't show the
  large files when browsed
- Vercel (or your deploy platform): trigger a fresh deploy, confirm it
  builds and the site loads; clear build cache if anything looks stale

**Only report this as done once you've verified it yourself** — I won't
claim GitHub or Vercel are clean based on my own knowledge, since I
have no access to check.

## STEP 12 — Fresh clone proof

```bash
cd /somewhere/else
git clone <YOUR_REPOSITORY_URL> test-clone
cd test-clone
npm install && npx tsc --noEmit && npm run build
du -sh .git
```
A fresh clone that builds correctly with a reasonable `.git` size is the
real end-to-end proof — not "it worked on the machine I ran the rewrite on."

## If something goes wrong

```bash
cd backup-kumed-smart-howto.git
git push --mirror <YOUR_REPOSITORY_URL>
```
Then re-clone fresh and restart from Step 2 with more care.
