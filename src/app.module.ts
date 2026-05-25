import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { AiModule } from './ai/ai.module';
import { PaymentsModule } from './payments/payments.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    AiModule,
    PaymentsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}