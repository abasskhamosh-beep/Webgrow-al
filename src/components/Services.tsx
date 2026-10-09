import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { services, siteConfig } from "@/lib/data";

export function Services() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="text-center">
          <h2 className="section-title">خدماتی که ارائه می‌دهم</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            هر بخش از پروژه شما با دقت و استاندارد اروپایی طراحی می‌شود
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="card-surface group flex flex-col p-6 transition-all duration-300 hover:border-brand-blue/50 hover:shadow-[0_0_24px_rgba(110,168,254,0.08)]"
            >
              <span className="text-3xl font-bold text-brand-blue/30 transition-colors group-hover:text-brand-blue/60">
                {service.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-text-primary">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
                اطلاعات بیشتر
                <ArrowLeft className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact/" className="btn-primary">
            شروع پروژه من
          </Link>
        </div>
      </div>
    </section>
  );
}
