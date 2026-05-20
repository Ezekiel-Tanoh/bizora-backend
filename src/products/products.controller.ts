import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.productsService.findAll(storeId);
  }

  @Post()
  create(@Body() body: {
    storeId: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category?: string;
    image?: string;
  }) {
    return this.productsService.create(body.storeId, body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
    image?: string;
  }) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}