import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'نهالستان مهندس مهرداد مددی | تولید نهال مرکبات و درختان میوه',
  description: 'آشنایی با محصولات نهالستان مهندس مهرداد مددی، شامل نهال‌های مرکبات و درختان میوه. برای استعلام موجودی، دریافت اطلاعات و هماهنگی سفارش با مجموعه در ارتباط باشید.',
  openGraph: {
    title: 'نهالستان مهندس مهرداد مددی | تولید نهال مرکبات و درختان میوه',
    description: 'آشنایی با محصولات نهالستان مهندس مهرداد مددی، شامل نهال‌های مرکبات و درختان میوه. برای استعلام موجودی، دریافت اطلاعات و هماهنگی سفارش با مجموعه در ارتباط باشید.',
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>{children}</body>
    </html>
  );
}
