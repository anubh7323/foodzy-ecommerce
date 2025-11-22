'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';

export const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const totalItems = useCartStore((state) => state.getTotalItems());
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">F</span>
                        </div>
                        <span className="font-display font-bold text-xl text-gray-900">Foodzy</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-primary transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* User */}
                        <Link
                            href={isAuthenticated ? "/profile" : "/auth/login"}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <User className="w-6 h-6 text-gray-700" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className="text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
