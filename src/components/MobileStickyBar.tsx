import { Phone, MessageCircle, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function MobileStickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-[#1E2A3A] bg-[#0F1826]/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={siteConfig.phoneLink}
        className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 py-2 text-text-secondary transition-colors active:bg-[#121D2B]"
        aria-label="تماس"
      >
        <Phone className="h-5 w-5" />
        <span className="text-xs">تماس</span>
      </a>
      <a
        href={siteConfig.eitaa}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 border-x border-[#1E2A3A] py-2 text-brand-green transition-colors active:bg-[#121D2B]"
        aria-label="ایتا"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-xs">ایتا</span>
      </a>
      <a
        href={siteConfig.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 py-2 text-text-secondary transition-colors active:bg-[#121D2B]"
        aria-label="اینستاگرام"
      >
        <Instagram className="h-5 w-5" />
        <span className="text-xs">اینستاگرام</span>
      </a>
    </div>
  );
}
