// Central site configuration — all editable content lives here.
// Replace placeholder contact info with real verified details.

export const siteConfig = {
  brandName: 'مهندس مهرداد مددی',
  brandSubtitle: 'تولید نهال‌های مرکبات و درختان میوه',
  business: 'تولید و عرضه نهال‌های مرکبات و درختان میوه تابستانه',
  // TODO: Replace with real verified contact info
  phone: '', // e.g. '09121234567'
  whatsapp: '', // e.g. '989121234567'
  email: '', // e.g. 'info@example.com'
  address: '', // e.g. 'استان ...، شهر ...'
  // Hero video URL — replace with the real nursery cinematic video
  heroVideoUrl: '', // e.g. '/videos/nursery-hero.mp4'
  heroVideoMobileUrl: '', // optional lighter mobile version
  heroFallbackImage: 'https://images.unsplash.com/photo-1780287857383-9dc473fec6ec?w=1920&q=80',
  heroPosterImage: 'https://images.unsplash.com/photo-1780287857383-9dc473fec6ec?w=1920&q=80',
};

export const navLinks = [
  { label: 'صفحه اصلی', href: '#hero' },
  { label: 'معرفی نهالستان', href: '#about' },
  { label: 'محصولات', href: '#products' },
  { label: 'مزایای ما', href: '#benefits' },
  { label: 'مراحل سفارش', href: '#ordering' },
  { label: 'تماس با ما', href: '#contact' },
];

export const heroContent = {
  label: 'تولید تخصصی نهال‌های مرکبات و درختان میوه',
  title: 'از انتخاب نهال تا آغاز یک باغ پربار',
  description: 'با انتخاب آگاهانه نهال و دریافت راهنمایی مناسب، مسیر احداث باغ خود را با اطمینان بیشتری آغاز کنید.',
  primaryCta: 'مشاهده محصولات',
  primaryCtaHref: '#products',
  secondaryCta: 'ارتباط با مهندس مددی',
  secondaryCtaHref: '#contact',
};

export const aboutContent = {
  label: 'درباره نهالستان',
  heading: 'تجربه، دقت و توجه به کیفیت نهال',
  text: 'مهندس مهرداد مددی در زمینه تولید نهال‌های مرکبات و درختان میوه فعالیت می‌کند. هدف این مجموعه، فراهم‌کردن امکان انتخاب آگاهانه نهال و ارائه اطلاعات کاربردی برای باغداران و علاقه‌مندان به احداث باغ است.',
  cta: 'آشنایی بیشتر',
  ctaHref: '#contact',
  image: 'https://images.unsplash.com/photo-1690438553452-e1530e30c243?w=800&q=80',
  imageAlt: 'جاده‌ای در میان درختان باغ',
};

export const benefitsContent = {
  label: 'چرا نهالستان ما؟',
  heading: 'انتخاب آگاهانه، شروع مطمئن‌تر',
  items: [
    { title: 'تنوع محصولات', text: 'آشنایی با گروه‌های مختلف نهال مرکبات و درختان میوه، متناسب با محصولات واقعاً موجود.' },
    { title: 'راهنمایی پیش از خرید', text: 'امکان دریافت اطلاعات درباره انتخاب نهال و پرسیدن پرسش‌های مربوط به کاشت.' },
    { title: 'ارتباط مستقیم', text: 'امکان ارتباط با مجموعه برای استعلام موجودی و جزئیات سفارش.' },
    { title: 'اطلاعات شفاف', text: 'ارائه مشخصات و اطلاعات محصول بر اساس داده‌های واقعی و قابل تأیید.' },
    { title: 'توجه به شرایط منطقه', text: 'بررسی نیازهای اقلیمی و شرایط محل کاشت پیش از انتخاب محصول، در صورت ارائه این خدمت.' },
    { title: 'فرایند سفارش روشن', text: 'مشخص‌بودن مراحل استعلام، هماهنگی و تحویل طبق شرایط واقعی مجموعه.' },
  ],
};

export const guidanceContent = {
  label: 'راهنمای انتخاب نهال',
  heading: 'پیش از خرید نهال، چه نکاتی را بررسی کنیم؟',
  items: [
    { title: 'شرایط آب‌وهوایی', text: 'توجه به دما، احتمال سرمازدگی، رطوبت و شرایط اقلیمی منطقه.' },
    { title: 'خاک و آبیاری', text: 'بررسی وضعیت خاک، زهکشی، کیفیت آب و نیاز آبی گیاه.' },
    { title: 'نوع نهال و رقم', text: 'تطبیق ویژگی‌های رقم با هدف کاشت، شرایط باغ و نیازهای موردنظر.' },
    { title: 'زمان و روش کاشت', text: 'بررسی زمان مناسب کاشت و روش نگهداری بر اساس نوع گیاه و شرایط محلی.' },
  ],
  cta: 'برای انتخاب نهال مناسب مشاوره بگیرید',
  ctaHref: '#contact',
};

export const orderingSteps = {
  heading: 'از انتخاب نهال تا ثبت سفارش',
  steps: [
    { title: 'انتخاب محصول', text: 'بررسی گروه‌های محصولات و انتخاب نهال موردنظر.' },
    { title: 'استعلام اطلاعات', text: 'پرسیدن درباره موجودی، قیمت، مشخصات و شرایط سفارش.' },
    { title: 'هماهنگی سفارش', text: 'تعیین تعداد، شرایط تحویل و جزئیات سفارش با مجموعه.' },
    { title: 'دریافت و کاشت', text: 'تحویل طبق توافق و دریافت اطلاعات لازم برای کاشت، در صورت ارائه این خدمت.' },
  ],
};

export const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1780287857383-9dc473fec6ec?w=800&q=80', alt: 'باغ مرکبات با درختان پر از پرتقال' },
  { src: 'https://images.unsplash.com/photo-1690438553452-e1530e30c243?w=800&q=80', alt: 'جاده‌ای در میان ردیف درختان' },
  { src: 'https://images.unsplash.com/photo-1791334742095-8dab645174d3?w=800&q=80', alt: 'نهال‌های مرکبات در گلدان' },
  { src: 'https://images.unsplash.com/photo-1683110752705-f474b57bebc6?w=800&q=80', alt: 'پرتقال‌های رسیده روی درخت' },
  { src: 'https://images.unsplash.com/photo-1781598798125-9644d115e4c4?w=800&q=80', alt: 'مزرعه سرسبز با درختان' },
  { src: 'https://images.unsplash.com/photo-1619426412720-2614db3547f2?w=800&q=80', alt: 'چمنزار و درختان زیر آسمان آبی' },
];

export const contactContent = {
  heading: 'تماس با مهندس مددی',
  text: 'برای استعلام موجودی، دریافت اطلاعات محصول و هماهنگی سفارش، فرم زیر را تکمیل کنید یا مستقیماً با ما در ارتباط باشید.',
};
