# Abbas Bazian Website — Base44 Dev Environment

## Overview
Next.js 15 (App Router) marketing website for عباس بازیان (Abbas Bazian), a Persian-language web designer specializing in WordPress, Elementor, and WooCommerce. The site is fully RTL, uses the Vazirmatn typeface, and targets Persian-speaking visitors.

## Tech Stack
- **Framework:** Next.js 15.1.6 (App Router)
- **Language:** TypeScript + React 19
- **Styling:** Tailwind CSS 3.4 with custom design tokens (see `tailwind.config.ts` and `src/app/globals.css`)
- **Icons:** lucide-react
- **Font:** Vazirmatn (via next/font/google)

## Design System
Colors are defined as CSS variables in `globals.css` and mirrored in `tailwind.config.ts`:
- Background: `#0B1420` / Surface: `#121D2B` / Dark: `#0F1826`
- Border: `#1E2A3A`
- Brand blue: `#6EA8FE` / Green CTA: `#22C77D` / Warm accent: `#FFA75E`
- Text primary: `#E8EEF4` / Text secondary: `#A9B8C6`

## Project Structure
- `src/app/layout.tsx` — Root layout (RTL, font, metadata, header/footer/floating contact)
- `src/app/page.tsx` — Homepage (hero, services, about, portfolio, blog, FAQ, CTA)
- `src/app/about/` — About page
- `src/app/offer/` — Services page
- `src/app/case-study/` — Portfolio/case studies
- `src/app/blog/` — Blog listing
- `src/app/contact/` — Contact page (info, CF7 integration point, map)
- `src/app/privacy/` — Privacy policy
- `src/app/terms-conditions/` — Terms & conditions
- `src/components/` — Reusable components (Header, Footer, Hero, Services, etc.)
- `src/lib/data.ts` — Centralized site config, navigation, services, projects, blog posts, FAQs

## Running in Base44 Sandbox
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The dev server runs on port 3000 with hot reload. Dependencies install on container startup.

## Important Notes
- All images are referenced from `https://abbas-wordpress.ir/wp-content/uploads/...` — they are external assets.
- Contact Form 7 shortcode `[contact-form-7 id="bec772c" title="فرم"]` is preserved as an integration point; it requires a WordPress environment to render the actual form.
- The Google site verification meta tag is a placeholder — replace with the actual verification code.
- Navigation links point to the real WordPress page URLs (e.g., `/about/`, `/offer/`).
