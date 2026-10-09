import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "سیاست حریم خصوصی وب‌سایت عباس بازیان.",
};

export default function PrivacyPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            حریم خصوصی
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              وب‌سایت عباس بازیان به حفظ حریم خصوصی کاربران اهمیت می‌دهد. این
              صفحه توضیح می‌دهد که چه اطلاعاتی جمع‌آوری می‌شود و چگونه استفاده
              می‌شود.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              جمع‌آوری اطلاعات
            </h2>
            <p>
              از طریق فرم تماس، اطلاعاتی مانند نام و آدرس ایمیل شما جمع‌آوری
              می‌شود تا بتوانیم به درخواست شما پاسخ دهیم. این اطلاعات بدون رضایت
              شما با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              استفاده از کوکی‌ها
            </h2>
            <p>
              وب‌سایت ممکن است از کوکی‌ها برای بهبود تجربه کاربری استفاده کند.
              شما می‌توانید کوکی‌ها را در مرورگر خود غیرفعال کنید.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              حقوق شما
            </h2>
            <p>
              شما حق دارید در هر زمان درخواست حذف یا ویرایش اطلاعات خود را
              بدهید. برای این منظور با ما در تماس باشید.
            </p>
            <h2 className="text-lg font-semibold text-text-primary">
              تغییرات
            </h2>
            <p>
              این سیاست ممکن است به‌روزرسانی شود. تغییرات در همین صفحه منتشر
              می‌شود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
