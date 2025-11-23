'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { fetchProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Update selected category when URL param changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    // Filter and sort products
    const filteredProducts = products
        .filter(product => {
            // Category filter
            if (selectedCategory !== 'all' && product.category !== selectedCategory) {
                return false;
            }
            // Search filter
            return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    // Get unique categories from products
    const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="container-custom py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {selectedCategory !== 'all' ? `${selectedCategory} Products` : 'All Products'}
                    </h1>
                    <p className="text-gray-600">
                        Discover our fresh and organic collection
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    {/* Category Filter */}
                    {selectedCategory !== 'all' && (
                        <div className="mb-4 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Filtered by:</span>
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                                >
                                    {selectedCategory}
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="flex-1 md:flex-none px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 md:flex-none px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            >
                                <option value="default">Sort by: Default</option>
                                <option value="name">Sort by: Name</option>
                                <option value="price-low">Sort by: Price (Low to High)</option>
                                <option value="price-high">Sort by: Price (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
                            <span className="font-semibold text-gray-900">{products.length}</span> products
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                                    <div className="aspect-square bg-gray-200"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <main className="bg-gray-50 min-h-screen">
                <div className="container-custom py-20 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                </div>
            </main>
        }>
            <ProductsContent />
        </Suspense>
    );
}
