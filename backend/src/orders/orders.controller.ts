import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    create(@Body() createOrderDto: { email: string; items: { productId: string; quantity: number }[] }) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }
}
