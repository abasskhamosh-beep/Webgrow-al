import type { Metadata } from "next";
import { Phone, Mail, Send, Instagram, MessageCircle, Clock, MapPin } from "lucide-react";
import { siteConfig, businessHours } from "@/lib/data";

export const metadata: Metadata = {
  title: "تماس",
  description:
    "تماس با عباس بازیان، طراح سایت وردپرس در جویبار، مازندران. تلفن، ایمیل، ایتا، تلگرام و اینستاگرام.",
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
            تماس با من
          </h1>
          <p className="section-subtitle mx-auto max-w-2xl">
            برای مشاوره رایگان یا پرسش درباره پروژه، از راه‌های زیر در تماس باشید.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-4">
            <a
              href={siteConfig.phoneLink}
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-text-secondary">تلفن</p>
                <p className="text-sm font-semibold text-text-primary ltr-text">
                  {siteConfig.phoneDisplay}
                </p>
              </div>
            </a>

            <a
              href={siteConfig.emailLink}
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-text-secondary">ایمیل</p>
                <p className="break-all text-sm font-semibold text-text-primary">
                  {siteConfig.email}
                </p>
              </div>
            </a>

            <a
              href={siteConfig.eitaa}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-green/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-text-secondary">ایتا</p>
                <p className="text-sm font-semibold text-text-primary">
                  Bazianwb@
                </p>
              </div>
            </a>

            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Send className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-text-secondary">تلگرام</p>
                <p className="text-sm font-semibold text-text-primary">
                  Abasswordpress@
                </p>
              </div>
            </a>

            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Instagram className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-text-secondary">اینستاگرام</p>
                <p className="text-sm font-semibold text-text-primary">
                  abbaswordparess@
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="card-surface flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-warm/10 text-brand-warm">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-text-secondary">موقعیت</p>
                <p className="text-sm font-semibold text-text-primary">
                  {siteConfig.location}
                </p>
              </div>
            </div>

            {/* Business hours */}
            <div className="card-surface p-5">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-blue" />
                <h2 className="text-sm font-semibold text-text-primary">
                  ساعات کاری
                </h2>
              </div>
              <ul className="space-y-2">
                {businessHours.map((item) => (
                  <li
                    key={item.day}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-text-secondary">{item.day}</span>
                    <span
                      className={
                        item.hours === "تعطیل"
                          ? "text-brand-warm"
                          : "text-text-primary"
                      }
                    >
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form + Map */}
          <div className="space-y-6">
            {/* Contact Form 7 integration point */}
            <div className="card-surface p-6">
              <h2 className="text-base font-semibold text-text-primary">
                فرم تماس
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                برای ارسال پیام از فرم زیر استفاده کنید.
              </p>

              {/* WordPress Contact Form 7 shortcode integration point.
                  In a WordPress environment, render via:
                  [contact-form-7 id="bec772c" title="فرم"]
                  This static build cannot execute the shortcode.
                  To connect the real form, deploy this template in WordPress
                  and replace this block with the CF7 shortcode output. */}
              <div className="mt-4 rounded-lg border border-dashed border-[#1E2A3A] bg-[#0F1826] p-6 text-center">
                <p className="text-sm text-text-secondary">
                  فرم تماس در محیط وردپرس با افزونه Contact Form 7 فعال است.
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  برای فعال‌سازی فرم، این قالب را در وردپرس منتشر کنید و شورت‌کد
                  Contact Form 7 را جایگزین این بخش کنید.
                </p>
                <code className="mt-3 block rounded-md bg-[#0B1420] px-3 py-2 text-xs text-brand-blue ltr-text">
                  [contact-form-7 id=&quot;bec772c&quot; title=&quot;فرم&quot;]
                </code>
              </div>

              <a
                href={siteConfig.eitaa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 w-full"
              >
                <MessageCircle className="h-4 w-4" />
                مشاوره رایگان در ایتا
              </a>
            </div>

            {/* Map */}
            <div className="card-surface overflow-hidden">
              <iframe
                src={siteConfig.mapsEmbed}
                title="نقشه جویبار، مازندران"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
