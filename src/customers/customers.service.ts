import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(storeId: string) {
    return this.prisma.customer.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(storeId: string, data: {
    name: string;
    phone?: string;
    email?: string;
  }) {
    return this.prisma.customer.create({
      data: { storeId, ...data },
    });
  }

  async update(id: string, data: {
    name?: string;
    phone?: string;
    email?: string;
  }) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}