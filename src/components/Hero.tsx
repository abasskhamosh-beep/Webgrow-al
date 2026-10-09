import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye, Clock, CheckCircle2 } from "lucide-react";
import { siteConfig, heroImage } from "@/lib/data";

const trustBadges = [
  { icon: Clock, label: "۲ سال تجربه" },
  { icon: CheckCircle2, label: "+۲۰ پروژه موفق" },
  { icon: MessageCircle, label: "پاسخ زیر ۲۴ ساعت" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#1E2A3A]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #6EA8FE, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/4 h-60 w-60 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #22C77D, transparent)" }}
        aria-hidden="true"
      />

      <div className="container-page section-padding relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Text */}
          <div className="reveal text-center lg:text-right">
            <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/5 px-4 py-1.5 text-xs font-medium text-brand-blue">
              طراح سایت در مازندران
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl">
              طراحی سایت وردپرس و فروشگاهی در مازندران
            </h1>

            <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              طراحی سایت حرفه‌ای با وردپرس و المنتور؛ سریع، سئو محور و آماده برای
              تبدیل بازدیدکننده به مشتری.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={siteConfig.eitaa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                مشاوره رایگان
              </a>
              <Link
                href="/case-study/"
                className="btn-secondary w-full sm:w-auto"
              >
                <Eye className="h-4 w-4" />
                مشاهده نمونه‌کارها
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <badge.icon className="h-4 w-4 text-brand-green" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className="reveal relative flex justify-center lg:justify-start"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div
                className="absolute inset-0 rounded-2xl opacity-30 blur-2xl"
                style={{
                  background: "radial-gradient(circle, #6EA8FE, transparent)",
                }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-[#1E2A3A] bg-[#121D2B]">
                <Image
                  src={heroImage}
                  alt="طراحی سایت وردپرس و فروشگاهی"
                  width={600}
                  height={450}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
