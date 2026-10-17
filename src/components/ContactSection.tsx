'use client';

import { useState } from 'react';
import { contactContent, siteConfig } from '@/data/site-config';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'نام و نام خانوادگی الزامی است';
    if (!form.phone.trim()) e.phone = 'شماره تماس الزامی است';
    else if (!/^0?\d{10,11}$/.test(form.phone.replace(/[\s-]/g, '')))
      e.phone = 'شماره تماس معتبر نیست';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');

    try {
      // If WhatsApp is configured, open WhatsApp with prefilled message
      if (siteConfig.whatsapp) {
        const msg = encodeURIComponent(
          `سلام،\nنام: ${form.name}\nشماره تماس: ${form.phone}\nمحصول: ${form.product || '—'}\n\n${form.message}`
        );
        window.open(`https://wa.me/${siteConfig.whatsapp}?text=${msg}`, '_blank');
        setStatus('success');
        setForm({ name: '', phone: '', product: '', message: '' });
        return;
      }

      // If phone is configured, open phone dialer
      if (siteConfig.phone) {
        window.open(`tel:+${siteConfig.phone}`, '_blank');
        setStatus('success');
        return;
      }

      // No contact method configured — show info message
      setStatus('error');
      setErrors({ form: 'اطلاعات تماس هنوز تنظیم نشده است. لطفاً بعداً تلاش کنید.' });
    } catch {
      setStatus('error');
      setErrors({ form: 'ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.' });
    }
  };

  const contactMethods = [
    siteConfig.phone && { label: 'تماس تلفنی', value: siteConfig.phone, href: `tel:+${siteConfig.phone}`, icon: '📞' },
    siteConfig.whatsapp && { label: 'واتساپ', value: 'ارسال پیام', href: `https://wa.me/${siteConfig.whatsapp}`, icon: '💬' },
    siteConfig.email && { label: 'ایمیل', value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: '✉️' },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: string }[];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label justify-center">تماس با ما</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            {contactContent.heading}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {contactContent.text}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact methods */}
          <div className="flex flex-col gap-4">
            {contactMethods.length > 0 ? (
              contactMethods.map((method, i) => (
                <a
                  key={i}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-black/5 hover:shadow-lg transition-shadow"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-forest/10 text-2xl">
                    {method.icon}
                  </span>
                  <div>
                    <div className="font-bold text-text-dark">{method.label}</div>
                    <div className="text-text-muted text-sm" dir="ltr">{method.value}</div>
                  </div>
                </a>
              ))
            ) : (
              <div className="bg-white/60 rounded-2xl p-6 text-center text-text-muted">
                اطلاعات تماس به‌زودی تکمیل خواهد شد.
              </div>
            )}
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-black/5"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border bg-ivory text-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-leaf focus:ring-leaf'
                  }`}
                  placeholder="نام خود را وارد کنید"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
                  شماره تماس
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  dir="ltr"
                  className={`w-full px-4 py-3 rounded-lg border bg-ivory text-sm text-right focus:outline-none focus:ring-1 transition-colors ${
                    errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-leaf focus:ring-leaf'
                  }`}
                  placeholder="09123456789"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="product" className="block text-sm font-medium text-text-dark mb-2">
                  محصول موردنظر
                </label>
                <input
                  id="inquiry-product"
                  type="text"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-ivory text-sm focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf"
                  placeholder="نام محصول (اختیاری)"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
                  توضیحات یا پرسش
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-ivory text-sm focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf resize-none"
                  placeholder="پیام خود را بنویسید..."
                />
              </div>

              {errors.form && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{errors.form}</p>
              )}

              {status === 'success' && (
                <p className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">
                  پیام شما آماده ارسال است. در صورت باز نشدن پنجره، لطفاً دوباره تلاش کنید.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === 'submitting' ? 'در حال ارسال...' : 'ارسال پیام'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
