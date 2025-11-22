'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container-custom py-16">
                <div className="max-w-md mx-auto text-center">
                    <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Add some products to your cart and they will appear here.
                    </p>
                    <Link href="/">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.product.id} className="card p-4">
                            <div className="flex gap-4">
                                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
                                    <p className="text-lg font-bold text-primary">
                                        {formatPrice(item.product.price)}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end justify-between">
                                    <button
                                        onClick={() => removeItem(item.product.id)}
                                        className="p-2 text-gray-400 hover:text-error transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-24">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(getTotalPrice())}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-primary">Free</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <Button className="w-full">Proceed to Checkout</Button>
                        </Link>

                        <Link href="/">
                            <Button variant="outline" className="w-full mt-3">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
