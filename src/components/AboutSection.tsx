'use client';

import { useEffect, useRef } from 'react';
import { aboutContent } from '@/data/site-config';

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="reveal py-20 sm:py-28 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text — right side in RTL */}
          <div>
            <span className="section-label">{aboutContent.label}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-forest mb-6 leading-tight">
              {aboutContent.heading}
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              {aboutContent.text}
            </p>
            <a
              href={aboutContent.ctaHref}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(aboutContent.ctaHref)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              {aboutContent.cta}
            </a>
          </div>

          {/* Image — left side in RTL */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl group">
              <img
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-gold rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
