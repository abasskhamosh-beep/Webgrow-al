import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";

export function BlogPreview() {
  return (
    <section className="section-padding bg-[#0F1826] border-y border-[#1E2A3A]">
      <div className="container-page">
        <div className="text-center">
          <h2 className="section-title">بلاگ</h2>
          <p className="section-subtitle">مقالات آموزشی درباره وردپرس و سئو</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="text-sm font-semibold text-text-primary transition-colors group-hover:text-brand-blue">
                  {post.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-brand-blue">
                  ادامه مطلب
                  <ArrowLeft className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog/" className="btn-secondary">
            مشاهده همه مقالات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
