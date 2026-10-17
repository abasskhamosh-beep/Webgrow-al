'use client';

import { useEffect, useState } from 'react';
import { navLinks, siteConfig } from '@/data/site-config';
import MobileNavigation from './MobileNavigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      const offset = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= offset) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const contactHref = siteConfig.phone
    ? `tel:+${siteConfig.phone}`
    : siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp}`
    : '#contact';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-forest shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand — right side in RTL */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 text-white shrink-0"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 border border-gold/40 text-gold text-lg">
              🌿
            </span>
            <div className="hidden sm:block">
              <div className="font-bold text-base leading-tight">{siteConfig.brandName}</div>
              <div className="text-xs text-white/70 leading-tight">{siteConfig.brandSubtitle}</div>
            </div>
          </a>

          {/* Desktop nav — center */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-gold'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact button — left side */}
          <div className="flex items-center gap-3">
            <a
              href={contactHref}
              className="hidden sm:inline-flex btn-gold !py-2 !px-4 text-sm"
              onClick={(e) => {
                if (contactHref === '#contact') {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              مشاوره و سفارش نهال
            </a>
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="باز کردن منو"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        onNavClick={handleNavClick}
        contactHref={contactHref}
      />
    </>
  );
}
