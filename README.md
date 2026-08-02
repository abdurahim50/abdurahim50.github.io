# portfolio

Plain HTML/CSS/JS portfolio for cybersecurity, cloud, DevOps, and homelab work.
No build step, no dependencies, no framework — edit a file, push, it's live.

**Live at:** https://abdurahim50.github.io/portfolio/

---

## 1. Publish it (10 minutes)

1. **Create the repo.** On GitHub, create a **public** repository named exactly
   `portfolio`. The name is what produces the `/portfolio/` path in the URL —
   rename the repo and the site URL changes with it (see §6 if you do).

2. **Push these files** to the repository root (not inside a subfolder):

   ```bash
   cd portfolio-site
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/abdurahim50/portfolio.git
   git push -u origin main
   ```

3. **Turn on Pages.** Repo → **Settings** → **Pages** → Source: **Deploy from a
   branch** → Branch: `main`, folder: `/ (root)` → Save. First build takes a
   minute or two.

4. **Check it.** Visit `https://abdurahim50.github.io/portfolio/`. Hard-refresh
   (Ctrl+Shift+R) if you see something stale — Pages caches aggressively.

> **Trailing slash matters.** `…/portfolio/` works;
> `…/portfolio` (no slash) gets redirected by GitHub, which is fine in a browser
> but can look broken if you paste it somewhere that doesn't follow redirects.
> Always share the version with the slash.

### Preview locally before pushing

```bash
cd portfolio-site
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk mostly works, but some browsers block
the project cards from rendering over `file://`. Use the server.

---

## 2. What still needs your input

Search the folder for `[EDIT ME]` — that's everything I couldn't fill in.

| What | Where | Status |
|---|---|---|
| Job title, employer, dates | `about.html` timeline | **`[EDIT ME]`** |
| School / cybersecurity programme | `about.html` timeline | **`[EDIT ME]`** |
| Homelab diagram image | `assets/img/homelab.png` | **missing** |
| Your CV | `assets/resume.pdf` | **missing** |
| Social preview card (1200×630 PNG) | `assets/img/og-card.png` | **missing** |
| Repo URLs for HumanGov, Django, AKS, Terraform library | `assets/js/projects.js` | point at your profile, not a repo |
| `starter: true` flags | `assets/js/projects.js` | 3 entries still marked |

Everything else — name, location, GitHub, LinkedIn, Medium, dev.to, Security+,
Network+, AWS SAA in progress, and eight real projects — is already filled in.

### The `starter — replace me` badge

Three project entries carry `starter: true`, which renders a dashed badge on the
card. It's an honest signal while a project is still a stub, and a reminder to
you. Delete the `starter: true` line once the entry is genuinely yours.

---

## 3. Customise it

### Adding a project

Open `assets/js/projects.js` and add an object to the `PROJECTS` array. Both the
home page and the projects page pick it up automatically.

```js
{
  title: "Project name",
  category: "security",        // security | cloud | devops | homelab
  summary: "What it does and what the outcome was.",
  tags: ["Terraform", "AWS"],  // ~5 max, or cards get noisy
  repo: "https://github.com/abdurahim50/repo-name",
  link: "writeups/my-post.html",   // or a Medium URL, or "" for none
  linkLabel: "Read writeup",       // or "Read on Medium"
  status: "live",              // "live" | "wip" | ""
  starter: false,              // true = dashed "replace me" badge
  featured: true               // shows on the home page — keep to 3-4
}
```

Adding a **new category**? Add it to `CATEGORY_LABELS` in the same file, and add
a matching `<button data-filter="yourcategory">` in `projects.html`.

### Adding a post

**Hosted here:**

1. Copy `writeups/_template.html` to `writeups/your-slug.html`
2. Fill in title, date, body — the template has every available block
3. Add an `<li>` to the top of the list in `writeups.html`, with
   `<span class="src src--here">Here</span>`
4. Add a `<url>` entry to `sitemap.xml`

**On Medium or dev.to:** just add an `<li>` to `writeups.html` with
`rel="noopener"` and `<span class="src">Medium</span>`.

### The homelab diagram

`index.html` has a placeholder panel in the homelab section. Draw the real thing
in [draw.io](https://app.diagrams.net/) or [Excalidraw](https://excalidraw.com/),
export a PNG to `assets/img/homelab.png`, and swap the placeholder for the
commented-out `<img>` block right above it. A diagram does more for that section
than another paragraph would.

### Changing the colours

Everything is driven by the variables at the top of `assets/css/style.css`. To
reskin the whole site, change `--accent` and `--accent-alt`. Both light and dark
themes have their own block; the toggle in the header switches between them and
remembers the choice. All colour pairs currently pass WCAG AA contrast — if you
change `--accent`, re-check it against `--bg`.

### Fonts

Space Grotesk + JetBrains Mono load from Google Fonts via two `<link>` tags in
each page `<head>`. Delete those tags and the site falls back to system fonts
cleanly. Worth doing if you'd rather not send visitors to Google.

### Custom domain

1. Add a file named `CNAME` at the repo root containing only your domain
2. At your DNS provider, add four `A` records for the apex pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (or a `CNAME` for `www` pointing to `abdurahim50.github.io`)
3. Repo → Settings → Pages → set the custom domain and tick **Enforce HTTPS**
4. A custom domain serves the site at the **root**, so drop the `/portfolio`
   segment everywhere — see §6.

---

## 4. Structure

```
portfolio-site/
├── index.html              Hero, featured projects, skills+certs, homelab, writing, CTA
├── projects.html           Full project grid with category filters
├── writeups.html           Combined post index — hosted here + Medium
├── about.html              Bio, timeline, certifications, principles, contact
├── 404.html                Custom not-found page
├── writeups/
│   ├── _template.html      Copy this to start a new post
│   ├── oidc-github-actions-aws.html
│   └── signing-images-with-cosign.html
├── assets/
│   ├── css/style.css       All styling; design tokens in :root
│   ├── js/projects.js      PROJECT DATA + card rendering
│   ├── js/main.js          Theme toggle, mobile nav, footer year
│   └── img/favicon.svg
├── robots.txt
├── sitemap.xml
├── .nojekyll               Stops GitHub ignoring _template.html
└── .gitignore
```

### Why the nav is duplicated in every page

There's no build step, so there's no way to include a shared header without
JavaScript — and a JS-injected nav is invisible to some crawlers and to anyone
with JS disabled. Eight copies is the honest trade. **If you change a nav link,
change it everywhere**, remembering that pages inside `writeups/` use `../`
prefixes.

---

## 5. Before you publish — checklist

- [ ] Every `[EDIT ME]` replaced or the entry deleted
- [ ] Every GitHub URL in `projects.js` actually opens
- [ ] Repos you link to are **public** (a 404 looks worse than no link)
- [ ] `starter: true` removed from anything you've now written up properly
- [ ] `assets/resume.pdf` exists, or the Resume buttons removed
- [ ] Homelab diagram added, or that panel's placeholder text softened
- [ ] Checked on a phone — the layout is responsive but your text might not be
- [ ] Nothing sensitive committed: no `.env`, no `*_accessKeys.csv`, no recovery
      codes, no real AWS account IDs in the writeups

That last one matters. Your `DEVOPS` folder has files like `AY_accessKeys.csv`,
`Ali_accessKeys.csv`, `terraform-ci_accessKeys.csv`, and
`ngrok_recovery_codes.txt` sitting next to project code. Keep them well away from
anything you `git add`, and rotate those credentials if they were ever committed
anywhere.

---

## 6. If the URL ever changes

The site is currently wired for `https://abdurahim50.github.io/portfolio/`. Every
link *between* pages is relative and will survive a move untouched. Only these
three things hardcode the path:

| File | What's hardcoded |
|---|---|
| `404.html` | Absolute paths — `/portfolio/assets/…`, `/portfolio/projects.html` |
| every `*.html` | `<link rel="canonical">` and the `og:url` / `og:image` tags |
| `sitemap.xml`, `robots.txt` | Full URLs |

**Renaming the repo** (e.g. `portfolio` → `site`): find-and-replace `/portfolio/`
with `/site/` across the folder.

**Moving to a user site** (`abdurahim50.github.io`, no path) **or a custom
domain**: delete the `/portfolio` segment entirely — in `404.html` that means
`/portfolio/assets/…` becomes `/assets/…` and `href="/portfolio/"` becomes
`href="/"`.

### A note on robots.txt

Crawlers only read `robots.txt` from the domain root, so `/portfolio/robots.txt`
is effectively ignored. That's harmless — nothing here needs blocking — but it
means you should submit the sitemap directly in
[Google Search Console](https://search.google.com/search-console) rather than
relying on the `Sitemap:` line to be discovered.

---

## 7. Optional additions

- **Analytics** — [GoatCounter](https://www.goatcounter.com/) or
  [Plausible](https://plausible.io/) are one script tag and don't need a cookie
  banner. Add before `</body>`.
- **RSS** — if you start publishing here regularly, hand-maintain a `feed.xml`.
- **Link checker in CI** — a GitHub Action running `lychee` on push will tell you
  when a repo you linked goes private or a Medium URL changes.
