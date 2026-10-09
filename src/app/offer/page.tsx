import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, CheckCircle2 } from "lucide-react";
import { services, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "خدمات",
  description:
    "خدمات طراحی سایت وردپرس، توسعه با المنتور، بهینه‌سازی سئو و افزایش سرعت سایت توسط عباس بازیان.",
};

const serviceDetails: Record<string, string[]> = {
  "طراحی سایت وردپرس": [
    "طراحی سایت‌های شرکتی، فروشگاهی و شخصی",
    "سازگار با سئو و سرعت بالا",
    "طراحی واکنش‌گرا برای موبایل و دسکتاپ",
  ],
  "توسعه با المنتور": [
    "پیاده‌سازی حرفه‌ای صفحات با المنتور",
    "کد تمیز و قابل نگهداری",
    "انیمیشن‌ها و تعامل‌های ظریف",
  ],
  "بهینه‌سازی سئو": [
    "سئوی فنی و ساختاری",
    "بهینه‌سازی محتوا و کلمات کلیدی",
    "پشتیبانی از افزونه‌های سئو",
  ],
  "افزایش سرعت سایت": [
    "بهینه‌سازی بارگذاری صفحات",
    "بهبود عملکرد روی موبایل",
    "کاهش حجم و درخواست‌های اضافی",
  ],
};

export default function OfferPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
            خدماتی که ارائه می‌دهم
          </h1>
          <p className="section-subtitle mx-auto max-w-2xl">
            هر بخش از پروژه شما با دقت و استاندارد اروپایی طراحی می‌شود
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.number}
              className="card-surface group p-7 transition-all duration-300 hover:border-brand-blue/50 hover:shadow-[0_0_24px_rgba(110,168,254,0.08)]"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-brand-blue/30 transition-colors group-hover:text-brand-blue/60">
                  {service.number}
                </span>
                <h2 className="text-lg font-semibold text-text-primary">
                  {service.title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {(serviceDetails[service.title] || []).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact/" className="btn-primary">
            <MessageCircle className="h-4 w-4" />
            شروع پروژه من
          </Link>
        </div>
      </div>
    </div>
  );
}
