import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'PAYDUNYA-MASTER-KEY': process.env.PAYDUNYA_MASTER_KEY,
      'PAYDUNYA-PUBLIC-KEY': process.env.PAYDUNYA_PUBLIC_KEY,
      'PAYDUNYA-PRIVATE-KEY': process.env.PAYDUNYA_PRIVATE_KEY,
      'PAYDUNYA-TOKEN': process.env.PAYDUNYA_TOKEN,
    }
  }

  private getBaseUrl() {
    const mode = process.env.PAYDUNYA_MODE || 'test'
    return mode === 'live'
      ? 'https://app.paydunya.com/api/v1'
      : 'https://app.paydunya.com/sandbox-api/v1'
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
      const baseUrl = this.getBaseUrl()
      const headers = this.getHeaders()
      const payload = {
        invoice: {
          total_amount: data.montant,
          description: data.description,
        },
        store: {
          name: "Bizora",
          tagline: "Le commerce intelligent",
          postal_address: "Abidjan, Côte d'Ivoire",
        },
        actions: {
          cancel_url: data.cancelUrl,
          return_url: data.returnUrl,
          callback_url: `${process.env.BACKEND_URL}/payments/callback`,
        },
        custom_data: {
          client_nom: data.clientNom,
          client_telephone: data.clientTelephone,
        },
      }

      const response = await fetch(`${baseUrl}/checkout-invoice/create`, {
        method: 'POST',
        headers: headers as any,
        body: JSON.stringify(payload),
      })

      const result = await response.json()
console.log('PayDunya response:', JSON.stringify(result))

      if (result.response_code === '00') {
        return {
          success: true,
          paymentUrl: result.response_text,
          token: result.token,
        }
      }

      return {
        success: false,
        message: result.response_text || "Erreur PayDunya",
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error("Erreur PayDunya: " + message)
    }
  }

  async verifyPayment(token: string) {
    try {
      const baseUrl = this.getBaseUrl()
      const headers = this.getHeaders()

      const response = await fetch(`${baseUrl}/checkout-invoice/confirm/${token}`, {
        method: 'GET',
        headers: headers as any,
      })

      const result = await response.json()

      return {
        success: true,
        status: result.status,
        montant: result.invoice?.total_amount,
        token: result.token,
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error("Erreur vérification: " + message)
    }
  }
}