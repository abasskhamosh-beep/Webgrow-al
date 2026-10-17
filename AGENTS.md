# AGENTS.md — Mehrdad Madadi Nursery Website

## Project Overview
A premium single-page Persian (Farsi) RTL website for Engineer Mehrdad Madadi's citrus and summer fruit tree nursery.

## Tech Stack
- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **Font:** Vazirmatn (loaded via next/font/google)
- **Language:** Persian (Farsi), full RTL layout (`dir="rtl"`, `lang="fa"`)

## Development
```bash
docker compose -f docker-compose.base44.yml up -d
# App runs on http://localhost:3000
```

## Project Structure
- `src/app/` — Next.js app router (layout, page, globals.css)
- `src/components/` — React components (Header, HeroSection, AboutSection, ProductSection, etc.)
- `src/data/` — Centralized editable content (site-config.ts, products.ts)

## Key Configuration
- **All editable content** lives in `src/data/site-config.ts` (brand name, contact info, hero text, section content) and `src/data/products.ts` (product catalog).
- **Contact info** (phone, WhatsApp, email, address) is currently empty — must be filled with real verified data before going live.
- **Hero video** (`heroVideoUrl` in site-config.ts) is currently empty. When a video URL is provided, the hero becomes a scroll-driven video experience (scroll controls video.currentTime via requestAnimationFrame). Without a video, it falls back to a static image hero.
- **Images** use Unsplash placeholder URLs — replace with real nursery photographs.

## Color System (CSS variables in globals.css)
- Deep Forest Green: `#173F2B` — header, footer, primary buttons
- Natural Leaf Green: `#4F7D43` — secondary accents
- Citrus Gold: `#D9A52E` — brand accents, CTAs
- Warm Ivory: `#F8F6EF` — main background
- Soft Sage: `#E8EEE3` — supporting section backgrounds

## Scroll-Driven Video Hero
The `HeroSection` component implements a scroll-to-video experience:
- 300vh scroll container with 100vh sticky viewport
- Scroll progress maps to `video.currentTime` (0% → first frame, 100% → last frame)
- Uses `requestAnimationFrame` for smooth seeking, avoids excessive seeks
- Video never autoplays or loops — only seeked by scroll position
- Falls back to static image when: no video URL, `prefers-reduced-motion`, or video error
- Loading indicator shown while video metadata loads

## Notes
- No testimonials section — only add when authentic testimonials exist
- No fabricated prices — inquiry-based ordering only
- Contact form opens WhatsApp/phone if configured, otherwise shows "info coming soon"
