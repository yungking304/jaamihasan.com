# jaamihasan.com

Portfolio site for Jaami Hasan — Technical PM, iOS Developer, Founder @Ascendance.

Built with vanilla HTML/CSS/JS. No frameworks, no build step, no dependencies.
Hosted on GitHub Pages with a custom GoDaddy domain.

---

## Deploy in 20 minutes

### Step 1 — Create the GitHub repository

1. Go to github.com and log in as **yungking304**
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `jaamihasan.com` (must match the domain exactly)
4. Set to **Public**
5. Do NOT check "Add README" — we have our own
6. Click **Create repository**

### Step 2 — Upload the files

In the new empty repository page, click **uploading an existing file**.

Upload ALL files from this folder:
- `index.html` ← the portfolio site
- `game.html` ← the Phantom Grid game (rename your game prototype to this)
- `CNAME` ← tells GitHub Pages your domain
- `README.md` ← this file

Click **Commit changes**.

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab)
2. In the left sidebar, click **Pages**
3. Under "Source", select **Deploy from a branch**
4. Branch: **main** · Folder: **/ (root)**
5. Click **Save**

GitHub will show: *"Your site is ready to be published at https://yungking304.github.io/jaamihasan.com"*

Wait 2-3 minutes. Then check that URL — your site should be live there.

### Step 4 — Connect GoDaddy to GitHub Pages

Log into GoDaddy → go to your **jaamihasan.com** domain → **DNS** settings.

**Delete** any existing A records or CNAME records pointing to GoDaddy.

**Add these 4 A records** (GitHub Pages IPs):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

**Add this CNAME record**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | yungking304.github.io | 600 |

Save all records.

### Step 5 — Finalize custom domain in GitHub

Back in GitHub → repository Settings → Pages:
1. Under "Custom domain", type: `jaamihasan.com`
2. Click **Save**
3. Check **Enforce HTTPS** (may take a few minutes to appear)

### Step 6 — Wait for DNS propagation

GoDaddy DNS usually propagates in **10–30 minutes**.
After that, `jaamihasan.com` will load your portfolio.

You can check propagation status at: https://dnschecker.org/#A/jaamihasan.com

---

## File structure

```
jaamihasan.com/
├── index.html     ← portfolio site (DO NOT RENAME)
├── game.html      ← Phantom Grid game prototype (rename your file to this)
├── CNAME          ← custom domain config for GitHub Pages
└── README.md      ← this file
```

## Updating the site

Any time you push changes to the `main` branch, GitHub Pages redeploys automatically in ~60 seconds.

When the App Store version ships:
1. Update the "IN DEVELOPMENT" badge to "NOW ON APP STORE"
2. Update the appstore-strip section with the real App Store link
3. Push the change — live in 60 seconds

---

Built by Jaami Hasan · 2026
