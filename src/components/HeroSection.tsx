'use client';

import { useEffect, useRef, useState } from 'react';
import { heroContent, siteConfig } from '@/data/site-config';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const targetTimeRef = useRef(0);
  const renderedTimeRef = useRef(0);
  const seekingRef = useRef(false);

  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const hasVideo = Boolean(siteConfig.heroVideoUrl);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll-driven video seeking
  useEffect(() => {
    if (!hasVideo || reducedMotion || videoError) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const updateTarget = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        targetTimeRef.current = 0;
        return;
      }
      // Progress: 0 when hero top is at viewport top, 1 when hero bottom reaches viewport bottom
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight));
      targetTimeRef.current = progress * (video.duration || 0);

      // Fade hero text as user scrolls
      setTextVisible(progress < 0.15);
    };

    const tick = () => {
      const target = targetTimeRef.current;
      const rendered = renderedTimeRef.current;

      // Only seek if difference is meaningful (> 0.015s) and no pending seek
      if (Math.abs(target - rendered) > 0.015 && !seekingRef.current) {
        seekingRef.current = true;
        video.currentTime = target;
        renderedTimeRef.current = target;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onSeeked = () => {
      seekingRef.current = false;
    };

    const onResize = () => updateTarget();

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', onResize);
    video.addEventListener('seeked', onSeeked);
    updateTarget();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', onResize);
      video.removeEventListener('seeked', onSeeked);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasVideo, reducedMotion, videoError, videoReady]);

  // Video event handlers
  useEffect(() => {
    if (!hasVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      video.pause();
      setVideoReady(true);
    };
    const onCanPlay = () => {
      setVideoReady(true);
    };
    const onError = () => {
      setVideoError(true);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
    };
  }, [hasVideo]);

  // If no video or reduced motion or error → static image hero (no sticky scroll container)
  const useStaticHero = !hasVideo || reducedMotion || videoError;

  if (useStaticHero) {
    return (
      <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <img
          src={siteConfig.heroFallbackImage}
          alt="نهالستان مهندس مهرداد مددی"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/30 to-forest/70" />
        <HeroContent textVisible={true} />
      </section>
    );
  }

  // Scroll-driven video hero
  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-scroll-container"
      style={{ height: '300vh' }}
    >
      <div className="hero-viewport">
        {/* Loading state */}
        {!videoReady && !videoError && (
          <div className="hero-loading">
            <div className="hero-loading-bar" />
          </div>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          className={`hero-video ${videoReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
          src={siteConfig.heroVideoUrl}
          poster={siteConfig.heroPosterImage}
          preload="auto"
          playsInline
          muted
          style={{ display: videoError ? 'none' : 'block' }}
        />

        {/* Fallback image behind video (shows if video fails) */}
        {videoError && (
          <img
            src={siteConfig.heroFallbackImage}
            alt="نهالستان مهندس مهرداد مددی"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-forest/20 to-forest/60 pointer-events-none" />

        {/* Hero text */}
        <HeroContent textVisible={textVisible} />
      </div>
    </section>
  );
}

function HeroContent({ textVisible }: { textVisible: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-500 ${
        textVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-3xl">
        <p className="hero-animate hero-animate-delay-1 text-gold font-semibold text-sm sm:text-base mb-4">
          {heroContent.label}
        </p>
        <h1 className="hero-animate hero-animate-delay-2 text-white font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight mb-6">
          {heroContent.title}
        </h1>
        <p className="hero-animate hero-animate-delay-3 text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
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
    </div>
  );
}
