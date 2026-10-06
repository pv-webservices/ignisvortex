# Ignis Vortex — redesign verification

Verified 7 October 2026 against the compiled static site (`astro preview`).

## Results

| Check | Result |
| --- | --- |
| Astro / TypeScript diagnostics | 0 errors |
| Production build | 32 content pages + custom 404 |
| `npm run verify` | 0 errors — unique titles/descriptions, internal links, image references, JSON-LD, sitemap, source-file exclusion |
| Media / poster / `srcset` files | all referenced files exist |
| Responsive sweep (`npm run qa`) | 256 checks: 32 pages × 320, 375, 430, 768, 1024, 1280, 1440, 1920px |
| Horizontal overflow | none |
| Browser image failures / console errors | none |
| Axe WCAG 2 A/AA + 2.1 AA | 0 violations on all 32 pages |
| Scroll reveals | all 58 homepage reveals trigger at 1440px and 375px |
| API key exposure | key absent from `dist/`, `src/`, `public/`, `scripts/` |

## Interactions verified

Mobile menu (dialog, focus trap, Escape restores focus) · desktop mega-menu keyboard entry · FAQ keyboard toggles · service/product/training query prefill · invalid form blocked with field highlighting · valid form produces a visible mailto draft and states nothing was sent · editing invalidates the draft · both client videos defer loading, then play (78.5 s and 30 s) · reduced motion disables non-essential motion · content readable without JavaScript · unknown route returns 404.

## Issues found and fixed during QA

- Image “clip” reveals never triggered: Chrome’s IntersectionObserver honours the target’s own `clip-path`. The clip now animates the child element.
- Sideways slide-in reveals caused ~20px horizontal overflow on phones before animating; they slide vertically under 900px.
- Low-contrast text in the codes marquee and light software table; invalid `<dl>` markup on service pages.
- Mega-menu `visibility` was transitioned on open, so an immediate Tab could skip it; visibility now flips instantly.

## Delivery boundaries

Not deployed; live-domain checks and Core Web Vitals are not claimed. Enquiries prepare email drafts only — no form backend. No phone/WhatsApp number was supplied, so none is shown.
