import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MobileStickyBar } from "@/components/MobileStickyBar";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abbas-wordpress.ir"),
  title: {
    default: "عباس بازیان | طراحی سایت وردپرس و فروشگاهی در مازندران",
    template: "%s | عباس بازیان",
  },
  description:
    "طراحی سایت حرفه‌ای با وردپرس و المنتور؛ سریع، سئو محور و آماده برای تبدیل بازدیدکننده به مشتری. عباس بازیان، طراح سایت در جویبار، مازندران.",
  keywords: [
    "طراحی سایت وردپرس",
    "طراحی فروشگاه آنلاین",
    "المنتور",
    "ووکامرس",
    "سئو سایت",
    "افزایش سرعت سایت",
    "عباس بازیان",
    "مازندران",
    "جویبار",
  ],
  authors: [{ name: "عباس بازیان" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://abbas-wordpress.ir",
    siteName: "عباس بازیان",
    title: "عباس بازیان | طراحی سایت وردپرس و فروشگاهی در مازندران",
    description:
      "طراحی سایت حرفه‌ای با وردپرس و المنتور؛ سریع، سئو محور و آماده برای تبدیل بازدیدکننده به مشتری.",
  },
  verification: {
    google: "google-site-verification=YOUR_VERIFICATION_CODE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "عباس بازیان",
              description:
                "طراحی سایت وردپرس و المنتور، سریع و سئو محور",
              url: "https://abbas-wordpress.ir",
              image: "https://abbas-wordpress.ir/wp-content/uploads/2026/05/asly.png",
              telephone: "+989114753055",
              email: "abass.khamosh@gmail.com",
              areaServed: "Mazandaran, Iran",
              address: {
                "@type": "PostalAddress",
                addressLocality: "جویبار",
                addressRegion: "مازندران",
                addressCountry: "IR",
              },
              sameAs: [
                "https://www.instagram.com/abbaswordparess/",
                "https://t.me/Abasswordpress",
                "https://eitaa.com/Bazianwb",
              ],
            }),
          }}
        />
      </head>
      <body className={vazirmatn.variable}>
        <Header />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingContact />
        <MobileStickyBar />
      </body>
    </html>
  );
}
