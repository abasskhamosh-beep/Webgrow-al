import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import { aboutImage, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "درباره من",
  description:
    "عباس بازیان، طراح و توسعه‌دهنده وب‌سایت از جویبار، مازندران. ۲ سال تجربه حرفه‌ای در وردپرس، المنتور و ووکامرس.",
};

const facts = [
  "۲ سال تجربه حرفه‌ای در وردپرس و المنتور",
  "تخصص در ووکامرس و فروشگاه‌های اینترنتی",
  "تحویل پروژه با سرعت و پشتیبانی واقعی",
];

const skills = [
  "طراحی سایت وردپرس",
  "توسعه با المنتور",
  "راه‌اندازی فروشگاه ووکامرس",
  "بهینه‌سازی سئو",
  "افزایش سرعت سایت",
  "پشتیبانی و نگهداری",
];

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              <div
                className="absolute inset-0 rounded-2xl opacity-20 blur-2xl"
                style={{
                  background: "radial-gradient(circle, #6EA8FE, transparent)",
                }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-[#1E2A3A]">
                <Image
                  src={aboutImage}
                  alt="عباس بازیان، طراح سایت"
                  width={400}
                  height={500}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-right">
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
              سلام، من عباس بازیان هستم
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary sm:text-base">
              من عباس بازیان هستم، طراح و توسعه‌دهنده وب‌سایت از جویبار، مازندران.
              برای کسب‌وکارهای کوچک و متوسط وب‌سایت‌هایی می‌سازم که با تمرکز بر
              سرعت، سئو و تبدیل مشتری، بازدیدکنندگان را به مشتری تبدیل می‌کنند.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
              تخصص من طراحی سایت با وردپرس و المنتور است و در راه‌اندازی
              فروشگاه‌های اینترنتی با ووکامرس تجربه زیادی دارم. هدف من این است که
              هر پروژه با دقت، سرعت و پشتیبانی واقعی تحویل داده شود.
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

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <a
                href={siteConfig.eitaa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" />
                مشاوره رایگان
              </a>
              <Link href="/contact/" className="btn-secondary">
                تماس با من
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-16 border-t border-[#1E2A3A] pt-12">
          <h2 className="text-center text-xl font-bold text-text-primary sm:text-2xl">
            مهارت‌ها و تخصص‌ها
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="card-surface flex items-center gap-3 p-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-xs font-bold text-brand-blue">
                  ✓
                </span>
                <span className="text-sm text-text-secondary">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
