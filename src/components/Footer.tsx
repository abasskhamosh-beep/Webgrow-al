import Link from "next/link";
import { Phone, Mail, Send, Instagram } from "lucide-react";
import {
  siteConfig,
  footerLinks,
  legalLinks,
} from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[#1E2A3A] bg-[#0F1826]">
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-text-primary">
              {siteConfig.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text-primary">
              دسترسی سریع
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text-primary">
              تماس
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.phoneLink}
                  className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="ltr-text">{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailLink}
                  className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  تلگرام
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue"
                >
                  <Instagram className="h-4 w-4 shrink-0" />
                  اینستاگرام
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text-primary">
              حقوقی
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1E2A3A] pt-6">
          <p className="text-center text-xs text-text-secondary">
            © {new Date().getFullYear()} {siteConfig.name} — تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
