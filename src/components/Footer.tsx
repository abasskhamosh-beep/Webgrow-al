'use client';

import { siteConfig, navLinks } from '@/data/site-config';

export default function Footer() {
  return (
    <footer className="bg-forest text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 border border-gold/40 text-gold text-lg">
                🌿
              </span>
              <div>
                <div className="font-bold text-base">{siteConfig.brandName}</div>
                <div className="text-xs text-white/60">{siteConfig.brandSubtitle}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {siteConfig.business}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-gold">دسترسی سریع</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/70 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-gold">اطلاعات تماس</h3>
            <div className="space-y-2 text-sm text-white/70">
              {siteConfig.phone && (
                <p dir="ltr" className="text-right">📞 {siteConfig.phone}</p>
              )}
              {siteConfig.email && (
                <p dir="ltr" className="text-right">✉️ {siteConfig.email}</p>
              )}
              {siteConfig.address && (
                <p>📍 {siteConfig.address}</p>
              )}
              {!siteConfig.phone && !siteConfig.email && !siteConfig.address && (
                <p>اطلاعات تماس به‌زودی تکمیل خواهد شد.</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().toLocaleDateString('fa-IR', { year: 'numeric' })} — تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
