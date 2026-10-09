import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "نمونه‌کار",
  description:
    "نمونه کارهای طراحی سایت وردپرس و فروشگاهی توسط عباس بازیان.",
};

export default function CaseStudyPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
            نمونه کارها
          </h1>
          <p className="section-subtitle">چند نمونه از پروژه‌های اخیر</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="card-surface group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1420] via-transparent to-transparent opacity-80" />
                <span className="absolute right-3 top-3 rounded-full border border-[#1E2A3A] bg-[#0B1420]/80 px-3 py-1 text-xs text-brand-blue backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-sm font-semibold text-text-primary">
                  {project.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md border border-[#1E2A3A] bg-[#0F1826] px-2.5 py-1 text-xs text-text-secondary">
                    WordPress
                  </span>
                  <span className="rounded-md border border-[#1E2A3A] bg-[#0F1826] px-2.5 py-1 text-xs text-text-secondary">
                    Elementor
                  </span>
                </div>
                <Link
                  href={project.href}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-blue"
                >
                  مشاهده جزئیات
                  <ArrowLeft className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[#1E2A3A] bg-[#0F1826] p-8 text-center">
          <p className="text-sm text-text-secondary">
            برای مشاهده جزئیات بیشتر هر پروژه یا درخواست پروژه مشابه، در تماس
            باشید.
          </p>
          <Link href="/contact/" className="btn-secondary mt-5">
            تماس با من
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
