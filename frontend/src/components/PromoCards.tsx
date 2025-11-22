import React from 'react';
import { ArrowRight } from 'lucide-react';

const promos = [
    {
        title: 'Everyday Fresh & Clean with Our Products',
        bg: 'bg-orange-50',
        btnColor: 'bg-orange-500',
        image: '/images/promo-1.png', // Placeholder
    },
    {
        title: 'Make your Breakfast Healthy and Easy',
        bg: 'bg-green-50',
        btnColor: 'bg-green-500',
        image: '/images/promo-2.png', // Placeholder
    },
    {
        title: 'The best Organic Products Online',
        bg: 'bg-blue-50',
        btnColor: 'bg-blue-500',
        image: '/images/promo-3.png', // Placeholder
    },
];

export const PromoCards = () => {
    return (
        <section className="py-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {promos.map((promo, idx) => (
                        <div
                            key={idx}
                            className={`${promo.bg} rounded-xl p-8 relative overflow-hidden group hover:shadow-md transition-shadow`}
                        >
                            <div className="relative z-10 max-w-[70%]">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                                    {promo.title}
                                </h3>
                                <button className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-primary transition-colors group-hover:gap-2 gap-1">
                                    Shop Now <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            {/* Decorative circle/image placeholder */}
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/50 blur-2xl" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
