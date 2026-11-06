# jaamihasan.com

**Live:** [jaamihasan.com](https://jaamihasan.com)

Personal site and portfolio for Jaami Hasan — QA & HACCP supervisor turned builder. The site is the front door to everything I ship: a native iOS game, a trading school, a web agency, and the command-center dashboard that runs them.

It's also a deliberate engineering exercise: a multi-page, Apple-style site with a playable game embedded in the homepage, built with **zero frameworks, zero build step, and zero dependencies**.

## What's here

| Page | What it does |
|---|---|
| `index.html` | Home — hero, résumé timeline, project grid, "Now" section, and a **playable browser build of The Phantom Grid** |
| `game.html` | Standalone web port of The Phantom Grid (15 levels, enemy AI, per-level leaderboards) in ~1,200 lines of vanilla JS + Canvas |
| `hq-tour.html` | Interactive, click-anything walkthrough of **Business HQ**, my Cloudflare-Workers dashboard — a working replica with mocked data |
| `career.html` | Experience, certifications, and selected QA/automation work |
| `development.html` | Apps & software |
| `music.html` · `visuals.html` | King J beats, photo & video |
| `tap/` | Short link for the NFC networking card → `jaamihasan.com/tap` |
| `hq-privacy.html` · `hq-terms.html` · `privacy.html` | Policy pages required for App Store / API integrations |

## The projects it links to

| Project | Stack | Status |
|---|---|---|
| **The Phantom Grid** — native iOS arcade game | Swift, SpriteKit | [Live on the App Store](https://apps.apple.com/app/the-phantom-grid/id6785081612) · [web port source](https://github.com/yungking304/phantom-grid-web) |
| **Business HQ** — one dashboard running four businesses (lead gen, auto-posting, shop, crypto paper-trading) | Cloudflare Workers, D1, Gmail API, AI-assisted review | [demo](https://jaamihasan.com/hq-tour.html) · [architecture](https://github.com/yungking304/business-hq-showcase) |
| **The Candle** — beginner futures-trading school | Cloudflare Workers + D1, Stripe, Resend, video pipeline | [thecandle.io](https://thecandle.io) · [how it's built](https://github.com/yungking304/the-candle-showcase) |
| **Cerulane** — websites for local businesses, with an automated prospecting engine | Cloudflare, PayPal Invoicing | [cerulane.com](https://cerulane.com) |

## Design & engineering choices

- **No framework, no bundler.** Three CSS files, three JS files, static HTML. Every page loads in a single request and can be edited in any text editor — the site will still work in ten years.
- **Game in the page.** The homepage game is the real Phantom Grid ruleset ported to Canvas, not a video. Grid movement, dig-a-hole mechanics, enemy pathing and level-clear logic all run client-side.
- **Apple-style system.** Shared design tokens for type, spacing and color across every page; honors `prefers-reduced-motion`.
- **Deploy = `git push`.** GitHub Pages on `main`, custom domain via `CNAME`, HTTPS enforced. Live in about 60 seconds.

## Run locally

No install. Clone and open `index.html`, or:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Layout

```
.
├── index.html            # home + embedded game
├── game.html             # standalone game
├── hq-tour.html          # Business HQ interactive demo
├── career.html · about.html · development.html · music.html · visuals.html
├── assets/
│   ├── css/  home.css · inner.css · hq-tour.css
│   ├── js/   home.js  · inner.js  · hq-tour.js
│   └── img/
├── tap/                  # /tap short link
└── CNAME                 # custom domain for GitHub Pages
```

---

**Jaami Hasan** · [LinkedIn](https://www.linkedin.com/in/jaamihasan) · [GitHub](https://github.com/yungking304) · Bryan / College Station, TX
