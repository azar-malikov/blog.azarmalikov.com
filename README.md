# blog.azarmalikov.com

A static, multilingual, cybersecurity-focused personal publishing system built with **Astro**, **TypeScript**, **Tailwind CSS**, and **MDX**. Content is file-based, versioned in Git, and designed for **Cloudflare Pages** (free tier) with a custom subdomain.

## Why Astro

- **Static-first**: fast edge delivery, minimal runtime, excellent SEO.
- **MDX**: serious long-form writing plus structured components for writeups (stages, callouts, command blocks).
- **TypeScript**: shared content helpers, safer refactors as the knowledge base grows.
- **Modular growth**: new content types add folders + small loader updates, not framework churn.

## Architecture overview

- **UI + routing**: `src/pages/[lang]/…` with locales `en`, `az`, `tr`, and scaffolded `ru`.
- **i18n**: UI strings in `src/lib/i18n/ui.ts`; article-level languages via parallel MDX files per folder.
- **Content**: `content/<type>/<id-or-slug>/meta.json` + `en.mdx` / `az.mdx` / `tr.mdx` (translation workflow).
- **Relationships**: `meta.json` `links` blocks connect blog ↔ glossary ↔ cheat sheets ↔ checklists ↔ notes.
- **Search**: build emits `dist/search-index.json` via `scripts/emit-search.mts` (after `astro build`).
- **Pagefind**: optional full-text search over built HTML (`npm run build` runs Pagefind on `dist/`).

### Visibility model (honest security)

- Content supports `visibility: public | verified | private` metadata.
- **This repo is a public static site**: there is no real authentication on the edge yet.
- **Do not** rely on hidden URLs or `localStorage` for protection. For restricted content later, use **Cloudflare Access** (or similar) in front of paths, or move sensitive drafts out of the public repository.

## Local development

Requirements: **Node.js 20+** and **npm**.

```bash
npm install
npm run dev
```

Visit the local site (default `http://localhost:4321/`) — root redirects to `/en/`.

## Build & preview

```bash
npm run build
npm run preview
```

`build` runs:

1. `astro build`
2. `node --import tsx ./scripts/emit-search.mts dist` to write `search-index.json`
3. `pagefind` to index the `dist/` output (search UI can be extended to load Pagefind)

## Content authoring

### Blog post

Create `content/blog/<slug>/meta.json` plus at least one `en.mdx` (or `az.mdx`, `tr.mdx`, …).

- **Shared metadata**: categories, tags, cover image, translation status, links.
- **Per-language body**: MDX in locale files; import shared components from `@/components/mdx/*`.

### Writeup

Same pattern under `content/writeups/<slug>/`. Use `<Stage id="…">` components for lab stages; set `stageOrder` and `stageLabels` in `meta.json` for the sticky sidebar.

### Cheat sheet

`content/cheatsheets/<id>/meta.json` + locale MDX. Use `promotedFrom` to record lineage back to writeups.

### Checklist

JSON under `content/checklists/<id>.json` (shared across locales for now; routes exist per language).

### Glossary

`content/glossary/<slug>/meta.json` + locale MDX.

### Notes & research

`content/notes/<id>/` and `content/research/<slug>/` with `meta.json` + MDX.

### Shared snippets

`content/shared/snippets.json` — reusable IDs referenced by cheat sheets and writeups.

## Translation workflow

1. Author the **source** language first (record `translation.sourceLocale` in `meta.json`).
2. Add `updatedAtByLocale` when editing a locale file.
3. `translation.statusByLocale` tracks `source | current | draft | stale | missing`.
4. The UI can show a **stale translation** banner when a translation edit date trails the source (blog + glossary).
5. **Future automation**: add a CI job that calls a translation API, writes draft MDX, and opens a PR for manual edit (not enabled by default).

### Adding a new UI language

1. Add the locale to `SITE.locales` and `SITE.publicLocales` in `src/lib/constants.ts` (and `STATIC_LOCALES` in `src/lib/i18n/routing.ts` if it should generate routes).
2. Add UI strings in `src/lib/i18n/ui.ts`.
3. Create `xx.mdx` files alongside existing locale files where needed.

## Deploying to Cloudflare Pages

1. Push this repository to **GitHub**.
2. In Cloudflare Pages: **Create project** → connect the repo.
3. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Environment: Node **20** or **22** (match local).

### Custom domain (`blog.azarmalikov.com`)

1. Cloudflare Pages → your project → **Custom domains** → add `blog.azarmalikov.com`.
2. DNS: CNAME `blog` → `<your-pages-subdomain>.pages.dev` (or follow Cloudflare’s wizard if the domain is on Cloudflare).
3. Enable **HTTPS** (automatic on Cloudflare).

### Continuous deployment

Every push to the tracked branch triggers a new build. Use PR previews if enabled in Pages settings.

## Troubleshooting

- **`search-index.json` missing in dev**: it is generated during `npm run build`, not `dev`. Search still loads if the file exists in `public/` (optional copy) or after a local build.
- **MDX cannot resolve `@/` imports**: `astro.config.mjs` aliases `@` to `./src`; restart dev server after config changes.
- **RSS or sitemap oddities**: `site` in `astro.config.mjs` must be the canonical origin (`https://blog.azarmalikov.com`).
- **Trailing slashes**: the site uses `trailingSlash: 'always'`; prefer `localizedPath()` for internal links.

## Roadmap (protected content & advanced workflows)

- Cloudflare **Access** policies for `/private/*` or preview branches.
- Authenticated notes API + edge KV/D1 (only if you accept operational complexity).
- CI translation drafts + manual review gates.
- Client-side checklist progress stored in **localStorage** (optional) or synced to an API for signed-in users.

## Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Dev server                 |
| `npm run build`  | Production build + search  |
| `npm run preview`| Preview the `dist` output  |
| `npm run typecheck` | `astro check` (if configured) |

## License

Private personal project — adjust as you prefer.
