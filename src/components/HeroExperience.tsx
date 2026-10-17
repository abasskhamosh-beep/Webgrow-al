'use client';

import { useEffect, useRef, useState } from 'react';
import HeroContent from './HeroContent';

/**
 * Sticky viewport hosting the scroll-driven Three.js journey:
 * inside a Thomson orange → through the peel → into the sunlit orchard.
 */
export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let disposed = false;
    let experience: { dispose: () => void } | null = null;

    const applyProgress = (p: number) => {
      const overlay = overlayRef.current;
      if (overlay) {
        let opacity = 0;
        if (p < 0.08) opacity = 1 - p / 0.08;
        else if (p > 0.82) opacity = Math.min(1, (p - 0.82) / 0.12);
        overlay.style.opacity = String(Math.max(0, opacity));
        overlay.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      }
      const hint = hintRef.current;
      if (hint) {
        hint.style.opacity = String(p < 0.04 ? Math.max(0, 1 - p / 0.04) : 0);
      }
    };

    (async () => {
      const { HeroExperience: Experience } = await import('@/lib/three/hero-experience');
      if (disposed) return;

      const isMobile = window.innerWidth < 768;
      experience = new Experience({
        canvas,
        container,
        quality: isMobile ? 'low' : 'high',
        onReady: () => setReady(true),
        onProgress: applyProgress,
      });
    })();

    return () => {
      disposed = true;
      experience?.dispose();
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} className="hero-scroll-container" style={{ height: '520vh' }}>
      <div className="hero-viewport">
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

        {!ready && (
          <div className="hero-loading">
            <div className="hero-loading-bar" />
          </div>
        )}

        <div ref={overlayRef} className="hero-overlay">
          <div className="hero-overlay-scrim" aria-hidden="true" />
          <HeroContent />
        </div>

        <div ref={hintRef} className="hero-scroll-hint">
          <span>برای سفر به باغ، اسکرول کنید</span>
          <span className="hero-scroll-hint-line" />
        </div>
      </div>
    </section>
  );
}
