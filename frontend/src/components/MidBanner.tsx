import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const MidBanner = () => {
    return (
        <section className="py-12">
            <div className="container-custom">
                <div className="relative rounded-2xl overflow-hidden bg-primary-50 px-6 py-12 md:px-12 md:py-16 lg:px-20">
                    {/* Background Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00B207_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="max-w-lg">
                            <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-primary font-semibold text-sm mb-4 border border-primary/10">
                                Organic & Healthy
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Stay home & get your daily needs from our shop
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Start your daily shopping with some Organic food.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                                    Shop Now <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="relative lg:h-[400px] flex items-center justify-center lg:justify-end">
                            {/* Placeholder for delivery image */}
                            <div className="relative w-full max-w-md aspect-[4/3] bg-white rounded-2xl shadow-xl flex items-center justify-center border-8 border-white/50">
                                <span className="text-gray-300 font-bold text-4xl">Delivery Image</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
