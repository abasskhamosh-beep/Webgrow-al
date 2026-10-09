import { Phone, Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function FloatingContact() {
  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      <a
        href={siteConfig.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1E2A3A] bg-[#121D2B] text-text-secondary shadow-lg transition-all hover:border-brand-blue hover:text-brand-blue"
        aria-label="اینستاگرام"
        title="اینستاگرام"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href={siteConfig.phoneLink}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1E2A3A] bg-[#121D2B] text-text-secondary shadow-lg transition-all hover:border-brand-blue hover:text-brand-blue"
        aria-label="تماس تلفنی"
        title="تماس تلفنی"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={siteConfig.eitaa}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-[#0B1420] shadow-lg transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,199,125,0.4)]"
        aria-label="مشاوره در ایتا"
        title="مشاوره در ایتا"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
