# HS Code Lookup

A static prototype of an HS Code (Harmonized System) lookup page, built on the
17TRACK design system. Search by product description or six-digit code and read
the classification, the drill-down path, and the destination tariff lines.

This is a front-end demo. The tariff rows are illustrative, not valid for a
customs filing.

## Run it

Any static file server works. From the project root:

```bash
python3 -m http.server 4180
```

Then open <http://localhost:4180/>.

Opening `index.html` directly from the file system also works, but a server is
recommended so the fonts and SVG assets load with correct MIME types.

## Layout

```
index.html            Page markup: notice bar, header, hero, results, chapters, FAQ, footer
assets/site.css       17TRACK design system: tokens, header, nav, footer, buttons
assets/hs.css         Page layer: lookup card, candidate cards, tables, chapter wizard, ad slot
assets/app.js         Search, refine chips, destination tabs, chapter drill-down, clipboard
assets/hs-data.js     Demo dataset: chapters, headings, subheadings, US/EU/CN tariff rows
assets/globe.js       Animated dot-sphere in the hero
assets/ads/           Responsive ad banner (320×50 → 970×90)
assets/fonts/         Inter (latin subset)
assets/footer/        Footer logo, app badges, social icons
assets/nav/           Nav preview artwork
```

## What it does

- **Search** by description ("cotton T-shirt") or code ("610910"), then refine
  the candidate list with the filter chips.
- **Destination tabs** switch the tariff schedule between US (HTSUS), EU (CN)
  and China. Movement toggles between import and export.
- **Chapter drill-down** opens a panel that walks chapter → four-digit heading →
  six-digit subheading, ending in a copyable answer card.
- **FAQ** is a native `<details>` accordion; one panel is open at a time.

## Responsive behavior

Content is capped at 1440px with 24px side padding. The ad banner reflows by
container query: 320×50, 468×60, 728×90, then 970×90 on wide screens. The nav
collapses to a menu button below 1024px.

The hero is a two-column grid: copy and lookup card on the left, a 300×600
rail ad on the right. Below 1024px the rail ad is hidden and the banner slot
keeps the full width.

## Data

Chapter 01 carries the full six-digit dataset. Other chapters hold a small
sample so the drill-down works end to end. Chapter 99 is reserved for
country-specific provisions.

Rates change. Confirm against the published schedule before filing anything.
