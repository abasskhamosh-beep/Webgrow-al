import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { aboutImage, siteConfig } from "@/lib/data";

const facts = [
  "۲ سال تجربه حرفه‌ای در وردپرس و المنتور",
  "تخصص در ووکامرس و فروشگاه‌های اینترنتی",
  "تحویل پروژه با سرعت و پشتیبانی واقعی",
];

export function AboutSection() {
  return (
    <section className="section-padding bg-[#0F1826] border-y border-[#1E2A3A]">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              <div
                className="absolute inset-0 rounded-2xl opacity-20 blur-2xl"
                style={{ background: "radial-gradient(circle, #6EA8FE, transparent)" }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-[#1E2A3A]">
                <Image
                  src={aboutImage}
                  alt="عباس بازیان، طراح سایت"
                  width={400}
                  height={500}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-right">
            <h2 className="section-title">سلام، من عباس بازیان هستم</h2>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary sm:text-base">
              من عباس بازیان هستم، طراح و توسعه‌دهنده وب‌سایت از جویبار، مازندران.
              برای کسب‌وکارهای کوچک و متوسط وب‌سایت‌هایی می‌سازم که با تمرکز بر
              سرعت، سئو و تبدیل مشتری، بازدیدکنندگان را به مشتری تبدیل می‌کنند.
            </p>

            <ul className="mt-6 space-y-3">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2 text-sm text-text-secondary sm:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/about/" className="btn-secondary">
                بیشتر درباره من
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
