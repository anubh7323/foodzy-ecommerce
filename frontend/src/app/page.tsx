'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types';
import { fetchProducts } from '@/lib/api';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { PromoCards } from '@/components/PromoCards';
import { ProductSection } from '@/components/ProductSection';
import { DailyBestSells } from '@/components/DailyBestSells';
import { MidBanner } from '@/components/MidBanner';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to empty array or mock data if needed
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products for different sections (mock logic for now)
  const popularProducts = products.slice(0, 8);
  const bestSells = products.slice(0, 3); // In real app, filter by sales
  const deals = products.slice(4, 8); // In real app, filter by discount

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <CategorySection />

      <PromoCards />

      <ProductSection
        title="Popular Products"
        products={popularProducts}
        loading={loading}
      />

      <DailyBestSells
        products={bestSells}
        loading={loading}
      />

      <MidBanner />

      <ProductSection
        title="Deals of the Day"
        products={deals}
        loading={loading}
      />
    </main>
  );
}
