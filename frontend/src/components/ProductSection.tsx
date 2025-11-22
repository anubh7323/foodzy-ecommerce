import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductSectionProps {
    title: string;
    products: Product[];
    loading?: boolean;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ title, products, loading }) => {
    return (
        <section className="py-12">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
                    <button className="flex items-center gap-2 text-primary font-semibold hover:text-primary-700 transition-colors">
                        View All <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-xl h-[350px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
