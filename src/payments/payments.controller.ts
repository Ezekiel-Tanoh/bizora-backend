import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create')
  createPayment(@Body() body: {
    montant: number
    description: string
    clientNom: string
    clientEmail?: string
    clientTelephone: string
    returnUrl: string
    cancelUrl: string
  }) {
    return this.paymentsService.createPayment(body)
  }

  @Get('verify/:token')
  verifyPayment(@Param('token') token: string) {
    return this.paymentsService.verifyPayment(token)
  }

  @Post('callback')
  callback(@Body() body: any) {
    console.log('PayDunya callback:', body)
    return { received: true }
  }
}