import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
    return (
        <section className="relative bg-gray-50 py-12 sm:py-16 lg:py-20 overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
                                100% Organic Vegetables
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                The best way to <br />
                                stuff your wallet.
                            </h1>
                            <p className="text-gray-600 text-lg max-w-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                                reprehenderit ad delectus reiciendis.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full pl-12 pr-4 py-4 rounded-full border-none shadow-sm focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <button className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-200 shadow-lg shadow-primary/25 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        {/* Placeholder for the vegetable image */}
                        <div className="relative w-full h-full min-h-[400px] bg-primary-50/50 rounded-full blur-3xl absolute inset-0 transform translate-x-1/4" />
                        <div className="relative z-10 w-full max-w-lg">
                            {/* In a real app, this would be the vegetable image */}
                            <div className="aspect-square relative bg-gradient-to-br from-green-100 to-green-50 rounded-full p-8 flex items-center justify-center border-4 border-white shadow-xl">
                                <span className="text-primary-300 text-9xl font-bold opacity-20">Veg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
