export type ProductCategory = 'citrus' | 'summer';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  image: string;
  imageAlt: string;
}

const img = (id: string, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export const products: Product[] = [
  {
    id: 'orange',
    name: 'نهال پرتقال',
    category: 'citrus',
    categoryLabel: 'مرکبات',
    description: 'نهال پرتقال با کیفیت بالا، مناسب برای احداث باغ در مناطق مناسب.',
    image: img('1683110752705-f474b57bebc6'),
    imageAlt: 'نهال پرتقال',
  },
  {
    id: 'mandarin',
    name: 'نهال نارنگی',
    category: 'citrus',
    categoryLabel: 'مرکبات',
    description: 'نهال نارنگی با تنوع رقم، مناسب برای شرایط اقلیمی مختلف.',
    image: img('1772638583312-d920b9d44262'),
    imageAlt: 'نهال نارنگی',
  },
  {
    id: 'lemon',
    name: 'نهال لیمو',
    category: 'citrus',
    categoryLabel: 'مرکبات',
    description: 'نهال لیمو با رشد مناسب و مقاومت در شرایط متغیر.',
    image: img('1614297522049-7953f5d54ae8'),
    imageAlt: 'نهال لیمو',
  },
  {
    id: 'grapefruit',
    name: 'نهال گریپ‌فروت',
    category: 'citrus',
    categoryLabel: 'مرکبات',
    description: 'نهال گریپ‌فروت برای تولید میوه با کیفیت در مناطق مناسب.',
    image: img('1758614029233-6da6b15c3210'),
    imageAlt: 'نهال گریپ‌فروت',
  },
  {
    id: 'peach',
    name: 'نهال هلو',
    category: 'summer',
    categoryLabel: 'درختان میوه تابستانه',
    description: 'نهال هلو با تنوع رقم، مناسب برای باغ‌های میوه تابستانه.',
    image: img('1781451481340-2a15bf3b4741'),
    imageAlt: 'نهال هلو',
  },
  {
    id: 'nectarine',
    name: 'نهال شلیل',
    category: 'summer',
    categoryLabel: 'درختان میوه تابستانه',
    description: 'نهال شلیل با کیفیت نهال مناسب و رشد مطلوب.',
    image: img('1767369327878-e8fe328e231f'),
    imageAlt: 'نهال شلیل',
  },
  {
    id: 'apricot',
    name: 'نهال زردآلو',
    category: 'summer',
    categoryLabel: 'درختان میوه تابستانه',
    description: 'نهال زردآلو برای تولید میوه در فصل تابستان.',
    image: img('1781099792773-98816e68d9be'),
    imageAlt: 'نهال زردآلو',
  },
  {
    id: 'plum',
    name: 'نهال آلو',
    category: 'summer',
    categoryLabel: 'درختان میوه تابستانه',
    description: 'نهال آلو با تنوع رقم و سازگاری با شرایط مختلف.',
    image: img('1791334742095-8dab645174d3'),
    imageAlt: 'نهال آلو',
  },
];

export const productFilters = [
  { value: 'all', label: 'همه محصولات' },
  { value: 'citrus', label: 'نهال‌های مرکبات' },
  { value: 'summer', label: 'درختان میوه تابستانه' },
];
