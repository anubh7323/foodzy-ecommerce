import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

interface CreateOrderDto {
    email: string;
    items: { productId: string; quantity: number }[];
}

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
        private productsService: ProductsService,
        private usersService: UsersService,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const { email, items } = createOrderDto;

        // 1. Find or Create User
        let user = await this.usersService.findByEmail(email);
        if (!user) {
            user = await this.usersService.create(email);
        }

        // 2. Validate Products and Calculate Total
        let totalAmount = 0;
        const orderItems: OrderItem[] = [];

        for (const item of items) {
            const product = await this.productsService.findOne(item.productId);
            if (!product) {
                throw new NotFoundException(`Product with ID ${item.productId} not found`);
            }
            if (!product.isAvailable) {
                throw new BadRequestException(`Product ${product.name} is not available`);
            }

            const orderItem = new OrderItem();
            orderItem.product = product;
            orderItem.quantity = item.quantity;
            orderItem.priceAtPurchase = product.price;

            totalAmount += Number(product.price) * item.quantity;
            orderItems.push(orderItem);
        }

        // 3. Create Order
        const order = new Order();
        order.user = user;
        order.items = orderItems;
        order.totalAmount = totalAmount;
        order.status = 'COMPLETED'; // Auto-complete for simplicity as per requirements

        return this.ordersRepository.save(order);
    }

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find({ relations: ['items', 'items.product', 'user'] });
    }
}
