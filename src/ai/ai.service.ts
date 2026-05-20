import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  async chat(message: string) {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant business intelligent pour Bizora, une plateforme de commerce pour vendeurs africains. Réponds toujours en français et de manière concise et pratique.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
      });

      return {
        response: completion.choices[0]?.message?.content || '',
      }
    } catch (error) {
      throw new Error('Erreur IA: ' + error.message)
    }
  }

  async generateProductDescription(productName: string, category: string) {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Génère une description professionnelle et attractive en français pour ce produit:
            Nom: ${productName}
            Catégorie: ${category}
            La description doit faire 2-3 phrases maximum.`,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
      });

      return {
        description: completion.choices[0]?.message?.content || '',
      }
    } catch (error) {
      throw new Error('Erreur IA: ' + error.message)
    }
  }

  async generateMarketingPost(productName: string, price: number) {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Génère un post marketing WhatsApp/Facebook en français pour ce produit:
            Nom: ${productName}
            Prix: ${price} FCFA
            Le post doit être accrocheur avec des emojis.`,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
      });

      return {
        post: completion.choices[0]?.message?.content || '',
      }
    } catch (error) {
      throw new Error('Erreur IA: ' + error.message)
    }
  }
}