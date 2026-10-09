import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function CTABand() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-[#1E2A3A] bg-[#121D2B] px-6 py-12 text-center md:py-16">
          <div
            className="pointer-events-none absolute -top-20 right-1/3 h-60 w-60 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #22C77D, transparent)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              آماده‌اید پروژه خود را شروع کنید؟
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-text-secondary sm:text-base">
              همین حالا تماس بگیرید تا درباره نیازهای وب‌سایت شما صحبت کنیم.
              مشاوره اولیه رایگان است.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={siteConfig.eitaa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                مشاوره رایگان
              </a>
              <a href={siteConfig.phoneLink} className="btn-secondary w-full sm:w-auto">
                <span className="ltr-text">{siteConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
