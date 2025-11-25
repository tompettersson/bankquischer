# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** (using `@tailwindcss/postcss` plugin)
- **Framer Motion** for animations
- **German language** site (lang="de")

## Architecture

Single-page marketing site for "Bankquischer" (a microfiber cloth product). Uses Next.js App Router with a simple structure:

**Entry Point**: [app/page.tsx](app/page.tsx) composes all landing page sections

**Components** ([components/](components/)): Each section is a separate component:
- Navigation, Hero, TrustedBy, Features, MoreFeatures, Testimonials, Pricing, CTA, Footer

**Fonts**: Configured in [app/layout.tsx](app/layout.tsx)
- `--font-primary`: Nunito (body text)
- `--font-heading`: Playfair Display (headings)

**Styling**:
- Tailwind CSS 4 with CSS variables defined in [app/globals.css](app/globals.css)
- Components use `"use client"` directive for Framer Motion animations

**Path Alias**: `@/*` maps to project root (e.g., `@/components/Hero`)
