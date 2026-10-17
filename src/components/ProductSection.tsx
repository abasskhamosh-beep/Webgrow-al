'use client';

import { useState } from 'react';
import { products, productFilters, type Product } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductSection() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = !search || p.name.includes(search) || p.description.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="products" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label justify-center">محصولات نهالستان</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            انتخاب نهال مناسب برای باغ شما
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            با محصولات نهالستان آشنا شوید و برای دریافت اطلاعات مربوط به رقم، شرایط کاشت و سفارش، با مجموعه تماس بگیرید.
          </p>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {productFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f.value
                    ? 'bg-forest text-white'
                    : 'bg-sage text-text-dark hover:bg-leaf/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="جستجوی محصول..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-200 bg-ivory text-sm focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf"
          />
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-muted py-12">محصولی یافت نشد.</p>
        )}
      </div>
    </section>
  );
}
