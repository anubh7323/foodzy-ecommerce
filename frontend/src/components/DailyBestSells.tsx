import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface DailyBestSellsProps {
    products: Product[];
    loading?: boolean;
}

export const DailyBestSells: React.FC<DailyBestSellsProps> = ({ products, loading }) => {
    return (
        <section className="py-12">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Daily Best Sells</h2>
                    <div className="flex gap-4">
                        <span className="font-semibold text-gray-900 border-b-2 border-primary pb-1 cursor-pointer">Featured</span>
                        <span className="text-gray-500 hover:text-gray-900 cursor-pointer">Popular</span>
                        <span className="text-gray-500 hover:text-gray-900 cursor-pointer">New Added</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Featured Banner Card */}
                    <div className="hidden lg:block w-[280px] flex-shrink-0 rounded-xl overflow-hidden relative bg-cover bg-center p-8" style={{ backgroundImage: 'url(/images/best-sells-banner.jpg)', backgroundColor: '#1F2937' }}>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <h3 className="text-2xl font-bold text-white mb-4">Bring nature into your home</h3>
                            <button className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold transition-colors w-fit flex items-center gap-2 text-sm">
                                Shop Now <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-gray-100 rounded-xl h-[350px] animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.slice(0, 3).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
