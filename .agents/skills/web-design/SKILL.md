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

## 1. Visual Direction & Brand Aesthetics (XcaliGames)

- **Theme Polarity**: Intentional Dark Mode (`#090d16` primary canvas, `#111827` elevated surface, `#161f33` interactive cards) with subtle translucent borders (`border-slate-800/80`).
- **Game Accents**:
  - **Torchbound**: Warm ember/flame palette (`#f97316` orange-500, `#fbbf24` amber-400, `#dc2626` red-600) evoking firelight in dark dungeons.
  - **Riserift**: Dimensional cyan/sky palette (`#38bdf8` sky-400, `#0284c7` sky-600) evoking fractures and vertical energy.
- **Typography & Hierarchy**:
  - Display / Headings (`--font-display` / `SpaceGroteskLocal`): Bold weights (`700–800`), tight tracking (`tracking-tight`), clear visual contrast.
  - Body Copy (`--font-sans` / `InterLocal`): Comfortable reading width (`60ch–72ch`), generous line height (`leading-relaxed`).

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

