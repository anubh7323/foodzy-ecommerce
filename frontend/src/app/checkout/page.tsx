'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus, X, CheckCircle, CreditCard, Truck, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { createOrder } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const [step, setStep] = useState(1); // 1: Cart, 2: Delivery, 3: Payment
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        paymentMethod: 'cod'
    });

    const subtotal = getTotalPrice();
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!isAuthenticated) {
            router.push('/auth/login?redirect=/checkout');
            return;
        }

        try {
            setLoading(true);
            await createOrder({
                items: items.map(item => ({ productId: item.product.id, quantity: item.quantity })),
                shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
                paymentMethod: formData.paymentMethod
            });
            clearCart();
            router.push('/profile?success=true');
        } catch (error) {
            console.error('Order failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0 && step === 1) {
        return (
            <div className="container-custom py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <button
                    onClick={() => router.push('/products')}
                    className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

                {/* Steps Indicator */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                        <span className={`ml-2 font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>Cart</span>
                    </div>
                    <div className={`w-20 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                        <span className={`ml-2 font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>Delivery</span>
                    </div>
                    <div className={`w-20 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                        <span className={`ml-2 font-medium ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>Payment</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Step 1: Cart Review */}
                        {step === 1 && (
                            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex items-center gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                            <div className="relative w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0">
                                                <Image
                                                    src={item.product.imageUrl}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                                <p className="text-gray-500 text-sm">Price: {formatPrice(item.product.price)}</p>
                                            </div>
                                            <div className="flex items-center border border-gray-200 rounded-full">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-full text-gray-600"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-full text-gray-600"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="text-right min-w-[80px]">
                                                <p className="font-bold text-gray-900">{formatPrice(item.product.price * item.quantity)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                                    >
                                        Next: Delivery Info
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Delivery Info */}
                        {step === 2 && (
                            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="123 Main St, Apt 4B"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">State / Province</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="NY"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Zip / Postal Code</label>
                                        <input
                                            type="text"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="10001"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-between">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-gray-600 font-semibold hover:text-gray-900"
                                    >
                                        Back to Cart
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                                    >
                                        Next: Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {step === 3 && (
                            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                                <div className="space-y-4">
                                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-primary focus:ring-primary"
                                        />
                                        <div className="ml-4 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                                <Truck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
                                                <p className="text-sm text-gray-500">Pay when you receive your order</p>
                                            </div>
                                        </div>
                                    </label>

                                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors opacity-60">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            disabled
                                            className="w-5 h-5 text-primary focus:ring-primary"
                                        />
                                        <div className="ml-4 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                <CreditCard className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Credit / Debit Card</h3>
                                                <p className="text-sm text-gray-500">Coming soon</p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="mt-8 flex justify-between">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="text-gray-600 font-semibold hover:text-gray-900"
                                    >
                                        Back to Delivery
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Discount</span>
                                    <span className="font-medium text-green-600">-$0.00</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {step === 3 ? (
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-primary-600 text-white py-4 rounded-full font-bold transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </button>
                            ) : (
                                <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-500 text-center">
                                    Complete steps to place order
                                </div>
                            )}

                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
