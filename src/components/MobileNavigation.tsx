'use client';

import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  onNavClick: (e: React.MouseEvent, href: string) => void;
  contactHref: string;
}

export default function MobileNavigation({
  open,
  onClose,
  navLinks,
  onNavClick,
  contactHref,
}: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-menu lg:hidden">
      <button
        className="absolute top-6 left-6 text-white p-2"
        onClick={onClose}
        aria-label="بستن منو"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <nav className="flex flex-col items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className="text-white text-xl font-medium hover:text-gold transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href={contactHref}
          onClick={(e) => {
            if (contactHref === '#contact') {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              onClose();
            }
          }}
          className="btn-gold mt-4"
        >
          مشاوره و سفارش نهال
        </a>
      </nav>
    </div>
  );
}
