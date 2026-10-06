# Ignis Vortex

Static, multi-page business website for **Ignis Code & Plan Review Services LLC** (Ignis Vortex) — fire protection, life safety and civil engineering consultancy with fire safety products, installation and commissioning.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev        # http://localhost:4321/
npm run check      # Astro / TypeScript diagnostics
npm run build      # static output in dist/
npm run verify     # links, images, metadata, schema, sitemap
npm run preview
npm run qa         # browser QA: 32 routes × 8 widths, Axe, interactions (needs preview running)
```

`dist/` is the publishable output. Serve `404.html` for missing pages and support directory URLs. Canonical domain: `https://www.ignis-vortex.com`.

## Structure

- `src/data/site.ts` — all business content (services, products, sectors, leadership, software table, offices).
- `src/styles/` — design system: `base.css` (tokens, type, buttons, motion), `chrome.css` (header, menus, footer, page hero, CTA), `sections.css` (homepage sections), `pages.css` (inner pages, forms).
- `src/components/` — shared components; `home/` holds homepage-only sections, `pages/` holds page-family content.
- `src/scripts/site.ts` — progressive enhancement (menu, reveals, counters, service explorer, product rail, videos). Every page works without JavaScript.
- `public/assets/` — optimised WebP images (`gen/` = AI-generated); `public/media/` — compressed client videos and posters.

## Design system (summary)

Brand red `#c90815` on charcoal ink `#0c1114` and warm paper `#f5f3ef`. Archivo (variable, condensed width axis) for display, IBM Plex Sans for body, IBM Plex Mono for technical labels. Engineering-drawing details: blueprint grids, registration corners, cut-corner buttons with directional fills (no shine/glow effects). Motion uses transform/opacity only and respects `prefers-reduced-motion`.

## AI image generation (server-side only)

```sh
cp .env.example .env              # add OPENAI_API_KEY (never commit)
npm run images:plan               # show model/quality/size routing
npm run images                    # generate missing images
npm run images -- --only=hero-pump-room --force
npm run images -- --escalate=prod-detection --force   # retry an asset on the premium model
```

Models, quality tiers, sizes and optimisation are configured in `scripts/images/config.mjs` (overridable via env vars); jobs and prompts live in `scripts/images/manifest.mjs`. See `ASSETS.md` for provenance.

## Enquiries

Forms validate and prepare a **visible email draft** (mailto). Nothing is sent or stored by the website; the visitor sends the email from their own client. To enable direct delivery later, connect a server-side endpoint with validation and rate limiting.

## Source materials

`client-materials/` (git-ignored, never deploy) holds the client DOCX, legal PDFs, original artwork, original videos and generated image originals.
