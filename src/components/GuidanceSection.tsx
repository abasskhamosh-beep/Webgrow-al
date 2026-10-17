'use client';

import { useEffect, useRef } from 'react';
import { guidanceContent } from '@/data/site-config';

export default function GuidanceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="guidance" ref={ref} className="reveal py-20 sm:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label justify-center">{guidanceContent.label}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            {guidanceContent.heading}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guidanceContent.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-black/5 text-center"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold/15 text-gold text-2xl mb-4 mx-auto">
                {['🌡️', '💧', '🌱', '📅'][i] || '🌿'}
              </div>
              <h3 className="font-bold text-lg text-text-dark mb-3">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={guidanceContent.ctaHref}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(guidanceContent.ctaHref)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            {guidanceContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
