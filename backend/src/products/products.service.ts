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

    async findByCategory(category: string): Promise<Product[]> {
        return this.productsRepository.find({ where: { category } });
    }

    async getCategories(): Promise<string[]> {
        const products = await this.productsRepository.find();
        const categories = [...new Set(products.map(p => p.category))];
        return categories.sort();
    }

    async seed(): Promise<void> {
        // Clear existing products to ensure we have fresh data with correct images
        await this.productsRepository.delete({});

        const products = [
            // Vegetables
            {
                name: 'Organic Cabbage',
                description: 'Fresh organic cabbage from local farms.',
                price: 4.99,
                category: 'Vegetables',
                imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
                rating: 4.5,
                reviewCount: 128,
                isAvailable: true,
            },
            {
                name: 'Red Tomato',
                description: 'Juicy red tomatoes, perfect for salads.',
                price: 2.50,
                category: 'Vegetables',
                imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                reviewCount: 85,
                isAvailable: true,
            },
            {
                name: 'Fresh Corn',
                description: 'Sweet and crunchy fresh corn.',
                price: 1.20,
                category: 'Vegetables',
                imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                reviewCount: 67,
                isAvailable: true,
            },
            {
                name: 'Organic Potato',
                description: 'Versatile organic potatoes.',
                price: 3.00,
                category: 'Vegetables',
                imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                reviewCount: 45,
                isAvailable: true,
            },
            {
                name: 'Fresh Carrot',
                description: 'Crunchy and nutritious carrots.',
                price: 2.20,
                category: 'Vegetables',
                imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
                rating: 4.6,
                reviewCount: 92,
                isAvailable: true,
            },
            // Fruits
            {
                name: 'Green Apple',
                description: 'Crisp and sweet green apples.',
                price: 1.50,
                category: 'Fruits',
                imageUrl: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=800&q=80',
                rating: 4.9,
                reviewCount: 150,
                isAvailable: true,
            },
            {
                name: 'Fresh Orange',
                description: 'Juicy and vitamin-rich oranges.',
                price: 4.50,
                category: 'Fruits',
                imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                reviewCount: 112,
                isAvailable: true,
            },
            {
                name: 'Fresh Banana',
                description: 'Sweet and ripe bananas.',
                price: 2.99,
                category: 'Fruits',
                imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                reviewCount: 203,
                isAvailable: true,
            },
            {
                name: 'Red Strawberry',
                description: 'Fresh and juicy strawberries.',
                price: 5.99,
                category: 'Fruits',
                imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
                rating: 4.9,
                reviewCount: 178,
                isAvailable: true,
            },
            {
                name: 'Watermelon',
                description: 'Sweet and refreshing watermelon.',
                price: 6.50,
                category: 'Fruits',
                imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784210?auto=format&fit=crop&w=800&q=80',
                rating: 4.6,
                reviewCount: 134,
                isAvailable: true,
            },
            // Dairy
            {
                name: 'Fresh Milk',
                description: 'Pure cow milk, pasteurized and homogenized.',
                price: 3.20,
                category: 'Dairy',
                imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                reviewCount: 210,
                isAvailable: true,
            },
            {
                name: 'Greek Yogurt',
                description: 'Creamy and protein-rich Greek yogurt.',
                price: 4.99,
                category: 'Dairy',
                imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                reviewCount: 156,
                isAvailable: true,
            },
            {
                name: 'Cheddar Cheese',
                description: 'Sharp and flavorful cheddar cheese.',
                price: 7.50,
                category: 'Dairy',
                imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
                rating: 4.6,
                reviewCount: 89,
                isAvailable: true,
            },
            {
                name: 'Fresh Butter',
                description: 'Creamy and rich butter.',
                price: 5.20,
                category: 'Dairy',
                imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80',
                rating: 4.5,
                reviewCount: 72,
                isAvailable: true,
            },
            // Bakery
            {
                name: 'Whole Wheat Bread',
                description: 'Freshly baked whole wheat bread.',
                price: 5.00,
                category: 'Bakery',
                imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
                rating: 4.6,
                reviewCount: 94,
                isAvailable: true,
            },
            {
                name: 'Croissant',
                description: 'Buttery and flaky French croissant.',
                price: 3.50,
                category: 'Bakery',
                imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
                rating: 4.9,
                reviewCount: 167,
                isAvailable: true,
            },
            {
                name: 'Bagel',
                description: 'Fresh and chewy bagels.',
                price: 2.50,
                category: 'Bakery',
                imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                reviewCount: 81,
                isAvailable: true,
            },
            {
                name: 'Chocolate Muffin',
                description: 'Rich and moist chocolate muffin.',
                price: 4.20,
                category: 'Bakery',
                imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                reviewCount: 124,
                isAvailable: true,
            },
            // Snacks
            {
                name: 'Mixed Nuts',
                description: 'Healthy mix of almonds, cashews, and walnuts.',
                price: 8.99,
                category: 'Snacks',
                imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                reviewCount: 145,
                isAvailable: true,
            },
            {
                name: 'Granola Bar',
                description: 'Nutritious and delicious granola bars.',
                price: 3.99,
                category: 'Snacks',
                imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
                rating: 4.5,
                reviewCount: 98,
                isAvailable: true,
            },
            {
                name: 'Potato Chips',
                description: 'Crispy and savory potato chips.',
                price: 2.99,
                category: 'Snacks',
                imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                reviewCount: 187,
                isAvailable: true,
            },
            {
                name: 'Popcorn',
                description: 'Light and fluffy popcorn.',
                price: 3.50,
                category: 'Snacks',
                imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                reviewCount: 112,
                isAvailable: true,
            },
            {
                name: 'Trail Mix',
                description: 'Energy-packed trail mix with dried fruits and nuts.',
                price: 6.99,
                category: 'Snacks',
                imageUrl: 'https://images.unsplash.com/photo-1599909533730-c319f2d5e3e2?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                reviewCount: 156,
                isAvailable: true,
            },
        ];

        await this.productsRepository.save(products);
    }
}
