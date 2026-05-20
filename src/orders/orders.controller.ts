import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get(':storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.ordersService.findAll(storeId);
  }

  @Post()
  create(@Body() body: {
    storeId: string;
    customerId: string;
    total: number;
    items: {
      productId: string;
      quantity: number;
      price: number;
    }[];
  }) {
    return this.ordersService.create(body.storeId, body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(id, body.status);
  }
}