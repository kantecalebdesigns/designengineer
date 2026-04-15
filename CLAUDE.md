# Design Engineer Portfolio — CLAUDE.md

## Overview

Personal portfolio website for a **Design Engineer**. The site should feel like a product, not a gallery. Premium, modern, minimal — inspired by portfolios from Apple, Vercel, Linear, Stripe, and chiefpriest.design.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Fonts:** Instrument Sans (body), Libre Caslon Text (serif headings), Geist (fallback)
- **Media:** Next/Image, HTML5 video
- **Deployment:** Vercel

## Design System

### Colors
- Background: `#0a0a0a`
- Primary text: `#f5f5f5`
- Secondary text: `#888888`
- Muted/labels: `#555555`
- Borders/strokes: `#1a1a1a` – `#222222`
- Accent: `#6aafff` (blue) — used sparingly for hover states, headings, dots, and interactive highlights
- Selection: `#6aafff30` background

### Typography
- Body font: Instrument Sans (`--font-instrument-sans`)
- Serif headings: Libre Caslon Text (`--font-serif`) — used for hero heading and about statement
- Hero headings: serif, very large, bold, tight tracking, blue accent dot
- Section labels: small, uppercase, wide tracking, muted color (`#555`)
- About category headings: small, uppercase, blue accent (`#6aafff`)
- Body: readable but understated, `#ccc` or `#888`
- Whitespace is a design feature — generous spacing between sections

### Motion
- Subtle fade-in on scroll (`opacity` + `y` translate)
- Smooth ease curves: `[0.16, 1, 0.3, 1]` for entrances, `[0.25, 0.1, 0.25, 1]` for general transitions
- Small hover transitions (scale, color)
- `viewport: { once: true }` — animate only on first appearance
- No exaggerated effects or distracting motion
- Exception: hero carousel has a subtle bounce entrance (scale up + overshoot y) to draw attention
- Hero carousel auto-advances every 4 seconds

## Project Structure

```
/app
  layout.tsx          — Root layout, fonts (Instrument Sans, Libre Caslon, Geist), metadata
  globals.css         — Tailwind v4 imports, CSS variables (--accent), selection styles
  page.tsx            — Home: Hero → Marquee → Projects → About → Footer
  /projects/[slug]
    page.tsx          — Dynamic project detail pages (serif headings, blue accents)
/components
  navbar.tsx          — Fixed nav, "kante.design" logo, smooth scroll, bottom border stroke
  hero-carousel.tsx   — Swipeable auto-advancing media carousel with blue active dot
  project-card.tsx    — SVG-masked visual card with hover zoom + blue accent line
  section-wrapper.tsx — Reusable fade-in-on-scroll wrapper
  marquee.tsx         — Infinite horizontal conveyor belt of design screen placeholders
  footer.tsx          — Minimal footer with social links, blue hover accents
/data
  projects.ts         — Project data array + TypeScript interface
/public
  /projects           — Project images (add here)
```

## Layout

Single page with dynamic project pages.

### Sections (home)
1. **Hero** — two-column (2fr/3fr): serif title with blue dot + subtitle (left), swipeable carousel (right). ~80vh.
2. **Marquee** — infinite horizontal scroll of design screen placeholders.
3. **Projects** — vertical list of SVG-masked 16:10 visual blocks with blue hover accents. Most important section.
4. **About** — large serif statement, three-column narrative (Design/Engineering/Product), tech pills with blue hover.
5. **Footer** — border-top stroke, copyright, social links with blue hover.

### Project pages
- Back nav (fixed, blurred, border-b stroke)
- Hero: serif title, description, tech pills
- Large hero image/video
- Content: Overview → Problem → Solution
- Optional image gallery (2-col grid)
- Footer link back to all projects

## Code Standards

- Modular components, readable naming, clean folder structure
- No unnecessary abstractions or over-engineering
- No complex state management
- Keep bundle size small — avoid heavy libraries
- Use Next/Image for images, lazy load media
- All components that use Framer Motion or browser APIs must be `"use client"`

## Key Conventions

- Section headings: `text-sm font-medium uppercase tracking-widest text-[#555]`
- Category headings (about): `text-sm font-semibold uppercase tracking-widest text-[#6aafff]`
- Tech/skill pills: `rounded-full border border-[#222] px-3 py-1 text-xs text-[#666]` with blue hover
- Nav has `border-b border-[#1a1a1a]` bottom stroke with `bg-[#0a0a0a]/80 backdrop-blur-md`
- Hover accent color: `text-[#6aafff]` or `border-[#6aafff30]`
- Project cards use CSS `clipPath` polygon masks for non-rectangular shapes
- Project data lives in `/data/projects.ts` — edit there to add/remove projects
- Social links in `/components/footer.tsx`
- Nav logo "kante.design" in Instrument Sans

## Design Inspiration

Referenced from chiefpriest.design:
- Mixed typography (serif + sans-serif for visual contrast)
- SVG-masked/shaped project images
- Subtle accent color used sparingly
- Bolder hero typography (weight 700+)
- Narrative about section (storytelling over bullet points)

## Guiding Principle

The interface should disappear and let the work speak. Design and code are one unified discipline. Every element should feel intentional.
