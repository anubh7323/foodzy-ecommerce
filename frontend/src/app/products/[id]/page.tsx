'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Star, Heart, ShoppingBag, Minus, Plus, Facebook, Twitter, Instagram, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { Product } from '@/types';
import { fetchProductById, fetchProducts } from '@/lib/api';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const productData = await fetchProductById(id);
                setProduct(productData);

                // Fetch related products (mock logic: just fetch all and take first 4)
                const allProducts = await fetchProducts();
                setRelatedProducts(allProducts.filter(p => p.id !== id).slice(0, 4));
            } catch (error) {
                console.error('Failed to load product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadData();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-12">
                <div className="animate-pulse">
                    <div className="h-[500px] bg-gray-200 rounded-2xl mb-8"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container-custom py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
            </div>
        );
    }

    return (
        <main className="bg-white">
            {/* Breadcrumb (Simplified) */}
            <div className="bg-gray-50 py-4">
                <div className="container-custom">
                    <div className="text-sm text-gray-500">
                        Home / Category / <span className="text-primary font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-square bg-white border border-gray-100 rounded-2xl overflow-hidden p-8 flex items-center justify-center">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        {/* Thumbnail Gallery (Mock) */}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {[product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl].map((img, i) => (
                                <button key={i} className={`relative w-20 h-20 flex-shrink-0 border rounded-lg overflow-hidden p-2 ${i === 0 ? 'border-primary' : 'border-gray-200'}`}>
                                    <Image src={img} alt="Thumbnail" fill className="object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">In Stock</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">{product.reviewCount || 4} Review</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500 text-sm">SKU: 2,51,594</span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-gray-400 line-through text-xl">{formatPrice((product.price || 0) * 1.2)}</span>
                            <span className="text-primary text-3xl font-bold">{formatPrice(product.price)}</span>
                            <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">20% Off</span>
                        </div>

                        <div className="border-t border-b border-gray-100 py-6 mb-6">
                            <p className="text-gray-600 leading-relaxed">
                                {product.description || "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar."}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                            <div className="flex items-center border border-gray-200 rounded-full p-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <Minus className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                Add to Cart <ShoppingBag className="w-5 h-5" />
                            </button>

                            <button className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-green-100">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 w-24">Category:</span>
                                <span>Vegetables</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 w-24">Tag:</span>
                                <span>Vegetables, Healthy, Chinese, Cabbage, Green Cabbage</span>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="font-semibold text-gray-900 w-24">Share:</span>
                                <div className="flex gap-2">
                                    <a href="#" className="text-gray-500 hover:text-primary"><Facebook className="w-4 h-4" /></a>
                                    <a href="#" className="text-gray-500 hover:text-primary"><Twitter className="w-4 h-4" /></a>
                                    <a href="#" className="text-gray-500 hover:text-primary"><Instagram className="w-4 h-4" /></a>
                                    <a href="#" className="text-gray-500 hover:text-primary"><LinkIcon className="w-4 h-4" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-center gap-8 border-b border-gray-200 mb-8">
                        {['Description', 'Additional Info', 'Customer Feedback'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                                className={`pb-4 font-semibold text-lg transition-colors relative ${activeTab === tab.toLowerCase().split(' ')[0]
                                        ? 'text-gray-900'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab.toLowerCase().split(' ')[0] && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed">
                        {activeTab === 'description' && (
                            <div className="space-y-6 animate-fade-in">
                                <p>
                                    Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem ante, vestibulum nec orci vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla facilisi. Nam scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis, egestas elementum leo. Donec convallis mollis enim. Aliquam id mi quam.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">100% Organic</h4>
                                            <p className="text-sm">Sustainably sourced and grown without pesticides.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Fresh from Farm</h4>
                                            <p className="text-sm">Directly from local farmers to your table.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'additional' && (
                            <div className="animate-fade-in">
                                <table className="w-full text-left border-collapse">
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-3 font-medium text-gray-900 w-48">Weight</th>
                                            <td className="py-3">0.5 kg</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-3 font-medium text-gray-900">Color</th>
                                            <td className="py-3">Green</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-3 font-medium text-gray-900">Type</th>
                                            <td className="py-3">Organic</td>
                                        </tr>
                                        <tr>
                                            <th className="py-3 font-medium text-gray-900">Category</th>
                                            <td className="py-3">Vegetables</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'customer' && (
                            <div className="animate-fade-in text-center py-8">
                                <p>No reviews yet. Be the first to review this product!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
