import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data";

export function Portfolio() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="text-center">
          <h2 className="section-title">نمونه کارها</h2>
          <p className="section-subtitle">چند نمونه از پروژه‌های اخیر</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="card-surface group overflow-hidden"
            >
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
              <div className="flex items-center justify-between p-5">
                <h3 className="text-sm font-semibold text-text-primary">
                  {project.title}
                </h3>
                <ArrowLeft className="h-4 w-4 text-text-secondary transition-colors group-hover:text-brand-blue" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/case-study/" className="btn-secondary">
            مشاهده همه نمونه‌کارها
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
