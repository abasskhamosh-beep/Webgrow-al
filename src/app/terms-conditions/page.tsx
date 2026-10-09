import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قوانین و مقررات",
  description: "قوانین و مقررات وب‌سایت عباس بازیان.",
};

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            قوانین و مقررات
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              استفاده از وب‌سایت عباس بازیان به معنی پذیرش قوانین و مقررات زیر
              است.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              خدمات
            </h2>
            <p>
              خدمات ارائه‌شده شامل طراحی و توسعه وب‌سایت با وردپرس و المنتور است.
              جزئیات هر پروژه پیش از شروع با مشتری توافق می‌شود.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              پرداخت و تحویل
            </h2>
            <p>
              شرایط پرداخت و زمان تحویل پروژه پیش از شروع کار مشخص می‌شود و
              بین طرفین توافق می‌گردد.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              مالکیت معنوی
            </h2>
            <p>
              پس از تحویل نهایی و تسویه حساب، مالکیت فایل‌ها و کدهای پروژه به
              مشتری منتقل می‌شود.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              پشتیبانی
            </h2>
            <p>
              پشتیبانی پس از تحویل طبق توافق قبلی انجام می‌شود. درخواست‌های
              پشتیبانی خارج از محدوده توافق‌شده ممکن است هزینه جداگانه داشته
              باشد.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              تغییرات قوانین
            </h2>
            <p>
              عباس بازیان حق دارد این قوانین را به‌روزرسانی کند. تغییرات در همین
              صفحه منتشر می‌شود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
