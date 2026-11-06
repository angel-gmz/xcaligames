---
name: web-design
description: >-
  Use this skill when the user asks to design, redesign, style, or audit web pages,
  UI components, landing pages, game showcases, or blog layouts. Enforces high-craft
  visual hierarchy, accessibility (WCAG AA), responsive layout patterns, micro-interactions
  with zero/minimal client JS, and 100/100 Core Web Vitals in Astro + Tailwind CSS.
---

# Web Design & High-Performance UI Skill

Follow these design principles and procedures whenever creating or refining web interfaces, landing pages, or components in this workspace.

## 1. Visual Direction & Brand Aesthetics (Xcali Games)

The brand comes from Torchbound: a torchlit card table in a dark dungeon. Tokens live in `src/styles/global.css` (`@theme`), use them instead of raw hex values.

- **Palette**: `night #0A0C14` (canvas), `crypt #15101C` / `crypt-2 #1E1626` (surfaces), `line #33283A` (borders), `gold #E0B45A` (brand, headings, primary button), `ember #FF9A3C` (torchlight glow, focus ring), `parchment #F4E9D8` (cards and main text), `ash #C9BBA6` (secondary text). Card suits: `monster #C2412D`, `weapon #4A9BE0`, `potion #E0569A`.
- **Riserift** keeps its own accent `rift #5AD0FF`, used only inside Riserift content.
- **Typography**: `Cinzel` 600 for headings (`font-display`), `Alegreya Sans` 500/700/800 for body (`font-sans`). Both self-hosted in `/public/fonts`, same as the game. Sentence case; no monospace HUD labels, no ALL-CAPS eyebrows.
- **Signature element**: the playing card (`.card` + `card-monster|weapon|potion`, component `PlayingCard.astro`). Use real cards to explain rules instead of generic feature cards.
- **Shapes**: rounded game-UI panels (`rounded-2xl`), pill buttons (`btn-ember rounded-full`). No clipped HUD corners.
- **Motion**: one orchestrated moment only (the hero card deal, `.deal`). Respect reduced motion.
- **Copy**: plain Spanish (es-MX), describe what the game really does (Scoundrel rules, daily challenge, 5 heroes, offline, free). Always credit Scoundrel to Zach Gage and Kurt Bieg.

## 2. Core Web Vitals & Technical Constraints (100/100 PageSpeed)

1. **Zero Client JS by Default**:
   - Prefer pure CSS transitions (`transition`, `duration-300`, `hover:scale-[1.02]`), CSS Grid/Flexbox, and native HTML elements (`<details>`, `<dialog>`) over client-side JavaScript frameworks.
2. **Zero Layout Shift (`CLS = 0`)**:
   - Always use `astro:assets` `<Image />` with explicit `width` and `height` attributes.
   - Above-the-fold Hero/LCP images must use `loading="eager"` and `fetchpriority="high"`.
   - Below-the-fold images must use `loading="lazy"`.
3. **Zero External Font Requests**:
   - Never inject `<link href="https://fonts.googleapis.com/...">`. Use only self-hosted `.woff2` fonts in `/public/fonts/` with `font-display: swap`.

## 3. UI/UX & Accessibility Checklist (WCAG AA)

- **Contrast**: Ensure text contrast is at least `4.5:1` for normal text (`text-slate-200` / `text-slate-300` on dark backgrounds) and `3:1` for large headings and UI components.
- **Interactive States**: Every button and link must have visible `:hover`, `:focus-visible`, and `:active` states.
- **Semantic HTML5**:
  - Use `<header>`, `<nav>`, `<main>`, `<section aria-labelledby="...">`, `<article>`, `<aside>`, and `<footer>`.
  - Maintain a single `<h1>` per page and sequential heading levels (`h1` -> `h2` -> `h3`).
- **Touch Targets**: Mobile buttons and interactive links must have a minimum hit area of `44x44px` (`py-2.5 px-4` or larger).

## 4. Verification Step

After creating or modifying any UI component or page:
1. Run `npm run build` (`astro check && astro build`) to verify there are 0 TypeScript/Astro errors and that all images and styles compile cleanly.

