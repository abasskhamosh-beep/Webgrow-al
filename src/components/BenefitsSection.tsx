'use client';

import { useEffect, useRef } from 'react';
import { benefitsContent } from '@/data/site-config';

export default function BenefitsSection() {
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
    <section id="benefits" ref={ref} className="reveal py-20 sm:py-28 bg-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label justify-center">{benefitsContent.label}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest">
            {benefitsContent.heading}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsContent.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-black/5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-forest/10 text-forest font-bold text-sm">
                  {String(i + 1).toLocaleString('fa-IR')}
                </span>
                <h3 className="font-bold text-lg text-text-dark">{item.title}</h3>
              </div>
              <p className="text-text-muted leading-relaxed text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
