'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdding, setIsAdding] = React.useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        addItem(product, 1);
        setTimeout(() => setIsAdding(false), 500);
    };

    const rating = product.rating || 4.5;
    const reviewCount = product.reviewCount || 0;

    return (
        <div className="card group relative border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {!product.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <span className="text-white font-semibold text-sm px-3 py-1 bg-red-500 rounded-full">Out of Stock</span>
                    </div>
                )}

                {/* Quick Action Buttons (visible on hover) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm font-bold text-gray-900">
                                {formatPrice(product.price)}
                            </span>
                            {product.price && (
                                <span className="text-xs text-gray-400 line-through">
                                    {formatPrice(product.price * 1.2)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(rating)
                                    ? 'fill-warning text-warning'
                                    : 'fill-gray-200 text-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={!product.isAvailable || isAdding}
                        className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-all duration-200 group-hover:bg-primary group-hover:text-white"
                    >
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
