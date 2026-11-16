# Ilisus: ITOM 6216 Lab 5 build

Class copy of the Ilisus site. Not the official site, and set up so search engines skip it.

## What is in here

| File | What it does |
|---|---|
| `index.html` | Landing page: AI video hero (autoplay, muted, loop), "What is Ilisus?" button, featured experiences, Make the Call, X-Factor note |
| `about.html` | Second page: what Ilisus is, the name, beliefs, how it works, learning, AI, sources |
| `assets/chat.js` | Chatling bot on both pages (Bot 2, chatbotId 1249915198) |
| `assets/site.js` | Intro animation, video controls, Make the Call game |
| `assets/site.css` | All styles |
| `media/hero.webm` | Placeholder animation. Add your Gemini video as `media/hero.mp4` and it plays instead. |
| `robots.txt`, `_headers` | Tell search engines not to crawl or index the site |
| Images | Public domain paintings loaded from Wikimedia Commons |

## 1. Make the AI video in Gemini

Prompt:

> A slow 5 second cinematic push-in on an old hand-drawn 18th century map of the American colonies on aged parchment, lit by warm candlelight. As the camera moves, the ink rivers begin to flow with soft turquoise water, tiny columns of soldiers start marching along the roads, and a small golden sun glows in the upper right corner. Painterly, elegant, calm. No text, no people's faces. 16:9.

Download it, rename it `hero.mp4`, and upload it into the `media` folder. The page plays `hero.mp4` first and falls back to the placeholder. Keep it under 25 MB (GitHub's web upload limit).

## 2. Put it on GitHub

1. Create a repo (example: `ilisus-lab5`).
2. **Add file > Upload files.** Drag in everything inside this folder (not the folder itself). Commit.

## 3a. GitHub Pages (what the lab asks for)

Settings > Pages > Source: **Deploy from a branch** > `main` / `(root)` > Save.
URL: `https://<your-username>.github.io/ilisus-lab5/`

Free GitHub Pages needs a **public** repo, so the code is viewable on GitHub.

## 3b. Cloudflare Pages (`*.pages.dev`)

Cloudflare dashboard > Workers & Pages > Create > Pages > **Connect to Git** > pick the repo.
Framework preset: **None**. Build command: blank. Output directory: `/`. Deploy.
URL: `https://<project-name>.pages.dev`

Works with a **private** repo. `_headers` adds a no-index header on every page here.

## 4. Before you submit

- [ ] Open the URL in a private window. Video plays and loops on its own.
- [ ] "What is Ilisus?" button opens the second page.
- [ ] Chat bubble shows on both pages and the bot answers.
- [ ] Make the Call works and the X-Factor note shows at the bottom of the home page.
- [ ] If the chat bubble does not show: in Chatling, check Widget Settings for an allowed domains list and add your site's domain.
