import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get(':storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.customersService.findAll(storeId);
  }

  @Post()
  create(@Body() body: {
    storeId: string;
    name: string;
    phone?: string;
    email?: string;
  }) {
    return this.customersService.create(body.storeId, body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: {
    name?: string;
    phone?: string;
    email?: string;
  }) {
    return this.customersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.delete(id);
  }
}