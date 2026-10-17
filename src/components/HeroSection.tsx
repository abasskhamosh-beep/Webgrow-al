'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroContent from './HeroContent';
import { siteConfig } from '@/data/site-config';

// The 3D experience is browser-only (WebGL + ScrollTrigger).
const HeroExperience = dynamic(() => import('./HeroExperience'), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroSection() {
  const [mode, setMode] = useState<'pending' | '3d' | 'static'>('pending');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMode(!prefersReducedMotion && supportsWebGL() ? '3d' : 'static');
  }, []);

  if (mode === '3d') return <HeroExperience />;

  if (mode === 'pending') {
    return <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-forest" />;
  }

  // Graceful fallback: reduced motion or no WebGL support.
  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <img
        src={siteConfig.heroFallbackImage}
        alt="نهالستان مهندس مهرداد مددی"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/30 to-forest/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <HeroContent />
      </div>
    </section>
  );
}
