import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "بلاگ",
  description:
    "مقالات آموزشی درباره وردپرس، المنتور، ووکامرس، سئو و افزایش سرعت سایت.",
};

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
            بلاگ
          </h1>
          <p className="section-subtitle">مقالات آموزشی درباره وردپرس و سئو</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="card-surface group overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-sm font-semibold text-text-primary transition-colors group-hover:text-brand-blue">
                  {post.title}
                </h2>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-brand-blue">
                  ادامه مطلب
                  <ArrowLeft className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[#1E2A3A] bg-[#0F1826] p-8 text-center">
          <p className="text-sm text-text-secondary">
            مقالات کامل در وب‌سایت اصلی قابل مشاهده هستند. برای دسترسی به همه
            مطالب به صفحه بلاگ مراجعه کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
