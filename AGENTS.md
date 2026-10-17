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

## Scroll-Driven Cinematic Hero (Three.js + GSAP ScrollTrigger)
The hero is a single continuous scroll-driven shot: **inside a Thomson orange → through the rind → into a sunlit citrus orchard**. There are no cuts or fades to black.

Files:
- `src/components/HeroSection.tsx` — decides 3D vs. fallback; renders the sticky container
- `src/components/HeroExperience.tsx` — client wrapper, loading state, hero copy opacity
- `src/components/HeroContent.tsx` — shared Persian hero copy (used by both paths)
- `src/lib/three/hero-experience.ts` — renderer, camera path, lights, fog, ScrollTrigger timeline
- `src/lib/three/orange.ts` — pulp tunnel, vesicles, membranes, droplets, bokeh, peel, light burst
- `src/lib/three/orchard.ts` — sky dome, ground, instanced trees/foliage/fruit, sun
- `src/lib/three/{palette,glsl,textures}.ts` — colours, procedural noise, canvas textures

How it works:
- 520vh scroll container + 100vh sticky viewport; `ScrollTrigger` reports progress, the render loop
  eases toward it (deterministic and fully reversible — scrolling up replays the journey backwards).
- One camera keyframe table drives position, FOV, roll and look-at; fog colour/density, sun,
  ambient and warm point lights are all interpolated from the same progress value.
- Everything is procedural — no external models or textures. Foliage is instanced crossed quads
  with an alpha-cut leaf texture; the pulp/rind use custom `ShaderMaterial`s with value-noise fbm.
- Realism pass (orchard): a procedural PMREM environment map (`environmentTexture` in textures.ts)
  feeds image-based lighting to all PBR materials; the sun casts PCF-soft shadows from a shadow
  camera that follows the camera path each frame (keeps near trees crisp); trees get instanced
  branches; trunks/foliage/fruits/shrubs cast shadows and the ground receives them. Foliage and
  shrubs use a `customDepthMaterial` so leaf shadows are alpha-tested, not solid quads. The soil
  texture is anisotropically filtered and tiled finely (repeat 38×48) so it stays sharp up close.

Gotchas (learned the hard way):
- Size the renderer from the **canvas' own client size**, not the 520vh scroll container, or the
  view is stretched.
- The rind sphere (radius 23 at z = -76) must stay opaque until it starts dissolving, and the
  orchard group is hidden until progress ≥ 0.5 (`ORCHARD_REVEAL_AT`) — otherwise the ground plane
  and near trees are visible through the tunnel mouth, since they sit inside the rind sphere.
- The orchard's shaders are pre-compiled in the constructor so revealing it never hitches.

Fallbacks:
- `prefers-reduced-motion` or no WebGL → static image hero (`siteConfig.heroFallbackImage`).
- Mobile (`< 768px`) → `quality: 'low'`: fewer instances/particles, capped pixel ratio, no AA.
- Three.js resources, ScrollTrigger and the ResizeObserver are all disposed on unmount.

Note: `siteConfig.heroVideoUrl` is no longer used by the hero (the 3D scene replaced the
scroll-to-video path); the key is kept in the config but has no effect.

## Notes
- No testimonials section — only add when authentic testimonials exist
- No fabricated prices — inquiry-based ordering only
- Contact form opens WhatsApp/phone if configured, otherwise shows "info coming soon"
