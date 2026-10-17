'use client';

import { heroContent } from '@/data/site-config';

/** Shared hero copy — used both over the 3D journey and the static fallback. */
export default function HeroContent({ textVisible = true }: { textVisible?: boolean }) {
  return (
    <div
      className={`relative max-w-3xl mx-auto text-center px-4 transition-opacity duration-500 ${
        textVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p className="hero-animate hero-animate-delay-1 text-gold font-semibold text-sm sm:text-base mb-4">
        {heroContent.label}
      </p>
      <h1 className="hero-animate hero-animate-delay-2 text-white font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight mb-6 drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
        {heroContent.title}
      </h1>
      <p className="hero-animate hero-animate-delay-3 text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
        {heroContent.description}
      </p>
      <div className="hero-animate hero-animate-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={heroContent.primaryCtaHref}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(heroContent.primaryCtaHref)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-gold"
        >
          {heroContent.primaryCta}
        </a>
        <a
          href={heroContent.secondaryCtaHref}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(heroContent.secondaryCtaHref)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-secondary"
        >
          {heroContent.secondaryCta}
        </a>
      </div>
    </div>
  );
}
