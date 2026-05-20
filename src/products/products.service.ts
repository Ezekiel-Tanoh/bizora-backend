import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(storeId: string) {
    return this.prisma.product.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(storeId: string, data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    category?: string;
    image?: string;
  }) {
    return this.prisma.product.create({
      data: { storeId, ...data },
    });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
    image?: string;
  }) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}