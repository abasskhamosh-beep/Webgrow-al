"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const normalized = href === "/" ? "/" : href.replace(/\/$/, "");
    const current = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    return normalized === current;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-[#1E2A3A] bg-[#0B1420]/90 backdrop-blur-md"
          : "border-transparent bg-[#0B1420]"
      }`}
    >
      <div className="container-page">
        <nav className="flex h-16 items-center justify-between md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-text-primary transition-colors hover:text-brand-blue"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-brand-blue"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href={siteConfig.eitaa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            مشاوره رایگان
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-text-primary transition-colors hover:bg-[#121D2B] md:hidden"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-[#0B1420] md:hidden">
          <div className="container-page flex flex-col gap-1 pt-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-[#121D2B] text-brand-blue"
                    : "text-text-secondary hover:bg-[#121D2B] hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.eitaa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              مشاوره رایگان
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
