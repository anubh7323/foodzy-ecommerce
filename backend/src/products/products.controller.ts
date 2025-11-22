import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Post('seed')
    async seed() {
        await this.productsService.seed();
        return { message: 'Products seeded successfully' };
    }
}
