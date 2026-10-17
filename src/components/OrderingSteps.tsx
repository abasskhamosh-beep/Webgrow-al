'use client';

import { useEffect, useRef } from 'react';
import { orderingSteps } from '@/data/site-config';

export default function OrderingSteps() {
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
    <section id="ordering" ref={ref} className="reveal py-20 sm:py-28 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {orderingSteps.heading}
          </h2>
        </div>

        {/* Desktop: horizontal steps with connecting line */}
        <div className="hidden sm:grid grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute top-8 right-[12.5%] left-[12.5%] h-0.5 bg-white/20" />

          {orderingSteps.steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-gold text-forest flex items-center justify-center text-2xl font-bold mb-4">
                {String(i + 1).toLocaleString('fa-IR')}
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="sm:hidden flex flex-col gap-6">
          {orderingSteps.steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-12 h-12 rounded-full bg-gold text-forest flex items-center justify-center text-xl font-bold">
                  {String(i + 1).toLocaleString('fa-IR')}
                </div>
                {i < orderingSteps.steps.length - 1 && (
                  <div className="w-0.5 h-full bg-white/20 mt-2 flex-1" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="font-bold text-lg text-white mb-1">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
