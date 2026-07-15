# Vamsi Inampudi — Portfolio

Plain HTML / CSS / JS. No framework, no build step, no dependencies.

## Structure

```
portfolio/
├── index.html                          # main page (about, experience, projects, stack, contact)
├── css/style.css                       # all styling — one file, CSS variables at the top
├── js/main.js                          # nav toggle, scroll reveals, live-stat counters, card clicks
└── projects/
    ├── omniroot-agentic-ai.html        # full case-study page per project
    ├── atomsphere-nexus.html
    ├── genai-task-manager.html
    ├── trackwise-expense-analytics.html
    └── iot-smart-agriculture.html
```

Clicking any project card on the home page opens its own dedicated page with a full
write-up: overview, problem, architecture breakdown, feature list, and links.

## Run it locally

No install needed. From the `portfolio` folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` — or just double-click `index.html`.

## Edit content

- **Text / projects / experience** — edit directly in `index.html` and the files in `projects/`.
- **Colors, fonts, spacing** — all defined as CSS variables at the top of `css/style.css`
  under `:root`. Change `--cyan`, `--amber`, `--bg`, etc. and it updates everywhere.
- **Add a new project**:
  1. Copy any file in `projects/` as a template, update its content.
  2. Add a matching `<article class="proj-card" data-href="projects/your-file.html">…</article>`
     block inside `#projects` in `index.html`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Other** (it's static — no build command needed).
4. Deploy.

That's it — no environment variables, no build config.
