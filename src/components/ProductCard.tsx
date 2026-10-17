'use client';

import type { Product } from '@/data/products';
import { siteConfig } from '@/data/site-config';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const handleInquiry = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      // Pre-fill the product field in the contact form
      const productInput = document.querySelector<HTMLInputElement>('#inquiry-product');
      if (productInput) productInput.value = product.name;
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else if (siteConfig.whatsapp) {
      const msg = encodeURIComponent(`سلام، برای استعلام موجودی و قیمت محصول «${product.name}» اقدام می‌کنم.`);
      window.open(`https://wa.me/${siteConfig.whatsapp}?text=${msg}`, '_blank');
    } else if (siteConfig.phone) {
      window.open(`tel:+${siteConfig.phone}`, '_blank');
    }
  };

  return (
    <div className="product-card flex flex-col">
      <div className="overflow-hidden h-52">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block text-xs font-medium text-leaf bg-sage px-3 py-1 rounded-full mb-3 w-fit">
          {product.categoryLabel}
        </span>
        <h3 className="font-bold text-lg text-text-dark mb-2">{product.name}</h3>
        <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
          {product.description}
        </p>
        <button
          onClick={handleInquiry}
          className="btn-primary w-full !py-2.5 text-sm"
        >
          استعلام موجودی و قیمت
        </button>
      </div>
    </div>
  );
}
