import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(storeId: string) {
    return this.prisma.order.findMany({
      where: { storeId },
      include: {
        customer: true,
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(storeId: string, data: {
    customerId: string;
    total: number;
    items: {
      productId: string;
      quantity: number;
      price: number;
    }[];
  }) {
    return this.prisma.order.create({
      data: {
        storeId,
        customerId: data.customerId,
        total: data.total,
        items: {
          create: data.items,
        },
      },
      include: {
        items: true,
        customer: true,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}