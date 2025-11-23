'use client';

import React from 'react';
import Link from 'next/link';
import { Apple, Milk, Croissant, Cookie, Carrot } from 'lucide-react';

const categories = [
    {
        name: 'Fruits',
        icon: Apple,
        color: 'bg-red-50 hover:bg-red-100',
        iconColor: 'text-red-500',
        count: '5 items',
    },
    {
        name: 'Vegetables',
        icon: Carrot,
        color: 'bg-green-50 hover:bg-green-100',
        iconColor: 'text-green-500',
        count: '5 items',
    },
    {
        name: 'Dairy',
        icon: Milk,
        color: 'bg-blue-50 hover:bg-blue-100',
        iconColor: 'text-blue-500',
        count: '4 items',
    },
    {
        name: 'Bakery',
        icon: Croissant,
        color: 'bg-amber-50 hover:bg-amber-100',
        iconColor: 'text-amber-500',
        count: '4 items',
    },
    {
        name: 'Snacks',
        icon: Cookie,
        color: 'bg-purple-50 hover:bg-purple-100',
        iconColor: 'text-purple-500',
        count: '5 items',
    },
];

export function CategorySection() {
    return (
        <section className="container-custom py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
                <p className="text-gray-600">Browse our wide selection of fresh products</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.name}
                            href={`/products?category=${category.name}`}
                            className={`${category.color} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                                    <Icon className={`w-8 h-8 ${category.iconColor}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                                    <p className="text-sm text-gray-500">{category.count}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
