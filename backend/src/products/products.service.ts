import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findOne(id: string): Promise<Product | null> {
        return this.productsRepository.findOne({ where: { id } });
    }

    async seed(): Promise<void> {
        // Clear existing products to ensure we have fresh data with correct images
        await this.productsRepository.delete({});

        const products = [
            {
                name: 'Organic Cabbage',
                description: 'Fresh organic cabbage from local farms.',
                price: 4.99,
                imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
                rating: 4.5,
                reviewCount: 128,
                isAvailable: true,
            },
            {
                name: 'Red Tomato',
                description: 'Juicy red tomatoes, perfect for salads.',
                price: 2.50,
                imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                reviewCount: 85,
                isAvailable: true,
            },
            {
                name: 'Fresh Milk',
                description: 'Pure cow milk, pasteurized and homogenized.',
                price: 3.20,
                imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                reviewCount: 210,
                isAvailable: true,
            },
            {
                name: 'Whole Wheat Bread',
                description: 'Freshly baked whole wheat bread.',
                price: 5.00,
                imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
                rating: 4.6,
                reviewCount: 94,
                isAvailable: true,
            },
            {
                name: 'Green Apple',
                description: 'Crisp and sweet green apples.',
                price: 1.50,
                imageUrl: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=800&q=80',
                rating: 4.9,
                reviewCount: 150,
                isAvailable: true,
            },
            {
                name: 'Fresh Corn',
                description: 'Sweet and crunchy fresh corn.',
                price: 1.20,
                imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                reviewCount: 67,
                isAvailable: true,
            },
            {
                name: 'Organic Potato',
                description: 'Versatile organic potatoes.',
                price: 3.00,
                imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                reviewCount: 45,
                isAvailable: true,
            },
            {
                name: 'Fresh Orange',
                description: 'Juicy and vitamin-rich oranges.',
                price: 4.50,
                imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                reviewCount: 112,
                isAvailable: true,
            }
        ];

        await this.productsRepository.save(products);
    }
}
