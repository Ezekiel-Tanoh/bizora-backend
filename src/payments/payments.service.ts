import { Injectable } from '@nestjs/common';
import * as paydunya from 'paydunya';

@Injectable()
export class PaymentsService {
  constructor() {
    const setup = new paydunya.Setup({
      masterKey: process.env.PAYDUNYA_MASTER_KEY,
      privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
      publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
      token: process.env.PAYDUNYA_TOKEN,
      mode: process.env.PAYDUNYA_MODE || 'test',
    });

    paydunya.Setup.setConfig(setup);
  }

  async createPayment(data: {
    montant: number
    description: string
    clientNom: string
    clientEmail?: string
    clientTelephone: string
    returnUrl: string
    cancelUrl: string
  }) {
    try {
      const invoice = new paydunya.CheckoutInvoice();

      invoice.addItem("Paiement Bizora", 1, data.montant, data.montant, data.description)

      invoice.totalAmount = data.montant
      invoice.description = data.description

      invoice.addCustomData("client_nom", data.clientNom)
      invoice.addCustomData("client_telephone", data.clientTelephone)

      invoice.cancelUrl = data.cancelUrl
      invoice.returnUrl = data.returnUrl
      invoice.callbackUrl = `${process.env.BACKEND_URL}/payments/callback`

      const response = await invoice.create()

      if (response) {
        return {
          success: true,
          paymentUrl: invoice.url,
          token: invoice.token,
        }
      }

      return {
        success: false,
        message: "Erreur lors de la création du paiement",
      }
    } catch (error) {
      throw new Error("Erreur PayDunya: " + error.message)
    }
  }

  async verifyPayment(token: string) {
    try {
      const invoice = new paydunya.CheckoutInvoice()
      await invoice.confirm(token)

      return {
        success: true,
        status: invoice.status,
        montant: invoice.totalAmount,
        token: invoice.token,
      }
    } catch (error) {
      throw new Error("Erreur vérification: " + error.message)
    }
  }
}