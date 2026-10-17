'use client';

import { useEffect, useRef, useState } from 'react';
import { galleryImages } from '@/data/site-config';

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((p) => (p === null ? null : (p + 1) % galleryImages.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((p) => (p === null ? null : (p - 1 + galleryImages.length) % galleryImages.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <section id="gallery" ref={ref} className="reveal py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label justify-center">گالری نهالستان</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest">
            تصاویر از نهالستان و باغ
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`gallery-item ${i === 0 ? 'col-span-2 lg:row-span-2' : ''}`}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full ${i === 0 ? 'h-64 lg:h-full' : 'h-40 sm:h-48'} object-cover`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <button
            className="absolute top-6 right-6 text-white p-3 text-3xl"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="بستن"
          >
            ✕
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white p-3 text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((p) => (p === null ? null : (p - 1 + galleryImages.length) % galleryImages.length));
            }}
            aria-label="قبلی"
          >
            ›
          </button>
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white p-3 text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((p) => (p === null ? null : (p + 1) % galleryImages.length));
            }}
            aria-label="بعدی"
          >
            ‹
          </button>
          <p className="absolute bottom-8 left-0 right-0 text-center text-white/80 text-sm">
            {galleryImages[lightboxIndex].alt}
          </p>
        </div>
      )}
    </section>
  );
}
